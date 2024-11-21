import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, BadRequestException } from '@nestjs/common';
import { InformeSocialService } from './informe-social.service';
import { CreateInformeSocialDto } from './dto/create-informe-social.dto';
import { UpdateInformeSocialDto } from './dto/update-informe-social.dto';

@Controller('informe-social')
export class InformeSocialController {
  constructor(private readonly informeSocialService: InformeSocialService) {}

  @Post()
  create(@Body() createInformeSocialDto: CreateInformeSocialDto) {
    return this.informeSocialService.create(createInformeSocialDto);
  }

  @Get('all')
  @HttpCode(200)
  async getAllInformes(
    @Query('pageSize') pageSize: string, 
    @Query('page') page: string,
  ) {
    const pageSizeNumber = parseInt(pageSize, 10);
    const pageNumber = parseInt(page, 10);

    if (isNaN(pageSizeNumber) || isNaN(pageNumber)) {
      throw new BadRequestException('Page size and page must be numbers.');
    }

    return this.informeSocialService.getAllInformes(pageSizeNumber, pageNumber);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.informeSocialService.findOne(id);
  }

  @Get('fecha')
async getInformesByFecha(
  @Query('startDate') startDate: string,
  @Query('endDate') endDate: string,
  @Query('pageSize') pageSize: string,
  @Query('page') page: string
) {
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const pageSizeNumber = parseInt(pageSize, 10);
  const pageNumber = parseInt(page, 10);

  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    throw new BadRequestException('Invalid date format');
  }

  if (isNaN(pageSizeNumber) || isNaN(pageNumber)) {
    throw new BadRequestException('Page size and page must be numbers');
  }

  return this.informeSocialService.getInformesByFecha(startDateObj, endDateObj, pageSizeNumber, pageNumber);
}

@Get('palabras-clave')
async getInformesByPalabrasClave(
  @Query('palabra') palabra: string,
  @Query('pageSize') pageSize: string,
  @Query('page') page: string
) {
  console.log('Parámetros recibidos:', { palabra, pageSize, page });

  const pageSizeNumber = parseInt(pageSize, 10);
  const pageNumber = parseInt(page, 10);

  if (isNaN(pageSizeNumber) || isNaN(pageNumber)) {
    throw new BadRequestException('Page size and page must be numbers');
  }

  if (!palabra) {
    throw new BadRequestException('Palabra clave es requerida');
  }

  return this.informeSocialService.getInformesByPalabrasClave(palabra, pageSizeNumber, pageNumber);
}


  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateInformeSocialDto: UpdateInformeSocialDto) {
    return this.informeSocialService.update(id, updateInformeSocialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.informeSocialService.remove(id);
  }
}
