import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsUrl, IsUUID, IsEmail } from 'class-validator';
import { Organization } from 'src/organization/entities/organisation.entity';
import { Column, JoinColumn, ManyToOne } from 'typeorm';


export class UpdateContactDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

    @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'organizationId' })
    organization: Organization;

    @Column({ type: 'uuid' })
    organizationId: string;
}
