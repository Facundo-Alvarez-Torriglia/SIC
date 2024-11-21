import { Body, Controller, Post, HttpException, HttpStatus, Get, Param, ParseIntPipe, NotFoundException, HttpCode, Query, Req, Patch } from '@nestjs/common';
import { CreateDelegacionDto } from './dto/delegaciones';
import { DelegacionesService } from './delegaciones.service';
import { User } from 'src/user/entity/user.entity';
import { Request } from 'express';
import { UpdateDelegacionDto } from './dto/update-delegacion';

@Controller('delegaciones')
export class DelegacionesController {
  constructor(private readonly delegacionesService: DelegacionesService) { }

  @Get('all')
  @HttpCode(200)
  async getAllDelegaciones(
    @Query('pageSize') pageSize: number,
    @Query('page') page: number,
    @Req() req: Request & { user: User },
  ) {
    return this.delegacionesService.getAllDelegaciones(pageSize, page);
  }

  @Get('/:id')
  async getDelegacionById(@Param('id', ParseIntPipe) id: number) {
    const delegacion = await this.delegacionesService.encontrarDelegacion(id);
    if (!delegacion) {
      throw new NotFoundException('Delegación no encontrada');
    }
    return delegacion;
  }

  @Post()
  async createDelegacion(@Body() delegacion: CreateDelegacionDto) {
    try {
      return await this.delegacionesService.createDelegacion(delegacion);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // Borrar temporalmente una Delegacion 
  @Patch('/:action/:id')
  async updateDelegacionStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('action') action: string,
  ) {
    if (action === 'borrar') { // http://localhost:8080/delegaciones/borrar/1
      await this.delegacionesService.softDeleteDelegacion(id);
      return { message: 'Delegación borrada correctamente' };
    } else if (action === 'restaurar') { // http://localhost:8080/delegaciones/restaurar/1
      const resultado = await this.delegacionesService.restaurarDelegacion(id);
      if (!resultado) {
        throw new HttpException('No se pudo restaurar la delegación', HttpStatus.INTERNAL_SERVER_ERROR);
      }
      return { message: 'Delegación restaurada correctamente' };
    } else {
      throw new HttpException('Acción no válida', HttpStatus.BAD_REQUEST);
    }
  }

  //Modificar una Delegacion
  @Patch('/:id')
  async updateDelegacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDelegacionDto: UpdateDelegacionDto,) {
    const updatedDelegacion = await this.delegacionesService.updateDelegacion(id, updateDelegacionDto);
    if (!updatedDelegacion) { throw new NotFoundException('Delegación no encontrada'); }
    return updatedDelegacion;
  }
}










