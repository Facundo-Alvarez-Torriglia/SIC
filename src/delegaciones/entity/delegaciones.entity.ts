import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Delegaciones extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: false })
  direccion: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  status?: boolean;
}

