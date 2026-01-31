import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { BulkUpdateOrderDto } from './dtos/bulk-update-order.dto';
import { MenuFiltersDto } from './dtos/menu-filters.dto';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('admin/menu')
export class AdminMenuController {
  constructor(private readonly menuService: MenuService) {}

  // ========== CATEGORIES ==========
  @Get('categories')
  getAllCategories(@GetUser("organizationId") orgId: string) {
    return this.menuService.getAllCategories(orgId);
  }

  @Get('categories/:id')
  getCategoryById(@Param('id') id: number, @GetUser("organizationId") orgId: string) {
    return this.menuService.getCategoryById(id, orgId);
  }

  @Post('categories')
  createCategory(@GetUser("organizationId") orgId: string, @Body() dto: CreateCategoryDto) {
    return this.menuService.createCategory(orgId, dto);
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: number, @GetUser("organizationId") orgId: string, @Body() dto: UpdateCategoryDto) {
    return this.menuService.updateCategory(id, orgId, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: number, @GetUser("organizationId") orgId: string) {
    return this.menuService.deleteCategory(id, orgId);
  }

  @Patch('categories/reorder')
  bulkUpdateCategoryOrder(@GetUser("organizationId") orgId: string, @Body() dto: BulkUpdateOrderDto) {
    return this.menuService.bulkUpdateCategoryOrder(orgId, dto);
  }

  // ========== MENU ITEMS ==========
  @Get('items')
  getAllMenuItems(@GetUser("organizationId") orgId: string, @Query() filters: MenuFiltersDto) {
    return this.menuService.getAllMenuItems(orgId, filters);
  }

  @Get('items/:id')
  getMenuItemById(@Param('id') id: number, @GetUser("organizationId") orgId: string) {
    return this.menuService.getMenuItemById(id, orgId);
  }

  @Post('items')
  createMenuItem(@GetUser("organizationId") orgId: string, @Body() dto: CreateMenuItemDto) {
    return this.menuService.createMenuItem(orgId, dto);
  }

  @Put('items/:id')
  updateMenuItem(@Param('id') id: number, @GetUser("organizationId") orgId: string, @Body() dto: UpdateMenuItemDto) {
    return this.menuService.updateMenuItem(id, orgId, dto);
  }

  @Patch('items/:id/toggle-availability')
  toggleAvailability(@Param('id') id: number, @GetUser("organizationId") orgId: string) {
    return this.menuService.toggleAvailability(id, orgId);
  }

  @Patch('items/:id/toggle-featured')
  toggleFeatured(@Param('id') id: number, @GetUser("organizationId") orgId: string) {
    return this.menuService.toggleFeatured(id, orgId);
  }

  @Delete('items/:id')
  deleteMenuItem(@Param('id') id: number, @GetUser("organizationId") orgId: string) {
    return this.menuService.deleteMenuItem(id, orgId);
  }

  @Patch('items/reorder')
  bulkUpdateMenuItemOrder(@GetUser("organizationId") orgId: string, @Body() dto: BulkUpdateOrderDto) {
    return this.menuService.bulkUpdateMenuItemOrder(orgId, dto);
  }

  @Delete('items/bulk')
  bulkDeleteMenuItems(@GetUser("organizationId") orgId: string, @Body() body: { ids: number[] }) {
    return this.menuService.bulkDeleteMenuItems(orgId, body.ids);
  }

  // ========== STATISTICS ==========
  @Get('statistics')
  getStatistics(@GetUser("organizationId") orgId: string) {
    return this.menuService.getMenuStatistics(orgId);
  }
}