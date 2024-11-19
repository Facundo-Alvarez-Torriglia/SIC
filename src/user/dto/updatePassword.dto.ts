import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UpdatePassword {
  @ApiProperty({ example: 'pass123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  confirmPassword: string

  @ApiProperty({ example: 'pass123' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string

  @ApiProperty({ example: 'pass123' })
  @IsNotEmpty()
  @IsString()
  password: string
}
