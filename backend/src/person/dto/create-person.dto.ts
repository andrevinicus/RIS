import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsOptional,
  Matches,
  Length,
  IsNumber,
} from 'class-validator';

export class CreatePersonDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: 'CPF deve ter 11 caracteres' })
  @Matches(/^\d+$/, { message: 'CPF deve conter somente números' })
  cpf: string;

  @IsNotEmpty()
  @IsDateString()
  birthDate: string;

  @IsOptional()
  @IsString()
  document_number?: string;

  @IsOptional()
  @IsString()
  document_type?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone_mobile_number?: string;

  @IsOptional()
  @IsString()
  phone_work_number?: string;

  @IsOptional()
  @IsString()
  sex?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  marital_status?: string;

  @IsOptional()
  @IsString()
  mother_name?: string;

  @IsOptional()
  @IsString()
  father_name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  insurance_id?: string;

  @IsOptional()
  @IsString()
  insurance_card_number?: string;

  @IsOptional()
  @IsString()
  observations?: string;


}
