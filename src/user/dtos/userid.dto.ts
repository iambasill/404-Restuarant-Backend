import { isString, IsUUID, isUUID } from 'class-validator';

export class UserId {
  @IsUUID()
  userId: string;
}
