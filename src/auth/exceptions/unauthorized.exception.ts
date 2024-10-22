import { UnauthorizedException } from '@nestjs/common'
export class UnauthorizedExcept extends UnauthorizedException {
  constructor(message: string) {
    super(message)
  }
}