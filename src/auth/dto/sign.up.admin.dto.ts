import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Delegaciones } from 'src/common/types/delegaciones'

export class SignUpAdminDto {
  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  usuario: string

  @ApiProperty({ example: 'Juan' })
  @IsNotEmpty()
  @IsString()
  nombre: string

  @ApiProperty({ example: 'Perez' })
  @IsNotEmpty()
  @IsString()
  apellido: string

  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ example: 'pass123' })
  @IsNotEmpty()
  @IsString()
  password: string

  @ApiProperty({ example: '23789' })
  @IsNotEmpty()
  @IsString()
  legajo: string

  @ApiProperty({ example: 'DDIC AZUL' })
  @IsNotEmpty()
  @IsString()
  delegaccion: Delegaciones
}
