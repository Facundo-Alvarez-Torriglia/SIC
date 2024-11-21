import {  Controller, Get, HttpCode, Req } from '@nestjs/common'
import { UserGuardDto } from 'src/common/dto/request/current.user.dto'
import { UserService } from './user.service'


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('test')
  @HttpCode(200)
  async test(@Req() req: Request & { user: UserGuardDto; lang: string }) {
    return this.userService.test()
  }

}