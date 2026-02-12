import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { SubscribeNewsletterDto } from './dtos/subscribe-newsletter.dto';
import { PublicRoute } from 'src/auth/decorator/allow-anonymous.decorator';

@PublicRoute()
@Controller('dashboard')
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Get('')
  getAllSettings() {
    return this.siteSettingsService.getAllSettings();
  }

  @Get('/contact')
  getContact() {
    return this.siteSettingsService.getContact();
  }

  @Get('/location')
  getLocation() {
    return this.siteSettingsService.getLocation();
  }

  @Get('/stats')
  async getStats() {
    const stats = await this.siteSettingsService.getStats();
    const items = await this.siteSettingsService.getStatItems();
    return { ...stats, items };
  }

  @Get('/menu-section')
  getMenuSection() {
    return this.siteSettingsService.getMenuSection();
  }

  @Get('/why-choose-us')
  async getWhyChooseUs() {
    const whyChooseUs = await this.siteSettingsService.getWhyChooseUs();
    const items = await this.siteSettingsService.getWhyChooseUsItems();
    const checks = await this.siteSettingsService.getWhyChooseUsChecks();
    return { ...whyChooseUs, items, checkItems: checks };
  }

  @Get('/newsletter')
  getNewsletter() {
    return this.siteSettingsService.getNewsletter();
  }

  @Post('/newsletter/subscribe')
  subscribe(
    @Body() dto: SubscribeNewsletterDto,
    
  ) {
    return this.siteSettingsService.subscribe( dto);
  }

  @Get('/testimonials')
  async getTestimonials() {
    const testimonials = await this.siteSettingsService.getTestimonials();
    const items = await this.siteSettingsService.getTestimonialItems();
    return { ...testimonials, items };
  }

  @Get('/navigation')
  getNavItems() {
    return this.siteSettingsService.getNavItems();
  }

  @Get('/footer')
  async getFooter() {
    const footer = await this.siteSettingsService.getFooter();
    const productLinks = await this.siteSettingsService.getFooterProductLinks();
    const legalLinks = await this.siteSettingsService.getFooterLegalLinks();
    return { ...footer, productLinks, legalLinks };
  }

  @Get('/announcement')
  getAnnouncement() {
    return this.siteSettingsService.getAnnouncement();
  }

  @Get('/theme')
  getTheme() {
    return this.siteSettingsService.getTheme();
  }
}