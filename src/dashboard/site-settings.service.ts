import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NavItem } from './entities/navigation.entity';
import { Contact } from './entities/contact.entity';
import { Location } from './entities/location.entity';
import { StatItem, Stats } from './entities/stats.entity';
import { MenuSection } from './entities/menu-section.entity';
import { WhyChooseUs, WhyChooseUsCheck, WhyChooseUsItem } from './entities/why-choose-us.entity';
import { Newsletter, NewsletterSubscriber } from './entities/newsletter.entity';
import { TestimonialItem, Testimonials } from './entities/testimonial.entity';
import { Footer, FooterLegalLink, FooterProductLink } from './entities/footer.entity';
import { Announcement } from './entities/announcement.entity';
import { Theme } from './entities/theme.entity';
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
import { SubscribeNewsletterDto } from './dtos/subscribe-newsletter.dto';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
    @InjectRepository(Location)
    private locationRepo: Repository<Location>,
    @InjectRepository(Stats)
    private statsRepo: Repository<Stats>,
    @InjectRepository(StatItem)
    private statItemRepo: Repository<StatItem>,
    @InjectRepository(MenuSection)
    private menuSectionRepo: Repository<MenuSection>,
    @InjectRepository(WhyChooseUs)
    private whyChooseUsRepo: Repository<WhyChooseUs>,
    @InjectRepository(WhyChooseUsItem)
    private whyChooseUsItemRepo: Repository<WhyChooseUsItem>,
    @InjectRepository(WhyChooseUsCheck)
    private whyChooseUsCheckRepo: Repository<WhyChooseUsCheck>,
    @InjectRepository(Newsletter)
    private newsletterRepo: Repository<Newsletter>,
    @InjectRepository(NewsletterSubscriber)
    private newsletterSubscriberRepo: Repository<NewsletterSubscriber>,
    @InjectRepository(Testimonials)
    private testimonialsRepo: Repository<Testimonials>,
    @InjectRepository(TestimonialItem)
    private testimonialItemRepo: Repository<TestimonialItem>,
    @InjectRepository(NavItem)
    private navItemRepo: Repository<NavItem>,
    @InjectRepository(Footer)
    private footerRepo: Repository<Footer>,
    @InjectRepository(FooterProductLink)
    private footerProductLinkRepo: Repository<FooterProductLink>,
    @InjectRepository(FooterLegalLink)
    private footerLegalLinkRepo: Repository<FooterLegalLink>,
    @InjectRepository(Announcement)
    private announcementRepo: Repository<Announcement>,
    @InjectRepository(Theme)
    private themeRepo: Repository<Theme>,
  ) {}

  // ========== CONTACT ==========
  async getContact(): Promise<Contact> {
    const contact = await this.contactRepo.findOne({ where: {} });
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  async updateContact( dto: UpdateContactDto): Promise<Contact> {
    let contact = await this.contactRepo.findOne({ where: {} });
    
    if (!contact) {
      contact = this.contactRepo.create(dto);
    } else {
      Object.assign(contact, dto);
    }
    
    return this.contactRepo.save(contact);
  }

  // ========== LOCATION ==========
  async getLocation(): Promise<Location> {
    const location = await this.locationRepo.findOne({ where: {} });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async updateLocation( dto: UpdateLocationDto): Promise<Location> {
    let location = await this.locationRepo.findOne({ where: {} });
    
    if (!location) {
      location = this.locationRepo.create(dto);
    } else {
      Object.assign(location, dto);
    }
    
    return this.locationRepo.save(location);
  }

  // ========== STATS ==========
  async getStats(): Promise<Stats> {
    const stats = await this.statsRepo.findOne({ where: {} });
    if (!stats) {
      throw new NotFoundException('Stats not found');
    }
    return stats;
  }

  async updateStats( dto: UpdateStatsDto): Promise<Stats> {
    let stats = await this.statsRepo.findOne({ where: {} });
    
    if (!stats) {
      stats = this.statsRepo.create(dto);
    } else {
      Object.assign(stats, dto);
    }
    
    return this.statsRepo.save(stats);
  }

  async getStatItems(): Promise<StatItem[]> {
    return this.statItemRepo.find({ 
      order: { order: 'ASC' }
    });
  }

  async createStatItem( dto: CreateStatItemDto): Promise<StatItem> {
    const statItem = this.statItemRepo.create(dto);
    return this.statItemRepo.save(statItem);
  }

  async updateStatItem(id: number,  dto: UpdateStatItemDto): Promise<StatItem> {
    const statItem = await this.statItemRepo.findOne({ where: { id } });
    if (!statItem) {
      throw new NotFoundException('Stat item not found');
    }
    Object.assign(statItem, dto);
    return this.statItemRepo.save(statItem);
  }

  async deleteStatItem(id: number, ): Promise<void> {
    const result = await this.statItemRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Stat item not found');
    }
  }

  // ========== MENU SECTION ==========
  async getMenuSection(): Promise<MenuSection> {
    const menuSection = await this.menuSectionRepo.findOne({ where: {} });
    if (!menuSection) {
      throw new NotFoundException('Menu section not found');
    }
    return menuSection;
  }

  async updateMenuSection( dto: UpdateMenuSectionDto): Promise<MenuSection> {
    let menuSection = await this.menuSectionRepo.findOne({ where: {} });
    
    if (!menuSection) {
      menuSection = this.menuSectionRepo.create(dto);
    } else {
      Object.assign(menuSection, dto);
    }
    
    return this.menuSectionRepo.save(menuSection);
  }

  // ========== WHY CHOOSE US ==========
  async getWhyChooseUs(): Promise<WhyChooseUs> {
    const whyChooseUs = await this.whyChooseUsRepo.findOne({ where: {} });
    if (!whyChooseUs) {
      throw new NotFoundException('Why choose us not found');
    }
    return whyChooseUs;
  }

  async updateWhyChooseUs( dto: UpdateWhyChooseUsDto): Promise<WhyChooseUs> {
    let whyChooseUs = await this.whyChooseUsRepo.findOne({ where: {} });
    
    if (!whyChooseUs) {
      whyChooseUs = this.whyChooseUsRepo.create(dto);
    } else {
      Object.assign(whyChooseUs, dto);
    }
    
    return this.whyChooseUsRepo.save(whyChooseUs);
  }

  async getWhyChooseUsItems(): Promise<WhyChooseUsItem[]> {
    return this.whyChooseUsItemRepo.find({ 
      order: { order: 'ASC' }
    });
  }

  async createWhyChooseUsItem( dto: CreateWhyChooseUsItemDto): Promise<WhyChooseUsItem> {
    const item = this.whyChooseUsItemRepo.create(dto);
    return this.whyChooseUsItemRepo.save(item);
  }

  async updateWhyChooseUsItem(id: number,  dto: UpdateWhyChooseUsItemDto): Promise<WhyChooseUsItem> {
    const item = await this.whyChooseUsItemRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Why choose us item not found');
    }
    Object.assign(item, dto);
    return this.whyChooseUsItemRepo.save(item);
  }

  async deleteWhyChooseUsItem(id: number, ): Promise<void> {
    const result = await this.whyChooseUsItemRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Why choose us item not found');
    }
  }

  async getWhyChooseUsChecks(): Promise<WhyChooseUsCheck[]> {
    return this.whyChooseUsCheckRepo.find({ 
      order: { order: 'ASC' }
    });
  }

  async createWhyChooseUsCheck( dto: CreateWhyChooseUsCheckDto): Promise<WhyChooseUsCheck> {
    const check = this.whyChooseUsCheckRepo.create(dto);
    return this.whyChooseUsCheckRepo.save(check);
  }

  async updateWhyChooseUsCheck(id: number,  dto: UpdateWhyChooseUsCheckDto): Promise<WhyChooseUsCheck> {
    const check = await this.whyChooseUsCheckRepo.findOne({ where: { id } });
    if (!check) {
      throw new NotFoundException('Check item not found');
    }
    Object.assign(check, dto);
    return this.whyChooseUsCheckRepo.save(check);
  }

  async deleteWhyChooseUsCheck(id: number, ): Promise<void> {
    const result = await this.whyChooseUsCheckRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Check item not found');
    }
  }

  // ========== NEWSLETTER ==========
  async getNewsletter(): Promise<Newsletter> {
    const newsletter = await this.newsletterRepo.findOne({ where: {} });
    if (!newsletter) {
      throw new NotFoundException('Newsletter not found');
    }
    return newsletter;
  }

  async updateNewsletter( dto: UpdateNewsletterDto): Promise<Newsletter> {
    let newsletter = await this.newsletterRepo.findOne({ where: {} });
    
    if (!newsletter) {
      newsletter = this.newsletterRepo.create(dto);
    } else {
      Object.assign(newsletter, dto);
    }
    
    return this.newsletterRepo.save(newsletter);
  }

  async subscribe( dto: SubscribeNewsletterDto): Promise<NewsletterSubscriber> {
    const existing = await this.newsletterSubscriberRepo.findOne({
      where: { email: dto.email }
    });
    
    if (existing) {
      return existing;
    }
    
    const subscriber = this.newsletterSubscriberRepo.create(dto);
    return this.newsletterSubscriberRepo.save(subscriber);
  }

  async getSubscribers(): Promise<NewsletterSubscriber[]> {
    return this.newsletterSubscriberRepo.find({});
  }

  // ========== TESTIMONIALS ==========
  async getTestimonials(): Promise<Testimonials> {
    const testimonials = await this.testimonialsRepo.findOne({ where: {} });
    if (!testimonials) {
      throw new NotFoundException('Testimonials not found');
    }
    return testimonials;
  }

  async updateTestimonials( dto: UpdateTestimonialsDto): Promise<Testimonials> {
    let testimonials = await this.testimonialsRepo.findOne({ where: {} });
    
    if (!testimonials) {
      testimonials = this.testimonialsRepo.create(dto);
    } else {
      Object.assign(testimonials, dto);
    }
    
    return this.testimonialsRepo.save(testimonials);
  }

  async getTestimonialItems(): Promise<TestimonialItem[]> {
    return this.testimonialItemRepo.find({ 
      where: { isActive: true },
      order: { order: 'ASC' }
    });
  }

  async getAllTestimonialItems(): Promise<TestimonialItem[]> {
    return this.testimonialItemRepo.find({ 
      order: { order: 'ASC' }
    });
  }

  async createTestimonialItem( dto: CreateTestimonialItemDto): Promise<TestimonialItem> {
    const item = this.testimonialItemRepo.create(dto);
    return this.testimonialItemRepo.save(item);
  }

  async updateTestimonialItem(id: number,  dto: UpdateTestimonialItemDto): Promise<TestimonialItem> {
    const item = await this.testimonialItemRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Testimonial item not found');
    }
    Object.assign(item, dto);
    return this.testimonialItemRepo.save(item);
  }

  async deleteTestimonialItem(id: number, ): Promise<void> {
    const result = await this.testimonialItemRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Testimonial item not found');
    }
  }

  // ========== NAVIGATION ==========
  async getNavItems(): Promise<NavItem[]> {
    return this.navItemRepo.find({ 
      where: { isActive: true },
      order: { order: 'ASC' }
    });
  }

  async getAllNavItems(): Promise<NavItem[]> {
    return this.navItemRepo.find({ 
      order: { order: 'ASC' }
    });
  }

  async createNavItem( dto: CreateNavItemDto): Promise<NavItem> {
    const item = this.navItemRepo.create(dto);
    return this.navItemRepo.save(item);
  }

  async updateNavItem(id: number,  dto: UpdateNavItemDto): Promise<NavItem> {
    const item = await this.navItemRepo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Nav item not found');
    }
    Object.assign(item, dto);
    return this.navItemRepo.save(item);
  }

  async deleteNavItem(id: number, ): Promise<void> {
    const result = await this.navItemRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Nav item not found');
    }
  }

  // ========== FOOTER ==========
  async getFooter(): Promise<Footer> {
    const footer = await this.footerRepo.findOne({ where: {} });
    if (!footer) {
      throw new NotFoundException('Footer not found');
    }
    return footer;
  }

  async updateFooter( dto: UpdateFooterDto): Promise<Footer> {
    let footer = await this.footerRepo.findOne({ where: {} });
    
    if (!footer) {
      footer = this.footerRepo.create(dto);
    } else {
      Object.assign(footer, dto);
    }
    
    return this.footerRepo.save(footer);
  }

  async getFooterProductLinks(): Promise<FooterProductLink[]> {
    return this.footerProductLinkRepo.find({ 
      order: { order: 'ASC' }
    });
  }

  async createFooterProductLink( dto: CreateFooterLinkDto): Promise<FooterProductLink> {
    const link = this.footerProductLinkRepo.create(dto);
    return this.footerProductLinkRepo.save(link);
  }

  async updateFooterProductLink(id: number,  dto: UpdateFooterLinkDto): Promise<FooterProductLink> {
    const link = await this.footerProductLinkRepo.findOne({ where: { id } });
    if (!link) {
      throw new NotFoundException('Footer product link not found');
    }
    Object.assign(link, dto);
    return this.footerProductLinkRepo.save(link);
  }

  async deleteFooterProductLink(id: number, ): Promise<void> {
    const result = await this.footerProductLinkRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Footer product link not found');
    }
  }

  async getFooterLegalLinks(): Promise<FooterLegalLink[]> {
    return this.footerLegalLinkRepo.find({ 
      order: { order: 'ASC' }
    });
  }

  async createFooterLegalLink( dto: CreateFooterLinkDto): Promise<FooterLegalLink> {
    const link = this.footerLegalLinkRepo.create(dto);
    return this.footerLegalLinkRepo.save(link);
  }

  async updateFooterLegalLink(id: number,  dto: UpdateFooterLinkDto): Promise<FooterLegalLink> {
    const link = await this.footerLegalLinkRepo.findOne({ where: { id } });
    if (!link) {
      throw new NotFoundException('Footer legal link not found');
    }
    Object.assign(link, dto);
    return this.footerLegalLinkRepo.save(link);
  }

  async deleteFooterLegalLink(id: number, ): Promise<void> {
    const result = await this.footerLegalLinkRepo.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException('Footer legal link not found');
    }
  }

  // ========== ANNOUNCEMENT ==========
  async getAnnouncement(): Promise<Announcement> {
    const announcement = await this.announcementRepo.findOne({ where: {} });
    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }
    return announcement;
  }

  async updateAnnouncement( dto: UpdateAnnouncementDto): Promise<Announcement> {
    let announcement = await this.announcementRepo.findOne({ where: {} });
    
    if (!announcement) {
      announcement = this.announcementRepo.create(dto);
    } else {
      Object.assign(announcement, dto);
    }
    
    return this.announcementRepo.save(announcement);
  }

  // ========== THEME ==========
  async getTheme(): Promise<Theme> {
    const theme = await this.themeRepo.findOne({ where: {} });
    if (!theme) {
      throw new NotFoundException('Theme not found');
    }
    return theme;
  }

  async updateTheme( dto: UpdateThemeDto): Promise<Theme> {
    let theme = await this.themeRepo.findOne({ where: {} });
    
    if (!theme) {
      theme = this.themeRepo.create(dto);
    } else {
      Object.assign(theme, dto);
    }
    
    return this.themeRepo.save(theme);
  }

  // ========== GET ALL SETTINGS ==========
  async getAllSettings() {
    const [
      contact,
      location,
      stats,
      statItems,
      menuSection,
      whyChooseUs,
      whyChooseUsItems,
      whyChooseUsChecks,
      newsletter,
      testimonials,
      testimonialItems,
      navItems,
      footer,
      footerProductLinks,
      footerLegalLinks,
      announcement,
      theme,
    ] = await Promise.all([
      this.getContact().catch(() => null),
      this.getLocation().catch(() => null),
      this.getStats().catch(() => null),
      this.getStatItems(),
      this.getMenuSection().catch(() => null),
      this.getWhyChooseUs().catch(() => null),
      this.getWhyChooseUsItems(),
      this.getWhyChooseUsChecks(),
      this.getNewsletter().catch(() => null),
      this.getTestimonials().catch(() => null),
      this.getTestimonialItems(),
      this.getNavItems(),
      this.getFooter().catch(() => null),
      this.getFooterProductLinks(),
      this.getFooterLegalLinks(),
      this.getAnnouncement().catch(() => null),
      this.getTheme().catch(() => null),
    ]);

    return {
      contact,
      location,
      stats: stats ? { ...stats, items: statItems } : null,
      menuSection,
      whyChooseUs: whyChooseUs ? { 
        ...whyChooseUs, 
        items: whyChooseUsItems,
        checkItems: whyChooseUsChecks 
      } : null,
      newsletter,
      testimonials: testimonials ? { ...testimonials, items: testimonialItems } : null,
      navItems,
      footer: footer ? { 
        ...footer, 
        productLinks: footerProductLinks,
        legalLinks: footerLegalLinks 
      } : null,
      announcement,
      theme,
    };
  }
}