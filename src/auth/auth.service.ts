import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/entity/user.entity'
import { UserGuardDto } from 'src/common/dto/request/current.user.dto'
import { EntityManager } from 'typeorm'
import { InjectEntityManager } from '@nestjs/typeorm'
import { SignInDto } from './dto/sign.in.dto'
import { SignUpDto } from './dto/sign.up.dto'
import { Roles } from 'src/common/types/roles'
import { SignUpAdminDto } from './dto/sign.up.admin.dto'

@Injectable()
export class AuthService {
  currentUser: UserGuardDto
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  withUser(user: UserGuardDto) {
    this.currentUser = user
    return this
  }

  private async validateUser(where: any, pass: string): Promise<any> {
    const user = await this.userService.checkIfUserExists(where)
    if (user && (await bcrypt.compare(pass, user.password))) {
      return user
    }
    return null
  }

  async signIn(userData: SignInDto) {
    try {
      const { usuario, password } = userData
      const user = await this.validateUser(usuario, password)
      if (!user) {
        throw new Error('User not found')
      }
      const { password: _, ...userWithoutPassword } = user
      const userText = JSON.stringify({
        userId: userWithoutPassword.id,
        email: userWithoutPassword.email,
        usuario: userWithoutPassword.usuario,
        role: userWithoutPassword.role,
      })
      return {
        jwt: this.jwtService.sign(
          { user: userText },
          { expiresIn: '1d', secret: process.env['JWT_SECRET'] },
        ),
        user: userWithoutPassword,
      }
    } catch (error) {
    throw new Error('Error sign in')
    }
  }

  async signUp(userData: SignUpDto): Promise<boolean> {
    try {
      const {
        usuario,
        nombre,
        apellido,
        legajo,
        email,
        password,
      } = userData
      const userExists = await this.userService.checkIfUserExists({
        email,
        usuario,
      })
      if (userExists) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        usuario,
        nombre,
        apellido,
        legajo,
        email,
        password : hashedPassword,
      })
      return true
    } catch (error) {
      console.log('Error sign up', error)
       {
        throw error
      }
    }
  }

  async signUpSuperAdmin(
    userData: { usuario: string; email: string; password: string },
  ): Promise<boolean> {
    try {
      const { usuario, email, password } = userData
      const user = await this.userService.checkIfUserExists({
        email,
        usuario,
      })
      if (user) {
        console.info('admin exist on db')
        return
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        usuario,
        email,
        password: hashedPassword,
        role: Roles.superAdmin,
      })
      await this.userService.createUser(newUser)
      return true
    } catch (error) {
      console.log('Error sign up super admin', error)
      throw new Error('Error sign up super admin')
    }
  }

  async signUpAdminBySuperAdmin(
    userData: SignUpAdminDto,
  ): Promise<boolean> {
    try {
      await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          const { usuario, email, password } = userData
          const userExists = await this.userService.checkIfUserExists({
            email,
            usuario,
          })
          if (userExists) {
            throw new Error('User already exists')
          }
          
          
          const hashedPassword = await bcrypt.hash(password, 10)
          const newUser = new User({
            usuario,
            email,
            password: hashedPassword,
            role: Roles.admin,
          })
          await this.userService.createUser(newUser)
        },
      )
      return true
    } catch (error) {
        console.log('Error sign up admin by super admin', error)
        throw new Error('Error sign up admin by super admin')
    }
  }
  
  async signUpDelegadoByAdmin(userData: SignUpDto): Promise<boolean> {
    try {
      const {
        usuario,
        nombre,
        apellido,
        legajo,
        email,
        password,
      } = userData
      const userExists = await this.userService.checkIfUserExists({
        email,
        usuario,
      })
      if (userExists) {
        throw new Error('User already exists')
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({
        usuario,
        nombre,
        apellido,
        legajo,
        email,
        password : hashedPassword,
      })
      return true
    } catch (error) {
      console.log('Error sign up', error)
       {
        throw error
      }
    }
  }
  
}