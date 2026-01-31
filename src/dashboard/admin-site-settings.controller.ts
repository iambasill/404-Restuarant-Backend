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

@Controller('admin/site-settings')
export class AdminSiteSettingsController {
    constructor(private readonly siteSettingsService: SiteSettingsService) { }

    // ========== GROUPED ENDPOINTS ==========

    @Get('overview')
    async getOverview(@GetUser("organizationID") orgId: string) {
        const [contact, theme, announcement] = await Promise.all([
            this.siteSettingsService.getContact(orgId).catch(() => null),
            this.siteSettingsService.getTheme(orgId).catch(() => null),
            this.siteSettingsService.getAnnouncement(orgId).catch(() => null),
        ]);

        return { contact, theme, announcement };
    }

    @Get('hero-section')
    async getHeroSection(@GetUser("organizationID") orgId: string) {
        const [location, stats, statItems, announcement] = await Promise.all([
            this.siteSettingsService.getLocation(orgId).catch(() => null),
            this.siteSettingsService.getStats(orgId).catch(() => null),
            this.siteSettingsService.getStatItems(orgId),
            this.siteSettingsService.getAnnouncement(orgId).catch(() => null),
        ]);

        return {
            location,
            stats: stats ? { ...stats, items: statItems } : null,
            announcement,
        };
    }

    @Get('content-sections')
    async getContentSections(@GetUser("organizationID") orgId: string) {
        const [
            whyChooseUs,
            whyChooseUsItems,
            whyChooseUsChecks,
            testimonials,
            testimonialItems,
            menuSection,
        ] = await Promise.all([
            this.siteSettingsService.getWhyChooseUs(orgId).catch(() => null),
            this.siteSettingsService.getWhyChooseUsItems(orgId),
            this.siteSettingsService.getWhyChooseUsChecks(orgId),
            this.siteSettingsService.getTestimonials(orgId).catch(() => null),
            this.siteSettingsService.getTestimonialItems(orgId),
            this.siteSettingsService.getMenuSection(orgId).catch(() => null),
        ]);

        return {
            whyChooseUs: whyChooseUs ? {
                ...whyChooseUs,
                items: whyChooseUsItems,
                checkItems: whyChooseUsChecks,
            } : null,
            testimonials: testimonials ? {
                ...testimonials,
                items: testimonialItems,
            } : null,
            menuSection,
        };
    }

    @Get('layout')
    async getLayout(@GetUser("organizationID") orgId: string) {
        const [navItems, footer, productLinks, legalLinks] = await Promise.all([
            this.siteSettingsService.getNavItems(orgId),
            this.siteSettingsService.getFooter(orgId).catch(() => null),
            this.siteSettingsService.getFooterProductLinks(orgId),
            this.siteSettingsService.getFooterLegalLinks(orgId),
        ]);

        return {
            navigation: navItems,
            footer: footer ? {
                ...footer,
                productLinks,
                legalLinks,
            } : null,
        };
    }

    @Get('newsletter-settings')
    async getNewsletterSettings(@GetUser("organizationID") orgId: string) {
        const [newsletter, subscribers] = await Promise.all([
            this.siteSettingsService.getNewsletter(orgId).catch(() => null),
            this.siteSettingsService.getSubscribers(orgId),
        ]);

        return {
            newsletter,
            subscribers,
            totalSubscribers: subscribers.length,
        };
    }

    // ========== INDIVIDUAL ENDPOINTS ==========

    @Put('contact')
    updateContact(@GetUser("organizationID") orgId: string, @Body() dto: UpdateContactDto) {
        return this.siteSettingsService.updateContact(orgId, dto);
    }

    @Put('location')
    updateLocation(@GetUser("organizationID") orgId: string, @Body() dto: UpdateLocationDto) {
        return this.siteSettingsService.updateLocation(orgId, dto);
    }

    @Put('stats')
    updateStats(@GetUser("organizationID") orgId: string, @Body() dto: UpdateStatsDto) {
        return this.siteSettingsService.updateStats(orgId, dto);
    }

    @Get('stats/items')
    getStatItems(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getStatItems(orgId);
    }

    @Post('stats/items')
    createStatItem(@GetUser("organizationID") orgId: string, @Body() dto: CreateStatItemDto) {
        return this.siteSettingsService.createStatItem(orgId, dto);
    }

    @Put('stats/items/:id')
    updateStatItem(@Param('id') id: number, @GetUser("organizationID") orgId: string, @Body() dto: UpdateStatItemDto) {
        return this.siteSettingsService.updateStatItem(id, orgId, dto);
    }

    @Delete('stats/items/:id')
    deleteStatItem(@Param('id') id: number, @GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.deleteStatItem(id, orgId);
    }

    @Put('menu-section')
    updateMenuSection(@GetUser("organizationID") orgId: string, @Body() dto: UpdateMenuSectionDto) {
        return this.siteSettingsService.updateMenuSection(orgId, dto);
    }

    @Put('why-choose-us')
    updateWhyChooseUs(@GetUser("organizationID") orgId: string, @Body() dto: UpdateWhyChooseUsDto) {
        return this.siteSettingsService.updateWhyChooseUs(orgId, dto);
    }

    @Get('why-choose-us/items')
    getWhyChooseUsItems(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getWhyChooseUsItems(orgId);
    }

    @Post('why-choose-us/items')
    createWhyChooseUsItem(@GetUser("organizationID") orgId: string, @Body() dto: CreateWhyChooseUsItemDto) {
        return this.siteSettingsService.createWhyChooseUsItem(orgId, dto);
    }

