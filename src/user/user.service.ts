import { Injectable } from '@nestjs/common';
import { UserGuardDto } from 'src/common/dto/request/current.user.dto';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  currentUser: UserGuardDto

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) { }

  async createUser(user: User): Promise<User> {
    return this.userRepository.save(user)
  }
  async findOneOptions(
    options: FindOneOptions<User>,
  ): Promise<User | undefined> {
    return this.userRepository.findOne(options)
  }

  async checkIfUserExists(params: {
    email?: string
    usuario?: string
  }): Promise<User> {
    const { email, usuario } = params
    const conditions = [email && { email }, usuario && { usuario }]
    return this.userRepository.findOne({
      where: conditions,
      relations: ['company'],
    })
  }
}

