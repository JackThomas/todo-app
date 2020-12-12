import { Item } from './item';

export interface List {
  colour: string;
  items: Item[];
  private?: boolean;
  title: string;
}
