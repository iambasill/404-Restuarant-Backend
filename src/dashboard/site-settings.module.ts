import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteSettingsService } from './site-settings.service';
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
import { SiteSettingsController } from './site-settings.controller';
import { AdminSiteSettingsController } from './admin-site-settings.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Contact,
      Location,
      Stats,
      StatItem,
      MenuSection,
      WhyChooseUs,
      WhyChooseUsItem,
      WhyChooseUsCheck,
      Newsletter,
      NewsletterSubscriber,
      Testimonials,
      TestimonialItem,
      NavItem,
      Footer,
      FooterProductLink,
      FooterLegalLink,
      Announcement,
      Theme,
    ]),
  ],
  controllers: [SiteSettingsController, AdminSiteSettingsController],
  providers: [SiteSettingsService],
  exports: [SiteSettingsService],
})
export class SiteSettingsModule {}