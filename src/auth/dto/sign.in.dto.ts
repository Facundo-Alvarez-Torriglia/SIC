import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class SignInDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsNotEmpty()
  @IsString()
  usuario: string

  @ApiProperty({ example: '1212121' })
  @IsNotEmpty()
  @IsString()
  password: string
}
