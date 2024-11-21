import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class UpdateDelegacionDto {
  @ApiProperty({ example: 'Nuevo Nombre de la Delegación', required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ example: 'Nueva Dirección', required: false })
  @IsOptional()
  @IsString()
  direccion?: string;

  @ApiProperty({ example: '2281422449', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: 'nuevo-email@example.com', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: true, default: true, required: false })
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
