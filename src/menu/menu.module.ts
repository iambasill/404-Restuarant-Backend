import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuCategory } from './entities/menu-category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { AdminMenuController } from './admin-menu.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MenuCategory, MenuItem]),
  ],
  controllers: [MenuController, AdminMenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}