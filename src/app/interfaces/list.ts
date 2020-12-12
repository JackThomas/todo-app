import { Colour } from './colour';
import { Item } from './item';

export interface List {
  colour: Colour;
  created: Date;
  id: string;
  items: Item[];
  private?: boolean;
  title: string;
}
