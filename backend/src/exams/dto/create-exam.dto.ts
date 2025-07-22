import { IsString, IsInt, IsBoolean, IsOptional, MaxLength, Min } from 'class-validator';

export class CreateExamDto {
  @IsString()
  description: string;

  @IsString()
  @MaxLength(100)
  shortDescription: string;

  @IsString()
  honorariumGroup: string;

  @IsString()
  modality: string;

  @IsInt()
  @Min(0)
  deliveryTimeDays: number;

  @IsInt()
  @Min(0)
  paidHonorariums: number;

  @IsBoolean()
  hasReport: boolean;
}
