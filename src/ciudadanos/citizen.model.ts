import * as mongoose from 'mongoose';

export const CitizenSchema = new mongoose.Schema({
  name: { type: String, required: true },
  curp: { type: String, required: true },
});

export interface Citizen extends mongoose.Document {
  id: string;
  name: string;
  curp: string;
}
