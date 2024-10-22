import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

import { BaseEntity } from 'src/common/entity/base.entity'
import { Roles } from 'src/common/types/roles'

@Entity()
export class User extends BaseEntity {
  
  @Column({ unique: true })
  username: string

  @Column({ nullable: true })
  fullname: string

  @Column({nullable: true})
  firstName: string

  @Column({nullable: true})
  lastName: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  phone: string

  @Column({ default: true })
  active: boolean

  @Column({})
  password: string

  @Column({ type: 'enum', enum: Roles })
  role: Roles

  @Column({ nullable: true })
  legajo: string

  constructor(user?: Partial<User>) {
    super()
    Object.assign(this, user)
  }
}