    @Put('why-choose-us/items/:id')
    updateWhyChooseUsItem(@Param('id') id: number, @GetUser("organizationID") orgId: string, @Body() dto: UpdateWhyChooseUsItemDto) {
        return this.siteSettingsService.updateWhyChooseUsItem(id, orgId, dto);
    }

    @Delete('why-choose-us/items/:id')
    deleteWhyChooseUsItem(@Param('id') id: number, @GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.deleteWhyChooseUsItem(id, orgId);
    }

    @Get('why-choose-us/checks')
    getWhyChooseUsChecks(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getWhyChooseUsChecks(orgId);
    }

    @Post('why-choose-us/checks')
    createWhyChooseUsCheck(@GetUser("organizationID") orgId: string, @Body() dto: CreateWhyChooseUsCheckDto) {
        return this.siteSettingsService.createWhyChooseUsCheck(orgId, dto);
    }

    @Put('why-choose-us/checks/:id')
    updateWhyChooseUsCheck(@Param('id') id: number, @GetUser("organizationID") orgId: string, @Body() dto: UpdateWhyChooseUsCheckDto) {
        return this.siteSettingsService.updateWhyChooseUsCheck(id, orgId, dto);
    }

    @Delete('why-choose-us/checks/:id')
    deleteWhyChooseUsCheck(@Param('id') id: number, @GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.deleteWhyChooseUsCheck(id, orgId);
    }

    @Put('newsletter')
    updateNewsletter(@GetUser("organizationID") orgId: string, @Body() dto: UpdateNewsletterDto) {
        return this.siteSettingsService.updateNewsletter(orgId, dto);
    }

    @Get('newsletter/subscribers')
    getSubscribers(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getSubscribers(orgId);
    }

    @Put('testimonials')
    updateTestimonials(@GetUser("organizationID") orgId: string, @Body() dto: UpdateTestimonialsDto) {
        return this.siteSettingsService.updateTestimonials(orgId, dto);
    }

    @Get('testimonials/items')
    getAllTestimonialItems(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getAllTestimonialItems(orgId);
    }

    @Post('testimonials/items')
    createTestimonialItem(@GetUser("organizationID") orgId: string, @Body() dto: CreateTestimonialItemDto) {
        return this.siteSettingsService.createTestimonialItem(orgId, dto);
    }

    @Put('testimonials/items/:id')
    updateTestimonialItem(@Param('id') id: number, @GetUser("organizationID") orgId: string, @Body() dto: UpdateTestimonialItemDto) {
        return this.siteSettingsService.updateTestimonialItem(id, orgId, dto);
    }

    @Delete('testimonials/items/:id')
    deleteTestimonialItem(@Param('id') id: number, @GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.deleteTestimonialItem(id, orgId);
    }

    @Get('navigation')
    getAllNavItems(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getAllNavItems(orgId);
    }

    @Post('navigation')
    createNavItem(@GetUser("organizationID") orgId: string, @Body() dto: CreateNavItemDto) {
        return this.siteSettingsService.createNavItem(orgId, dto);
    }

    @Put('navigation/:id')
    updateNavItem(@Param('id') id: number, @GetUser("organizationID") orgId: string, @Body() dto: UpdateNavItemDto) {
        return this.siteSettingsService.updateNavItem(id, orgId, dto);
    }

    @Delete('navigation/:id')
    deleteNavItem(@Param('id') id: number, @GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.deleteNavItem(id, orgId);
    }

    @Put('footer')
    updateFooter(@GetUser("organizationID") orgId: string, @Body() dto: UpdateFooterDto) {
        return this.siteSettingsService.updateFooter(orgId, dto);
    }

    @Get('footer/product-links')
    getFooterProductLinks(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getFooterProductLinks(orgId);
    }

    @Post('footer/product-links')
    createFooterProductLink(@GetUser("organizationID") orgId: string, @Body() dto: CreateFooterLinkDto) {
        return this.siteSettingsService.createFooterProductLink(orgId, dto);
    }

    @Put('footer/product-links/:id')
    updateFooterProductLink(@Param('id') id: number, @GetUser("organizationID") orgId: string, @Body() dto: UpdateFooterLinkDto) {
        return this.siteSettingsService.updateFooterProductLink(id, orgId, dto);
    }

    @Delete('footer/product-links/:id')
    deleteFooterProductLink(@Param('id') id: number, @GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.deleteFooterProductLink(id, orgId);
    }

    @Get('footer/legal-links')
    getFooterLegalLinks(@GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.getFooterLegalLinks(orgId);
    }

    @Post('footer/legal-links')
    createFooterLegalLink(@GetUser("organizationID") orgId: string, @Body() dto: CreateFooterLinkDto) {
        return this.siteSettingsService.createFooterLegalLink(orgId, dto);
    }

    @Put('footer/legal-links/:id')
    updateFooterLegalLink(@Param('id') id: number, @GetUser("organizationID") orgId: string, @Body() dto: UpdateFooterLinkDto) {
        return this.siteSettingsService.updateFooterLegalLink(id, orgId, dto);
    }

    @Delete('footer/legal-links/:id')
    deleteFooterLegalLink(@Param('id') id: number, @GetUser("organizationID") orgId: string) {
        return this.siteSettingsService.deleteFooterLegalLink(id, orgId);
    }

    @Put('announcement')
    updateAnnouncement(@GetUser("organizationID") orgId: string, @Body() dto: UpdateAnnouncementDto) {
        return this.siteSettingsService.updateAnnouncement(orgId, dto);
    }

    @Put('theme')
    updateTheme(@GetUser("organizationID") orgId: string, @Body() dto: UpdateThemeDto) {
        return this.siteSettingsService.updateTheme(orgId, dto);
    }
}