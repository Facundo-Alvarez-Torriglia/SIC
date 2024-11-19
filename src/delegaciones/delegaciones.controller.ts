import { Body, Controller, Post, HttpException, HttpStatus, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { CreateDelegacionDto } from './dto/delegaciones';  
import { DelegacionesService } from './delegaciones.service';

@Controller('delegaciones')
export class DelegacionesController {
  constructor(private readonly delegacionesService: DelegacionesService) {} 

  @Get('/:id') async getDelegacionById(@Param('id', ParseIntPipe) id: number) { // Usa ParseIntPipe para asegurar que el ID sea un número 
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
}




    

