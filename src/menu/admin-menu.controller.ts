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
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { BulkUpdateOrderDto } from './dtos/bulk-update-order.dto';
import { MenuFiltersDto } from './dtos/menu-filters.dto';
import { CreateMenuItemDto } from './dtos/create-menu-item.dto';
import { UpdateMenuItemDto } from './dtos/update-menu-item.dto';

@Controller('admin/menu')
export class AdminMenuController {
  constructor(private readonly menuService: MenuService) { }

  // ========== CATEGORIES ==========
  @Get('categories')
  getAllCategories() {
    return this.menuService.getAllCategories();
  }

  @Get('categories/:id')
  getCategoryById(@Param('id') id: number) {
    return this.menuService.getCategoryById(id);
  }

  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.menuService.createCategory(dto);
  }

  @Put('categories/:id')
  updateCategory(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    return this.menuService.updateCategory(id, dto);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id') id: number) {
    return this.menuService.deleteCategory(id);
  }

  @Patch('categories/reorder')
  bulkUpdateCategoryOrder(@Body() dto: BulkUpdateOrderDto) {
    return this.menuService.bulkUpdateCategoryOrder(dto);
  }

  // ========== MENU ITEMS ==========
  @Get('items')
  getAllMenuItems(@Query() filters: MenuFiltersDto) {
    return this.menuService.getAllMenuItems(filters);
  }

  @Get('items/:id')
  getMenuItemById(@Param('id') id: number) {
    return this.menuService.getMenuItemById(id);
  }

  @Post('items')
  createMenuItem(@Body() dto: CreateMenuItemDto) {
    return this.menuService.createMenuItem(dto);
  }

  @Put('items/:id')
  updateMenuItem(@Param('id') id: number, @Body() dto: UpdateMenuItemDto) {
    return this.menuService.updateMenuItem(id, dto);
  }

  @Patch('items/:id/toggle-availability')
  toggleAvailability(@Param('id') id: number) {
    return this.menuService.toggleAvailability(id);
  }

  @Patch('items/:id/toggle-featured')
  toggleFeatured(@Param('id') id: number) {
    return this.menuService.toggleFeatured(id);
  }

  @Delete('items/:id')
  deleteMenuItem(@Param('id') id: number) {
    return this.menuService.deleteMenuItem(id);
  }

  @Patch('items/reorder')
  bulkUpdateMenuItemOrder(@Body() dto: BulkUpdateOrderDto) {
    return this.menuService.bulkUpdateMenuItemOrder(dto);
  }

  @Delete('items/bulk')
  bulkDeleteMenuItems(@Body() body: { ids: number[] }) {
    return this.menuService.bulkDeleteMenuItems(body.ids);
  }

  // ========== STATISTICS ==========
  @Get('statistics')
  getStatistics() {
    return this.menuService.getMenuStatistics();
  }
}