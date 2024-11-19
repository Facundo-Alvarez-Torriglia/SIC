import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelegacionesController } from './delegaciones.controller';
import { DelegacionesService } from './delegaciones.service';
import { Delegaciones } from './entity/delegaciones';

@Module({
  imports: [TypeOrmModule.forFeature([Delegaciones])],  // Importa el repositorio de Delegaciones
  controllers: [DelegacionesController],
  providers: [DelegacionesService],
  exports: [DelegacionesService],  // Exporta el servicio si es necesario
})
export class DelegacionesModule {}

