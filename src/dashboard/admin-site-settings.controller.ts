// src/modules/site-settings/admin-site-settings.controller.ts
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { SiteSettingsService } from './site-settings.service';
import { UpdateContactDto } from './dtos/update-contact.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { UpdateStatsDto } from './dtos/update-stats.dto';
import { CreateStatItemDto, UpdateStatItemDto } from './dtos/create-stat-item.dto';
import { UpdateMenuSectionDto } from './dtos/update-menu-section.dto';
import { UpdateWhyChooseUsDto } from './dtos/update-why-choose-us.dto';
import { CreateWhyChooseUsItemDto, UpdateWhyChooseUsItemDto } from './dtos/create-why-choose-us-item.dto';
import { CreateWhyChooseUsCheckDto, UpdateWhyChooseUsCheckDto } from './dtos/create-why-choose-us-check.dto';
import { UpdateTestimonialsDto } from './dtos/update-testimonials.dto';
import { CreateTestimonialItemDto, UpdateTestimonialItemDto } from './dtos/create-testimonial-item.dto';
import { CreateNavItemDto, UpdateNavItemDto } from './dtos/create-nav-item.dto';
import { UpdateFooterDto } from './dtos/update-footer.dto';
import { CreateFooterLinkDto, UpdateFooterLinkDto } from './dtos/create-footer-link.dto';
import { UpdateAnnouncementDto } from './dtos/update-announcement.dto';
import { UpdateThemeDto } from './dtos/update-theme.dto';
import { UpdateNewsletterDto } from './dtos/update-newsletter.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('fc/org-settings')
export class AdminSiteSettingsController {
    constructor(private readonly siteSettingsService: SiteSettingsService) { }

    // ========== GROUPED ENDPOINTS (NO MORE .catch(() => null)) ==========

    @Get('overview')
    async getOverview() {
        const [contact, theme, announcement] = await Promise.all([
            this.siteSettingsService.getContact(),
            this.siteSettingsService.getTheme(),
            this.siteSettingsService.getAnnouncement(),
        ]);

        return { contact, theme, announcement };
    }

    @Get('hero-section')
    async getHeroSection() {
        const [location, stats, statItems, announcement] = await Promise.all([
            this.siteSettingsService.getLocation(),
            this.siteSettingsService.getStats(),
            this.siteSettingsService.getStatItems(),
            this.siteSettingsService.getAnnouncement(),
        ]);

        return {
            location,
            stats: { ...stats, items: statItems },
            announcement,
        };
    }

    @Get('content-sections')
    async getContentSections() {
        const [
            whyChooseUs,
            whyChooseUsItems,
            whyChooseUsChecks,
            testimonials,
            testimonialItems,
            menuSection,
        ] = await Promise.all([
            this.siteSettingsService.getWhyChooseUs(),
            this.siteSettingsService.getWhyChooseUsItems(),
            this.siteSettingsService.getWhyChooseUsChecks(),
            this.siteSettingsService.getTestimonials(),
            this.siteSettingsService.getTestimonialItems(),
            this.siteSettingsService.getMenuSection(),
        ]);

        return {
            whyChooseUs: {
                ...whyChooseUs,
                items: whyChooseUsItems,
                checkItems: whyChooseUsChecks,
            },
            testimonials: {
                ...testimonials,
                items: testimonialItems,
            },
            menuSection,
        };
    }

    @Get('layout')
    async getLayout() {
        const [navItems, footer, productLinks, legalLinks] = await Promise.all([
            this.siteSettingsService.getNavItems(),
            this.siteSettingsService.getFooter(),
            this.siteSettingsService.getFooterProductLinks(),
            this.siteSettingsService.getFooterLegalLinks(),
        ]);

        return {
            navigation: navItems,
            footer: {
                ...footer,
                productLinks,
                legalLinks,
            },
        };
    }

    @Get('newsletter-settings')
    async getNewsletterSettings() {
        const [newsletter, subscribers] = await Promise.all([
            this.siteSettingsService.getNewsletter(),
            this.siteSettingsService.getSubscribers(),
        ]);

        return {
            newsletter,
            subscribers,
            totalSubscribers: subscribers.length,
        };
    }

    // ========== INDIVIDUAL ENDPOINTS (unchanged) ==========

    @Put('contact')
    updateContact( @Body() dto: UpdateContactDto) {
        return this.siteSettingsService.updateContact( dto);
    }

    @Put('location')
    updateLocation( @Body() dto: UpdateLocationDto) {
        return this.siteSettingsService.updateLocation( dto);
    }

    @Put('stats')
    updateStats( @Body() dto: UpdateStatsDto) {
        return this.siteSettingsService.updateStats( dto);
    }

    @Get('stats/items')
    getStatItems() {
        return this.siteSettingsService.getStatItems();
    }

    @Post('stats/items')
    createStatItem( @Body() dto: CreateStatItemDto) {
        return this.siteSettingsService.createStatItem( dto);
    }

    @Put('stats/items/:id')
    updateStatItem(@Param('id') id: number,  @Body() dto: UpdateStatItemDto) {
        return this.siteSettingsService.updateStatItem(id,  dto);
    }

    @Delete('stats/items/:id')
    deleteStatItem(@Param('id') id: number, ) {
        return this.siteSettingsService.deleteStatItem(id);
    }

    @Put('menu-section')
    updateMenuSection( @Body() dto: UpdateMenuSectionDto) {
        return this.siteSettingsService.updateMenuSection( dto);
    }

