import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const TodoSchema = new mongoose.Schema({
  id: String,
  completed: Boolean,
  todo: String,
});

export interface TodoDocument extends Document {
  id: number;
  completed: boolean;
  todo: string;
}
