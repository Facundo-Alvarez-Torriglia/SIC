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

  @Get('fecha')
  async getInformesByFecha(@Query('fecha') fecha: string) {
    return this.informeSocialService.getInformesByFecha(fecha);
  }

  @Get('titulo')
  async getInformesByTitulo(@Query('titulo') titulo: string) {
    return this.informeSocialService.getInformesByTitulo(titulo);
  }

  @Get('buscar')
  async getInformesByPalabrasClave(@Query('q') keywords: string) {
    return this.informeSocialService.getInformesByPalabrasClave(keywords);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.informeSocialService.findOne(id);
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
