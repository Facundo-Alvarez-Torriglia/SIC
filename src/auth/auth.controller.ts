import {
    Body,
    Controller,
    HttpCode,
    Post,
    Req,
    UseGuards,
  } from '@nestjs/common'
  import { AuthService } from './auth.service'
  import { SignInDto } from './dto/sign.in.dto'
  import { Roles } from 'src/common/types/roles'
  import { SignUpDto } from './dto/sign.up.dto'
  import { AuthGuard } from './auth.guard'
  import { UserGuardDto } from 'src/common/dto/request/current.user.dto'
  import { SignUpAdminDto } from './dto/sign.up.admin.dto'
  import { ApiTags } from '@nestjs/swagger'
  import { RolesG } from './roles.decorator'
  @ApiTags('auth')
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('sign-in')
    @HttpCode(200)
    @RolesG(Roles.all)
    async login(
      @Body() params: SignInDto,
    ): Promise<any> {
      return await this.authService.signIn(params)
    }
  
    @Post('sign-up')
    @HttpCode(201)
    async signUp(
      @Body() user: SignUpDto,
    ): Promise<boolean> {
      return await this.authService.signUp(user)
    }

    @Post('create-admin')
    @UseGuards(AuthGuard)
    @RolesG(Roles.superAdmin)
    @HttpCode(201)
    async signUpAdminBySuperAdmin(
      @Body() user: SignUpAdminDto,
      @Req() req: Request & { user: UserGuardDto},
    ): Promise<boolean> {
      return await this.authService
        .withUser(req.user)
        .signUpAdminBySuperAdmin(user)
    }


    
    @Post('create-delegado')
    @UseGuards(AuthGuard)
    @RolesG(Roles.superAdmin)
    @HttpCode(201)
    async signUpDelegadoByAdmin(
      @Body() user: SignUpAdminDto,
      @Req() req: Request & { user: UserGuardDto},
    ): Promise<boolean> {
      return await this.authService
        .withUser(req.user)
        .signUpDelegadoByAdmin(user)
    }

  }
  