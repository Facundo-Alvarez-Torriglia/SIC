import {
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm'
  
  export abstract class BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string
  
    @CreateDateColumn()
    createdAt: Date
  
    @UpdateDateColumn()
    updatedAt: Date
  }