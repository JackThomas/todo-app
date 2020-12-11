import { Status } from '../enums/status.enum';
import { Note } from './note';

export interface Item {
  due?: Date;
  items?: Item[];
  note?: Note;
  priority: number;
  status: Status;
  title: string;
}
