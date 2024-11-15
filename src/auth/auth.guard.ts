import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
  } from '@nestjs/common'
  import { Reflector } from '@nestjs/core'
  import { JwtService } from '@nestjs/jwt'
  import { Request } from 'express'
  import { UserGuardDto } from 'src/common/dto/request/current.user.dto'
  import { Roles } from 'src/common/types/roles'
  import { UserService } from 'src/user/user.service'
  import { ROLES_KEY } from './roles.decorator'
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private readonly userService: UserService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ])
      if (!requiredRoles || requiredRoles.length === 0) {
        throw new InternalServerErrorException()
      }
  
      const request = context.switchToHttp().getRequest()
      const token = this.extractTokenFromHeader(request)
      if (!token) {
        throw new UnauthorizedException()
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET,
        })
  
        if (typeof payload.user === 'string') {
          payload.user = JSON.parse(payload.user)
        }
  
        const userData = payload?.user as UserGuardDto
        const userFound = await this.userService.findOneOptions({
          where: {
            id: userData.userId,
          },
        })
  
        if (!userFound) {
          throw new Error()
        }
  
        userData.data = userFound
        request['user'] = userData
        if (!requiredRoles?.includes(Roles.all)) {
          if (requiredRoles && requiredRoles.length > 0) {
            if (!requiredRoles.includes(userData.role as Roles)) {
              throw new ForbiddenException()
            }
          }
        }
      } catch (error) {
        console.error('error auth', error)
        throw new UnauthorizedException()
      }
  
      return true
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? []
      return type === 'Bearer' ? token : undefined
    }
  }