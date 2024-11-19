import { Body, Controller, Post, HttpException, HttpStatus, Get, Param, ParseIntPipe, NotFoundException, UseGuards, HttpCode, Query, Req } from '@nestjs/common';
import { CreateDelegacionDto } from './dto/delegaciones';  
import { DelegacionesService } from './delegaciones.service';
import { RolesG } from 'src/auth/roles.decorator';
import { User } from 'src/user/entity/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/common/types/roles';

@Controller('delegaciones')
export class DelegacionesController {
  constructor(private readonly delegacionesService: DelegacionesService) {} 


  @Get('all')
  @HttpCode(200)
  //@UseGuards(AuthGuard)
  //@RolesG(Roles.superAdmin, Roles.admin)
  async getAllDelegaciones(
    @Query('pageSize') pageSize: number,
    @Query('page') page: number,
    @Req() req: Request & { user: User },
  ) {
    return this.delegacionesService.getAllDelegaciones(pageSize, page)
  }

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




    

