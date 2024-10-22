import { User } from 'src/user/entity/user.entity'

export class UserGuardDto {
  userId: string
  email: string
  username: string
  role: string
  data: User
}