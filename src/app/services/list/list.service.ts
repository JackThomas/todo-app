import { DataService } from 'src/app/services/data/data.service';
import { Injectable } from '@angular/core';
import { List } from 'src/app/interfaces/list';
import { v4 as uuid } from 'uuid';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const listStorageKey = 'lists';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  subject: BehaviorSubject<any> = new BehaviorSubject(false);

  lists: List[];

  data: List = {
    colour: {
      name: '',
      hex: '',
    },
    created: new Date(),
    id: '',
    items: [],
    title: '',
  };

  constructor(private dataService: DataService) {}

  clear() {
    this.data = {
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

  async create() {
    return await this.dataService.get(listStorageKey).then((response) => {
      this.lists = response.data !== undefined ? response.data : [];
      this.lists.push(this.data);
      this.subject.next(this.lists);

      return this.dataService
        .save(listStorageKey, this.lists)
        .then(() => {
          console.log('data saved');
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  get() {
    this.dataService.get(listStorageKey).then((response) => {
      this.lists = response.data !== undefined ? response.data : [];
      this.subject.next(this.lists);
    });

    return this;
  }

  transformData(data) {
    console.log(data);

    this.data = {
      colour: {
        name: 'Blue Green',
        hex: '#168db9',
      },
      created: new Date(),
      id: uuid(),
      items: [],
      title: data.name,
    };

    return this;
  }
}
