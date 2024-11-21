import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInformeSocialDto {
  @ApiProperty({ example: '2024-11-20' })
  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @ApiProperty({ example: 'Título del Informe' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'Desarrollo del informe' })
  @IsString()
  descripcionInforme: string;

  @ApiProperty({ example: 'Descripción del conflicto o del Hecho' })
  @IsString()
  conflicto: string;

  @ApiProperty({ example: 'Antecedentes relevantes' })
  @IsString()
  antecedentes: string;

  @ApiProperty({ example: 'Baja - Media o Alta' })
  @IsString()
  conflictividad: string;

  @ApiProperty({ example: '-37.24937609540981, -61.26179675778917' })
  @IsString()
  geo?: string;

  @ApiProperty({ example: 'https://example.com' })
  @IsUrl()
  fuente: string;
}

