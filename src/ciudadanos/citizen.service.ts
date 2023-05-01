import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';
import { Citizen } from './citizen.model';

@Injectable()
export class CitizensService {
  private citizens: Citizen[] = [];

  constructor(
    @InjectModel('Citizen') private readonly citizenModel: Model<Citizen>,
  ) {}

  //New Citizen (CREATE)
  async insertCitizen(citizenName: string, citizenCurp: string) {
    const citizen = await this.citizenModel
      .findOne({ curp: citizenCurp })
      .exec();

    if (citizen != undefined) return citizen.id as string;

    const newCitizen = new this.citizenModel({
      name: citizenName,
      curp: citizenCurp,
    });
    const result = await newCitizen.save();

    return result.id as string;
  }

  //All Citizens (READ)
  async getCitizens() {
    const citizens = await this.citizenModel.find().exec();

    return citizens.map((cit) => ({
      id: cit.id,
      name: cit.name,
      curp: cit.curp,
    }));
  }

  //Single Citizen (READ)
  async getCitizen(citizenId: string): Promise<Citizen> {
    const citizen = await this.findCitizen(citizenId);

    return citizen;
  }

  //Update Citizen (UPDATE)
  async updateCitizen(
    citizenId: string,
    citizenName: string,
    citizenCurp: string,
  ) {
    const updatedCitizen = await this.findCitizen(citizenId);

    if (citizenName) {
      updatedCitizen.name = citizenName;
    }

    if (citizenCurp) {
      updatedCitizen.curp = citizenCurp;
    }

    updatedCitizen.save();
  }

  //Delete Citizen(DELETE)
  async deleteCitizen(citizenId: string) {
    const citizen = await this.citizenModel
      .deleteOne({ _id: citizenId })
      .exec();
  }

  //
  ///
  ////Funciones privadas
  ///
  //

  //Single Citizen private function
  private async findCitizen(citizenId: string): Promise<Citizen> {
    let citizenByCurp;
    try {
      citizenByCurp = await this.citizenModel.find({ curp: citizenId });
    } catch (err) {
      throw new NotFoundException('El curp no existe.');
    }

    return citizenByCurp;
  }
}
