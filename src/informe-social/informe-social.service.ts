import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { InformeSocial } from './entities/informe-social.entity';
import { CreateInformeSocialDto } from './dto/create-informe-social.dto';
import { UpdateInformeSocialDto } from './dto/update-informe-social.dto';

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

  async findAll() {
    return this.informeSocialRepository.find();
  }

  async findOne(id: number) {
    const informe = await this.informeSocialRepository.findOne({ where: { id } });
    if (!informe) {
      throw new NotFoundException('Informe no encontrado');
    }
    return informe;
  }

  async update(id: number, updateInformeSocialDto: UpdateInformeSocialDto) { 
    const informe = await this.findOne(id); // Asegurarse de que el informe existe 
    Object.assign(informe, updateInformeSocialDto); 
    return this.informeSocialRepository.save(informe); }

  async remove(id: number) {
    const informe = await this.informeSocialRepository.findOne({ where: { id } });
    if (!informe) {
      throw new NotFoundException('Informe no encontrado');
    }
    await this.informeSocialRepository.remove(informe);
    return { message: 'Informe eliminado exitosamente' };
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

  async getInformesByFecha(fecha: string) {
    const date = new Date(fecha);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);

    console.log('Fecha buscada:', date);
    console.log('Fecha siguiente:', nextDay);

    const informes = await this.informeSocialRepository.find({
      where: {
        fecha: Between(date, nextDay),
      },
    });
    console.log('Informes encontrados:', informes);
    return informes;
  }

  async getInformesByTitulo(titulo: string) {
    const keyword = `%${titulo.toLowerCase()}%`;
    const informes = await this.informeSocialRepository.createQueryBuilder('informe_social')
      .where('LOWER(informe_social.titulo) LIKE :titulo', { titulo: keyword })
      .getMany();
    console.log('Informes encontrados:', informes);
    return informes;
  }

  async getInformesByPalabrasClave(keywords: string) {
    return this.informeSocialRepository
      .createQueryBuilder('informe_social')
      .where('informe_social.descripcionInforme LIKE :keywords OR informe_social.titulo LIKE :keywords', { keywords: `%${keywords}%` })
      .getMany();
  }
}
