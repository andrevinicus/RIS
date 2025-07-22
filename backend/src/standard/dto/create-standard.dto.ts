import { IsString, IsInt } from 'class-validator';

export class CreateStandardDto {
  @IsString()
  description: string;

  @IsInt()
  number: number;
}
