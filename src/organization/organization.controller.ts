import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { RolesGuard } from 'src/auth/guard/role.guar';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';


@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  create(@Body() createOrganizationDto: CreateOrganizationDto) {
    return this.organizationService.create(createOrganizationDto);
  }

  @Get()
  @Roles('admin')
  @UseGuards(RolesGuard)
  findAll() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.organizationService.findBySlug(slug);
  }

  @Patch(':id')
  @Roles('admin', 'owner')
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateOrganizationDto: UpdateOrganizationDto) {
    return this.organizationService.update(id, updateOrganizationDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.organizationService.remove(id);
  }
}