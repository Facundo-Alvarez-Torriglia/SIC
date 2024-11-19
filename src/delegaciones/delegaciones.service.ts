import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Delegaciones } from './entity/delegaciones.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDelegacionDto } from './dto/delegaciones'; 

@Injectable()
export class DelegacionesService {  
  constructor(
    @InjectRepository(Delegaciones)
    private readonly delegacionesRepository: Repository<Delegaciones>,  // Usa el repositorio correcto
  ) {}

  //Encontrar Delegacion
  async encontrarDelegacion(id: number): Promise<Delegaciones> { 
    const delegacion = await this.delegacionesRepository.findOne({ where: { id } }); 
    if (!delegacion) { 
      throw new NotFoundException('Delegación no encontrada'); 
    } return delegacion; } 

    //Crear Delegacion 
  async createDelegacion(delegacionDto: CreateDelegacionDto): Promise<Delegaciones> {
    // Verifica si la delegación ya existe
    const existeDelegacion = await this.delegacionesRepository.findOne({
      where: { nombre: delegacionDto.nombre },
    });

    if (existeDelegacion) {
      throw new ConflictException('La delegación ya existe');
    }

    const delegacion = this.delegacionesRepository.create(delegacionDto);  // Crea la entidad usando el DTO
    return await this.delegacionesRepository.save(delegacion);  // Guarda la entidad en la base de datos
  }

  //obteener todas las delegaciones
  async getAllDelegaciones(
    pageSize: number = 10,
    page: number = 1,
  ): Promise<any> {
    try {
      const queryBuilder = this.delegacionesRepository.createQueryBuilder('delegacion');
      const [result, count] = await queryBuilder
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
}