    @Put('why-choose-us')
    updateWhyChooseUs( @Body() dto: UpdateWhyChooseUsDto) {
        return this.siteSettingsService.updateWhyChooseUs( dto);
    }

    @Get('why-choose-us/items')
    getWhyChooseUsItems() {
        return this.siteSettingsService.getWhyChooseUsItems();
    }

    @Post('why-choose-us/items')
    createWhyChooseUsItem( @Body() dto: CreateWhyChooseUsItemDto) {
        return this.siteSettingsService.createWhyChooseUsItem( dto);
    }

    @Put('why-choose-us/items/:id')
    updateWhyChooseUsItem(@Param('id') id: number,  @Body() dto: UpdateWhyChooseUsItemDto) {
        return this.siteSettingsService.updateWhyChooseUsItem(id,  dto);
    }

    @Delete('why-choose-us/items/:id')
    deleteWhyChooseUsItem(@Param('id') id: number, ) {
        return this.siteSettingsService.deleteWhyChooseUsItem(id);
    }

    @Get('why-choose-us/checks')
    getWhyChooseUsChecks() {
        return this.siteSettingsService.getWhyChooseUsChecks();
    }

    @Post('why-choose-us/checks')
    createWhyChooseUsCheck( @Body() dto: CreateWhyChooseUsCheckDto) {
        return this.siteSettingsService.createWhyChooseUsCheck( dto);
    }

    @Put('why-choose-us/checks/:id')
    updateWhyChooseUsCheck(@Param('id') id: number,  @Body() dto: UpdateWhyChooseUsCheckDto) {
        return this.siteSettingsService.updateWhyChooseUsCheck(id,  dto);
    }

    @Delete('why-choose-us/checks/:id')
    deleteWhyChooseUsCheck(@Param('id') id: number, ) {
        return this.siteSettingsService.deleteWhyChooseUsCheck(id);
    }

    @Put('newsletter')
    updateNewsletter( @Body() dto: UpdateNewsletterDto) {
        return this.siteSettingsService.updateNewsletter( dto);
    }

    @Get('newsletter/subscribers')
    getSubscribers() {
        return this.siteSettingsService.getSubscribers();
    }

    @Put('testimonials')
    updateTestimonials( @Body() dto: UpdateTestimonialsDto) {
        return this.siteSettingsService.updateTestimonials( dto);
    }

    @Get('testimonials/items')
    getAllTestimonialItems() {
        return this.siteSettingsService.getAllTestimonialItems();
    }

    @Post('testimonials/items')
    createTestimonialItem( @Body() dto: CreateTestimonialItemDto) {
        return this.siteSettingsService.createTestimonialItem( dto);
    }

    @Put('testimonials/items/:id')
    updateTestimonialItem(@Param('id') id: number,  @Body() dto: UpdateTestimonialItemDto) {
        return this.siteSettingsService.updateTestimonialItem(id,  dto);
    }

    @Delete('testimonials/items/:id')
    deleteTestimonialItem(@Param('id') id: number, ) {
        return this.siteSettingsService.deleteTestimonialItem(id);
    }

    @Get('navigation')
    getAllNavItems() {
        return this.siteSettingsService.getAllNavItems();
    }

    @Post('navigation')
    createNavItem( @Body() dto: CreateNavItemDto) {
        return this.siteSettingsService.createNavItem( dto);
    }

    @Put('navigation/:id')
    updateNavItem(@Param('id') id: number,  @Body() dto: UpdateNavItemDto) {
        return this.siteSettingsService.updateNavItem(id,  dto);
    }

    @Delete('navigation/:id')
    deleteNavItem(@Param('id') id: number, ) {
        return this.siteSettingsService.deleteNavItem(id);
    }

    @Put('footer')
    updateFooter( @Body() dto: UpdateFooterDto) {
        return this.siteSettingsService.updateFooter( dto);
    }

    @Get('footer/product-links')
    getFooterProductLinks() {
        return this.siteSettingsService.getFooterProductLinks();
    }

    @Post('footer/product-links')
    createFooterProductLink( @Body() dto: CreateFooterLinkDto) {
        return this.siteSettingsService.createFooterProductLink( dto);
    }

    @Put('footer/product-links/:id')
    updateFooterProductLink(@Param('id') id: number,  @Body() dto: UpdateFooterLinkDto) {
        return this.siteSettingsService.updateFooterProductLink(id,  dto);
    }

    @Delete('footer/product-links/:id')
    deleteFooterProductLink(@Param('id') id: number, ) {
        return this.siteSettingsService.deleteFooterProductLink(id);
    }

    @Get('footer/legal-links')
    getFooterLegalLinks() {
        return this.siteSettingsService.getFooterLegalLinks();
    }

    @Post('footer/legal-links')
    createFooterLegalLink( @Body() dto: CreateFooterLinkDto) {
        return this.siteSettingsService.createFooterLegalLink( dto);
    }

    @Put('footer/legal-links/:id')
    updateFooterLegalLink(@Param('id') id: number,  @Body() dto: UpdateFooterLinkDto) {
        return this.siteSettingsService.updateFooterLegalLink(id,  dto);
    }

    @Delete('footer/legal-links/:id')
    deleteFooterLegalLink(@Param('id') id: number, ) {
        return this.siteSettingsService.deleteFooterLegalLink(id);
    }

    @Put('announcement')
    updateAnnouncement( @Body() dto: UpdateAnnouncementDto) {
        return this.siteSettingsService.updateAnnouncement( dto);
    }

    @Put('theme')
    updateTheme( @Body() dto: UpdateThemeDto) {
        return this.siteSettingsService.updateTheme( dto);
    }
}