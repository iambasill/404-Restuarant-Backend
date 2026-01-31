import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { BulkUpdateOrderDto } from './dtos/bulk-update-order.dto';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { MenuFiltersDto } from './dtos/menu-filters.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuCategory)
    private categoryRepo: Repository<MenuCategory>,
    @InjectRepository(MenuItem)
    private menuItemRepo: Repository<MenuItem>,
  ) {}

  // ========== PUBLIC ENDPOINTS (No organization filter) ==========

  async getActiveCategories(): Promise<MenuCategory[]> {
    return this.categoryRepo.find({
      where: { isActive: true },
      relations: ['items'],
      order: { order: 'ASC' },
    });
  }

  async getCategoryBySlug(slug: string): Promise<MenuCategory> {
    const category = await this.categoryRepo.findOne({
      where: { slug },
      relations: ['items'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async getActiveMenuItems(filters?: MenuFiltersDto): Promise<MenuItem[]> {
    const queryBuilder = this.menuItemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.isActive = :isActive', { isActive: true })
      .andWhere('item.isAvailable = :isAvailable', { isAvailable: true });

    // Apply filters
    if (filters?.category) {
      queryBuilder.andWhere('category.slug = :categorySlug', {
        categorySlug: filters.category,
      });
    }

    if (filters?.isFeatured !== undefined) {
      queryBuilder.andWhere('item.isFeatured = :isFeatured', {
        isFeatured: filters.isFeatured,
      });
    }

    if (filters?.search) {
      queryBuilder.andWhere(
        '(item.title ILIKE :search OR item.description ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    if (filters?.minPrice !== undefined) {
      queryBuilder.andWhere('item.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters?.maxPrice !== undefined) {
      queryBuilder.andWhere('item.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters?.tags) {
      const tags = filters.tags.split(',').map((tag) => tag.trim());
      queryBuilder.andWhere('item.tags && :tags', { tags });
    }

    return queryBuilder
      .orderBy('item.order', 'ASC')
      .addOrderBy('item.createdAt', 'DESC')
      .getMany();
  }

  async getMenuItemBySlug(slug: string): Promise<MenuItem> {
    const item = await this.menuItemRepo.findOne({
      where: { slug },
      relations: ['category'],
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    return item;
  }

  async getFeaturedItems(): Promise<MenuItem[]> {
    return this.menuItemRepo.find({
      where: {
        isFeatured: true,
        isActive: true,
        isAvailable: true,
      },
      relations: ['category'],
      order: { order: 'ASC' },
      take: 10,
    });
  }

  async getItemsByCategory(categoryId: number): Promise<MenuItem[]> {
    return this.menuItemRepo.find({
      where: { categoryId },
      relations: ['category'],
      order: { order: 'ASC' },
    });
  }

  // ========== ADMIN ENDPOINTS (With organization filter) ==========

  async createCategory(organizationId: string, dto: CreateCategoryDto): Promise<MenuCategory> {
    // Generate slug if not provided
    if (!dto.slug) {
      dto.slug = dto.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Check if slug already exists for this organization
    const existing = await this.categoryRepo.findOne({
      where: { slug: dto.slug, organizationId },
    });

    if (existing) {
      throw new BadRequestException('Category with this slug already exists');
    }

    const category = this.categoryRepo.create({ ...dto, organizationId });
    return this.categoryRepo.save(category);
  }

  async getAllCategories(organizationId: string): Promise<MenuCategory[]> {
    return this.categoryRepo.find({
      where: { organizationId },
      relations: ['items'],
      order: { order: 'ASC' },
    });
  }

  async getCategoryById(id: number, organizationId: string): Promise<MenuCategory> {
    const category = await this.categoryRepo.findOne({
      where: { id, organizationId },
      relations: ['items'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async updateCategory(id: number, organizationId: string, dto: UpdateCategoryDto): Promise<MenuCategory> {
    const category = await this.getCategoryById(id, organizationId);

    // If updating slug, check for duplicates
    if (dto.slug && dto.slug !== category.slug) {
      const existing = await this.categoryRepo.findOne({
        where: { slug: dto.slug, organizationId: category.organizationId },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('Category with this slug already exists');
      }
    }

    Object.assign(category, dto);
    return this.categoryRepo.save(category);
  }

  async deleteCategory(id: number, organizationId: string): Promise<void> {
    const category = await this.getCategoryById(id, organizationId);
    
    // Check if category has items
    const itemCount = await this.menuItemRepo.count({ 
      where: { categoryId: id, organizationId } 
    });
    if (itemCount > 0) {
      throw new BadRequestException(
        'Cannot delete category with menu items. Please reassign or delete the items first.',
      );
    }

    await this.categoryRepo.softDelete({ id, organizationId });
  }

  async bulkUpdateCategoryOrder(organizationId: string, dto: BulkUpdateOrderDto): Promise<void> {
    // Verify all items belong to this organization
    const categoryIds = dto.items.map(item => item.id);
    const categories = await this.categoryRepo.find({
      where: { id: In(categoryIds), organizationId }
    });
    
    if (categories.length !== categoryIds.length) {
      throw new NotFoundException('One or more categories not found');
    }

    const updates = dto.items.map((item) =>
      this.categoryRepo.update({ id: item.id, organizationId }, { order: item.order })
    );
    await Promise.all(updates);
  }

  async createMenuItem(organizationId: string, dto: CreateMenuItemDto): Promise<MenuItem> {
    // Verify category exists and belongs to organization
    const category = await this.categoryRepo.findOne({
      where: { id: dto.categoryId, organizationId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Generate slug if not provided
    if (!dto.slug) {
      dto.slug = dto.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const menuItem = this.menuItemRepo.create({ ...dto, organizationId });
    return this.menuItemRepo.save(menuItem);
  }

  async getAllMenuItems(
    organizationId: string,
    filters?: MenuFiltersDto,
  ): Promise<{ items: MenuItem[]; total: number; page: number; limit: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 50;
    const skip = (page - 1) * limit;

    const queryBuilder = this.menuItemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.organizationId = :organizationId', { organizationId });

    // Apply filters
    if (filters?.category) {
      queryBuilder.andWhere('category.slug = :categorySlug', {
        categorySlug: filters.category,
      });
    }

    if (filters?.isAvailable !== undefined) {
      queryBuilder.andWhere('item.isAvailable = :isAvailable', {
        isAvailable: filters.isAvailable,
      });
    }

    if (filters?.isFeatured !== undefined) {
      queryBuilder.andWhere('item.isFeatured = :isFeatured', {
        isFeatured: filters.isFeatured,
      });
    }

    if (filters?.search) {
      queryBuilder.andWhere(
        '(item.title ILIKE :search OR item.description ILIKE :search)',
        { search: `%${filters.search}%` },
      );
    }

    if (filters?.minPrice !== undefined) {
      queryBuilder.andWhere('item.price >= :minPrice', { minPrice: filters.minPrice });
    }

    if (filters?.maxPrice !== undefined) {
      queryBuilder.andWhere('item.price <= :maxPrice', { maxPrice: filters.maxPrice });
    }

    if (filters?.tags) {
      const tags = filters.tags.split(',').map((tag) => tag.trim());
      queryBuilder.andWhere('item.tags && :tags', { tags });
    }

    // Get total count
    const total = await queryBuilder.getCount();

    // Apply pagination and ordering
    const items = await queryBuilder
      .orderBy('item.order', 'ASC')
      .addOrderBy('item.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getMany();

    return {
      items,
      total,
      page,
      limit,
    };
  }

  async getMenuItemById(id: number, organizationId: string): Promise<MenuItem> {
    const item = await this.menuItemRepo.findOne({
      where: { id, organizationId },
      relations: ['category'],
    });

    if (!item) {
      throw new NotFoundException('Menu item not found');
    }

    return item;
  }

  async updateMenuItem(id: number, organizationId: string, dto: UpdateMenuItemDto): Promise<MenuItem> {
    const item = await this.getMenuItemById(id, organizationId);

    // If updating category, verify it exists and belongs to same organization
    if (dto.categoryId && dto.categoryId !== item.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { id: dto.categoryId, organizationId },
      });

      if (!category) {
        throw new NotFoundException('Category not found');
      }
    }

    // If updating slug, check for duplicates
    if (dto.slug && dto.slug !== item.slug) {
      const existing = await this.menuItemRepo.findOne({
        where: { slug: dto.slug, organizationId },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException('Menu item with this slug already exists');
      }
    }

    Object.assign(item, dto);
    return this.menuItemRepo.save(item);
  }

  async toggleAvailability(id: number, organizationId: string): Promise<MenuItem> {
    const item = await this.getMenuItemById(id, organizationId);
    item.isAvailable = !item.isAvailable;
    return this.menuItemRepo.save(item);
  }

  async toggleFeatured(id: number, organizationId: string): Promise<MenuItem> {
    const item = await this.getMenuItemById(id, organizationId);
    item.isFeatured = !item.isFeatured;
    return this.menuItemRepo.save(item);
  }

  async deleteMenuItem(id: number, organizationId: string): Promise<void> {
    const item = await this.getMenuItemById(id, organizationId);
    await this.menuItemRepo.softDelete({ id, organizationId });
  }

  async bulkUpdateMenuItemOrder(organizationId: string, dto: BulkUpdateOrderDto): Promise<void> {
    // Verify all items belong to this organization
    const itemIds = dto.items.map(item => item.id);
    const items = await this.menuItemRepo.find({
      where: { id: In(itemIds), organizationId }
    });
    
    if (items.length !== itemIds.length) {
      throw new NotFoundException('One or more menu items not found');
    }

    const updates = dto.items.map((item) =>
      this.menuItemRepo.update({ id: item.id, organizationId }, { order: item.order })
    );
    await Promise.all(updates);
  }

  async bulkDeleteMenuItems(organizationId: string, ids: number[]): Promise<void> {
    // Verify all items belong to this organization
    const items = await this.menuItemRepo.find({
      where: { id: In(ids), organizationId }
    });
    
    if (items.length !== ids.length) {
      throw new NotFoundException('One or more menu items not found');
    }

    await this.menuItemRepo.softDelete({ id: In(ids), organizationId });
  }

  async getMenuStatistics(organizationId: string) {
    const [
      totalCategories,
      activeCategories,
      totalItems,
      activeItems,
      availableItems,
      featuredItems,
      avgPrice,
    ] = await Promise.all([
      this.categoryRepo.count({ where: { organizationId } }),
      this.categoryRepo.count({ where: { organizationId, isActive: true } }),
      this.menuItemRepo.count({ where: { organizationId } }),
      this.menuItemRepo.count({ where: { organizationId, isActive: true } }),
      this.menuItemRepo.count({
        where: { organizationId, isActive: true, isAvailable: true },
      }),
      this.menuItemRepo.count({
        where: { organizationId, isActive: true, isFeatured: true },
      }),
      this.menuItemRepo
        .createQueryBuilder('item')
        .select('AVG(item.price)', 'avg')
        .where('item.organizationId = :organizationId', { organizationId })
        .andWhere('item.isActive = :isActive', { isActive: true })
        .getRawOne(),
    ]);

    return {
      categories: {
        total: totalCategories,
        active: activeCategories,
      },
      items: {
        total: totalItems,
        active: activeItems,
        available: availableItems,
        featured: featuredItems,
      },
      averagePrice: parseFloat(avgPrice?.avg || 0).toFixed(2),
    };
  }
}