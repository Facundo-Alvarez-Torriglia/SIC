import { BadRequestException } from '@nestjs/common'

export class GenericException extends BadRequestException {
  constructor(message: string) {
    super(message)
  }
}