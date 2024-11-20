import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Delegaciones } from './entity/delegaciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateDelegacionDto } from './dto/delegaciones'; 

@Injectable()
export class DelegacionesService {  
  constructor(
    @InjectRepository(Delegaciones)
    private readonly delegacionesRepository: Repository<Delegaciones>,
  ) {}

  async encontrarDelegacion(id: number): Promise<Delegaciones> { 
    const delegacion = await this.delegacionesRepository.findOne({ where: { id, status: false } });
    if (!delegacion) { 
      throw new NotFoundException('Delegación no encontrada'); 
    } 
    return delegacion; 
  }

  async createDelegacion(delegacionDto: CreateDelegacionDto): Promise<Delegaciones> {
    const existeDelegacion = await this.delegacionesRepository.findOne({
      where: [{ nombre: delegacionDto.nombre }, { email: delegacionDto.email }],
    });

    if (existeDelegacion) {
      throw new ConflictException('La delegación ya existe');
    }

    const delegacion = this.delegacionesRepository.create(delegacionDto);
    return await this.delegacionesRepository.save(delegacion);
  }

  async getAllDelegaciones(
    pageSize: number = 10,
    page: number = 1,
  ): Promise<any> {
    try {
      const queryBuilder = this.delegacionesRepository.createQueryBuilder('delegacion');
      const [result, count] = await queryBuilder
        .where('delegacion.status = :status', { status: false })
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount();
  
      const pageCount = Math.ceil(count / pageSize);
      const delegaciones: any = {
        items: result,
        pageCount,
        page,
        pageSize,
        total: count,
      };
      return delegaciones;
    } catch (error) {
      throw new Error(error);
    }
  }

  async softDeleteDelegacion(id: number): Promise<void> { 
    const delegacion = await this.delegacionesRepository.findOne({ where: { id, status: false } });
    if (!delegacion) {
      throw new NotFoundException('Delegación no encontrada');
    } 
    delegacion.status = true;
    await this.delegacionesRepository.save(delegacion); 
  }
    
  async restaurarDelegacion(id: number): Promise<boolean> {
    const delegacionExist = await this.delegacionesRepository.findOne({ where: { id } });

    if (!delegacionExist) {
      throw new ConflictException('La Delegación con el id ' + id + ' no existe');
    }

    if (!delegacionExist.status) {
      throw new ConflictException('La delegación no está borrada');
    }

    const rows: UpdateResult = await this.delegacionesRepository.update(
      { id },
      { status: false },
    );

    return rows.affected === 1;
  }
}





