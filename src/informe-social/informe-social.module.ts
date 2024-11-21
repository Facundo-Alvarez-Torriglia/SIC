import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformeSocial } from './entities/informe-social.entity';
import { InformeSocialService } from './informe-social.service';
import { InformeSocialController } from './informe-social.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([InformeSocial]),
  ],
  providers: [InformeSocialService],
  controllers: [InformeSocialController],
})
export class InformeSocialModule {}
