import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsUrl } from 'class-validator';

export class UpdateInformeSocialDto {
  @ApiProperty({ example: '2024-11-20', required: false })
  @IsOptional()
  @IsDate()
  fecha?: Date;

  @ApiProperty({ example: 'Nuevo Título del Informe', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ example: 'Desarrollo actualizado del informe', required: false })
  @IsOptional()
  @IsString()
  descripcionInforme?: string;

  @ApiProperty({ example: 'Descripción actualizada del conflicto o del Hecho', required: false })
  @IsOptional()
  @IsString()
  conflicto?: string;

  @ApiProperty({ example: 'Antecedentes actualizados relevantes', required: false })
  @IsOptional()
  @IsString()
  antecedentes?: string;

  @ApiProperty({ example: 'Actualización de Baja - Media o Alta', required: false })
  @IsOptional()
  @IsString()
  conflictividad?: string;

  @ApiProperty({ example: '-37.24937609540981, -61.26179675778917', required: false })
  @IsOptional()
  @IsString()
  geo?: string;

  @ApiProperty({ example: 'https://example.com/actualizacion', required: false })
  @IsOptional()
  @IsUrl()
  fuente?: string;
}
