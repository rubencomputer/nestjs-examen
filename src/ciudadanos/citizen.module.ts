import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitizenController } from './citizen.controller';
import { CitizenSchema } from './citizen.model';
import { CitizensService } from './citizen.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Citizen', schema: CitizenSchema }]),
  ],
  controllers: [CitizenController],
  providers: [CitizensService],
})
export class CitizensModule {}
