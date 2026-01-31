import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { SubscribeNewsletterDto } from './dtos/subscribe-newsletter.dto';

@Controller('site-settings')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get('')
  getAllSettings(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getAllSettings(orgId);
  }

  @Get('/contact')
  getContact(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getContact(orgId);
  }

  @Get('/location')
  getLocation(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getLocation(orgId);
  }

  @Get('/stats')
  async getStats(@Query('orgId') orgId: string) {
    const stats = await this.siteSettingsService.getStats(orgId);
    const items = await this.siteSettingsService.getStatItems(orgId);
    return { ...stats, items };
  }

  @Get('/menu-section')
  getMenuSection(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getMenuSection(orgId);
  }

  @Get('/why-choose-us')
  async getWhyChooseUs(@Query('orgId') orgId: string) {
    const whyChooseUs = await this.siteSettingsService.getWhyChooseUs(orgId);
    const items = await this.siteSettingsService.getWhyChooseUsItems(orgId);
    const checks = await this.siteSettingsService.getWhyChooseUsChecks(orgId);
    return { ...whyChooseUs, items, checkItems: checks };
  }

  @Get('/newsletter')
  getNewsletter(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getNewsletter(orgId);
  }

  @Post('/newsletter/subscribe')
  subscribe(
    @Body() dto: SubscribeNewsletterDto,
    @Query('orgId') orgId: string
  ) {
    return this.siteSettingsService.subscribe(orgId, dto);
  }

  @Get('/testimonials')
  async getTestimonials(@Query('orgId') orgId: string) {
    const testimonials = await this.siteSettingsService.getTestimonials(orgId);
    const items = await this.siteSettingsService.getTestimonialItems(orgId);
    return { ...testimonials, items };
  }

  @Get('/navigation')
  getNavItems(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getNavItems(orgId);
  }

  @Get('/footer')
  async getFooter(@Query('orgId') orgId: string) {
    const footer = await this.siteSettingsService.getFooter(orgId);
    const productLinks = await this.siteSettingsService.getFooterProductLinks(orgId);
    const legalLinks = await this.siteSettingsService.getFooterLegalLinks(orgId);
    return { ...footer, productLinks, legalLinks };
  }

  @Get('/announcement')
  getAnnouncement(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getAnnouncement(orgId);
  }

  @Get('/theme')
  getTheme(@Query('orgId') orgId: string) {
    return this.siteSettingsService.getTheme(orgId);
  }
}