import { InternalServerErrorException } from '@nestjs/common'

export class GeneralException extends InternalServerErrorException {
  constructor(message: string) {
    super(message)
  }
}