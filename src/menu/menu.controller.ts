import { Controller, Get, Param, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuFiltersDto } from './dtos/menu-filters.dto';
import { PublicRoute } from 'src/auth/decorator/allow-anonymous.decorator';

@PublicRoute()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('categories')
  getCategories() {
    return this.menuService.getActiveCategories();
  }

  @Get('categories/:slug')
  getCategoryBySlug(@Param('slug') slug: string) {
    return this.menuService.getCategoryBySlug(slug);
  }

  @Get('items')
  getMenuItems(@Query() filters: MenuFiltersDto) {
    return this.menuService.getActiveMenuItems(filters);
  }

  @Get('items/featured')
  getFeaturedItems() {
    return this.menuService.getFeaturedItems();
  }

  @Get('items/:slug')
  getMenuItemBySlug(@Param('slug') slug: string) {
    return this.menuService.getMenuItemBySlug(slug);
  }

  @Get('category/:categoryId/items')
  getItemsByCategory(@Param('categoryId') categoryId: number) {
    return this.menuService.getItemsByCategory(categoryId);
  }
}