import { Injectable } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}
  getHello(): string {
    return 'Hello World!'
  }

  async onModuleInit() {
    await this.createAdmin()
  }
  async createAdmin() {
    const params = {
      usuario: process.env.ADMIN_USERNAME || 'superAdmin',
      email: process.env.ADMIN_GMAIL || 'superAdmin@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'Admin123',
    }
    await this.authService.signUpSuperAdmin(params)
    console.info('super admin info: ', params)
  }
}
