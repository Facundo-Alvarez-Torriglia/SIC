import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InformeSocial } from './entities/informe-social.entity';
import { CreateInformeSocialDto } from './dto/create-informe-social.dto';
import { UpdateInformeSocialDto } from './dto/update-informe-social.dto';
import { log } from 'console';

@Injectable()
export class InformeSocialService {
  constructor(
    @InjectRepository(InformeSocial)
    private readonly informeSocialRepository: Repository<InformeSocial>,
  ) {}

  create(createInformeSocialDto: CreateInformeSocialDto) {
    const informe = this.informeSocialRepository.create(createInformeSocialDto);
    return this.informeSocialRepository.save(informe);
  }

  async getAllInformes(pageSize: number, page: number) {
    const [result, count] = await this.informeSocialRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      items: result,
      totalItems: count,
      currentPage: page,
      totalPages: Math.ceil(count / pageSize),
    };
  }

  async findOne(id: number) {
    const informe = await this.informeSocialRepository.findOne({ where: { id } });
    if (!informe) {
      throw new NotFoundException('Informe no encontrado');
    }
    return informe;
  }

  async getInformesByFecha(startDate: Date, endDate: Date, pageSize: number, page: number) {
    console.log('Query Parameters:');
    console.log('Start Date (Original):', startDate);
    console.log('End Date (Original):', endDate);
    console.log('Page Size:', pageSize);
    console.log('Page:', page);
  
    const queryBuilder = this.informeSocialRepository.createQueryBuilder('informe_social');
    
    // Ensure dates are in the correct format for your database
    queryBuilder.where('informe_social.fecha BETWEEN :startDate AND :endDate', { 
      startDate: startDate.toISOString().split('T')[0], 
      endDate: endDate.toISOString().split('T')[0] 
    });
  
    const [result, count] = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
  
    console.log('Raw Query:', queryBuilder.getQuery());
    console.log('Query Parameters:', queryBuilder.getParameters());
    console.log('Informes found:', result);
    console.log('Total count:', count);
  
    if (count === 0) {
      throw new NotFoundException('No informes found for the specified date range');
    }
  
    return { 
      items: result, 
      totalItems: count, 
      currentPage: page, 
      totalPages: Math.ceil(count / pageSize) 
    };
    console.log('Received parameters:', {
      startDate,
      endDate,
      pageSize,
      page
    });
  }

  async update(id: number, updateInformeSocialDto: UpdateInformeSocialDto) {
    const informe = await this.findOne(id);
    Object.assign(informe, updateInformeSocialDto);
    return this.informeSocialRepository.save(informe);
  }

  async remove(id: number) {
    const informe = await this.findOne(id);
    await this.informeSocialRepository.remove(informe);
    return { message: 'Informe eliminado exitosamente' };
  }

  async getInformesByPalabrasClave(
    palabra: string, 
    pageSize: number, 
    page: number
  ) { 
    // Validaciones adicionales
    if (!palabra) {
      throw new BadRequestException('Palabra clave es requerida');
    }
  
    const keyword = `%${palabra.toLowerCase()}%`; 
    
    console.log('Búsqueda de palabras clave:', {
      keyword,
      pageSize,
      page
    });
    
    const queryBuilder = this.informeSocialRepository.createQueryBuilder('informe_social'); 
    queryBuilder.where(
      '(LOWER(informe_social.descripcionInforme) LIKE :keyword OR ' +
      'LOWER(informe_social.conflicto) LIKE :keyword OR ' +
      'LOWER(informe_social.antecedentes) LIKE :keyword)', 
      { keyword }
    ); 
  
    try {
      const [result, count] = await queryBuilder
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .getManyAndCount(); 
  
      console.log('Resultados encontrados:', {
        resultCount: result.length,
        totalCount: count
      });
  
      return { 
        items: result,
        totalItems: count,
        currentPage: page,
        totalPages: Math.ceil(count / pageSize), 
      }; 
    } catch (error) {
      console.error('Error en búsqueda de palabras clave:', error);
      throw new InternalServerErrorException('Error al buscar informes');
    }
  }
}
  
  

