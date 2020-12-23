import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { List } from 'src/app/interfaces/list';
import { Item } from 'src/app/interfaces/item';
import { v4 as uuid } from 'uuid';
import { Status } from 'src/app/enums/status.enum';

const listStorageKey = 'lists';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  subject: BehaviorSubject<any> = new BehaviorSubject(false);
  selected: BehaviorSubject<any> = new BehaviorSubject(false);

  lists: List[];

  data: List = {
    active: false,
    colour: {
      name: '',
      hex: '',
    },
    created: new Date(),
    id: '',
    items: [],
    title: '',
  };

  item: Item;

  constructor(private dataService: DataService) {}

  /**
   * clear
   */
  clear() {
    this.data = {
      active: false,
      colour: {
        name: '',
        hex: '',
      },
      created: new Date(),
      id: '',
      items: [],
      title: '',
    };

    return this;
  }

  /**
   * create
   */
  async create() {
    return await this.dataService.get(listStorageKey).then((response) => {
      this.lists = response.data !== undefined ? response.data : [];
      this.lists.push(this.data);
      this.subject.next(this.lists);

      return this.dataService
        .save(listStorageKey, this.lists)
        .then(() => {
          console.log('Data saved');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  /**
   * update
   */
  async update(list: List, data: any) {
    return await this.dataService.get(listStorageKey).then((response) => {
      const lists = response.data !== undefined ? response.data : [];
      const updated = lists.map((listItem) => {
        if (listItem.id !== list.id) {
          return listItem;
        } else {
          return { ...listItem, ...data };
        }
      });

      this.subject.next(updated);
      this.updateSelected(list);

      return this.dataService
        .save(listStorageKey, updated)
        .then(() => {
          console.log('Data updated');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  /**
   * get
   */
  get() {
    this.dataService.get(listStorageKey).then((response) => {
      this.lists = response.data !== undefined ? response.data : [];
      this.subject.next(this.lists);
    });

    return this;
  }

  /**
   * select
   */
  async select(list: List) {
    return await this.dataService.get(listStorageKey).then((response) => {
      const lists = response.data !== undefined ? response.data : [];
      const selected = lists.find((listItem) => listItem.id === list.id);

      this.selected.next(selected);
    });
  }

  /**
   * updateSelected
   */
  async updateSelected(list: List) {
    if (list.id === this.selected.value.id) {
      const selected = this.subject.value.find((listItem) => listItem.id === list.id);
      this.selected.next(selected);
    }
  }

  /**
   * addItem
   */
  async addItem(list: List) {
    this.update(list, { items: [...list.items, this.item] });
  }

  /**
   * transformData
   */
  transformData(data) {
    console.log(data);

    this.data = {
      active: false,
      colour: data.colour,
      created: new Date(),
      id: uuid(),
      items: [],
      title: data.name,
    };

    return this;
  }

  /**
   * transformItem
   */
  transformItem(data) {
    console.log(data);

    this.item = {
      due: data.due,
      items: data.items,
      note: data.note,
      priority: data.priority,
      status: Status.Pending,
      title: data.name,
    };

    return this;
  }
}
