import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('informe_social')
export class InformeSocial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date'})
  fecha: Date;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'text' })
  descripcionInforme: string;
 
  @Column({ type: 'text' })
  conflicto: string;

  @Column({ type: 'text' })
  antecedentes: string;

  @Column({ type: 'varchar', length: 50 })
  conflictividad: string;

  @Column({ type: 'varchar', length: 100 })
  geo: string;

  @Column({ type: 'text' })
  fuente: string;
}

