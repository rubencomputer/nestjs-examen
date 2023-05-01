import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { CitizensService } from './citizen.service';

@Controller('/citizen')
export class CitizenController {
  constructor(private readonly citizenService: CitizensService) {}

  //New Citizen (CREATE)
  @Post()
  async addCitizen(
    @Body('name') citizenName: string,
    @Body('curp') citizenCurp: string,
  ) {
    const createdCitizen = await this.citizenService.insertCitizen(
      citizenName,
      citizenCurp,
    );

    return { id: createdCitizen };
  }

  //All Citizens (READ)
  @Get()
  async getAllCitizens() {
    const citizens = this.citizenService.getCitizens();
    return citizens;
  }

  //Single Citizen (READ)
  @Get(':id')
  async getCitizen(@Param('id') citizenId: string) {
    const citizen = this.citizenService.getCitizen(citizenId);
    return citizen;
  }

  //Update Citizen (UPDATE)
  @Patch(':id')
  async updateCitizen(
    @Param('id') citizenId: string,
    @Body('name') citizenName: string,
    @Body('curp') citizenCurp: string,
  ) {
    await this.citizenService.updateCitizen(
      citizenId,
      citizenName,
      citizenCurp,
    );
    return { status: 'El usuario ha sido actualizado!' };
  }

  //Delete Citizen(DELETE)
  @Delete(':id')
  async deleteCitizen(@Param('id') citizenId: string) {
    await this.citizenService.deleteCitizen(citizenId);
    return 'El usuario ha sido eliminado';
  }
}
