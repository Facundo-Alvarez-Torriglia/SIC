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
   private readonly userRepository:Repository<User>
   
 ) {}

    async findOneOptions(
        options: FindOneOptions <User>,
      ): Promise<User | undefined> {
        return this.userRepository.findOne(options)
      }


}

