import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateDelegacionDto {
  @ApiProperty({ example: 'Delegación Azul', })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Av. Piazza 1250', required: false })
  @IsOptional()
  @IsString()
  direccion: string;

  @ApiProperty({ example: '2281422448', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'azul@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: true, default: true})
  @IsOptional()
  @IsBoolean()
  status?: boolean;

}
