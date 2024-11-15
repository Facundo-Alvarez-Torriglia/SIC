import {  Controller, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from './entity/user.entity'
import {
  Repository,
} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserGuardDto } from 'src/common/dto/request/current.user.dto'
import { UpdatePassword } from './dto/updatePassword.dto'


@Controller('user')
export class UserController {
  currentUser: UserGuardDto
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  withUser(user: UserGuardDto) {
    this.currentUser = user
    return this
  }

  async checkIfUserExists(params: {
    email?: string
    username?: string
  }): Promise<User> {
    const { email, username } = params
    const conditions = [email && { email }, username && { username }]
    return this.userRepository.findOne({
      where: conditions,
      relations: ['company'],
    })
  }

  async updatePassword(params: UpdatePassword) {
    try {
      const { password, newPassword, confirmPassword } = params
      if (newPassword !== confirmPassword) {
        throw new Error('Passwords do not match')
      }
      const user = await this.getUserById(this.currentUser.userId)
      if (!user) {
        throw new Error('User not found')
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        throw new Error('Invalid password')
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10)
      user.password = hashedNewPassword
      await this.userRepository.save(user)
      return true
    } catch (error) {
     console.log(error)
    }
  }


  async getUserMe() {
    try {
      const user = await this.userRepository.findOne({
        where: {
          usuario: this.currentUser.usuario,
        }
      })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (error) {
        console.log(error)
    }
  }

  async getUserById(id: string) {
    try {
      if (!id) {
        throw new Error('Id is required')
      }
      const userFound = await this.userRepository.findOne({
        where: {
          id,
        },
      })
      if (!userFound) {
        throw new Error('User not found')
      }
      return userFound
    } catch (error) {
        console.log(error)
    }
  }


  async getUserByEmail(email: string) {
    try {
      if (!email) {
        throw new Error('Email is required')
      }
      const userFound = await this.userRepository.findOne({
        where: {
          email,
        },
      })
      if (!userFound) {
        throw new Error('User not found')
      }
      return userFound
    } catch (error) {
        console.log(error)
    }
  }}