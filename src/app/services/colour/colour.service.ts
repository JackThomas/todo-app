import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
import { Colour } from 'src/app/interfaces/colour';

const colourStorageKey = 'colours';

@Injectable({
  providedIn: 'root',
})
export class ColourService {
  subject: BehaviorSubject<any> = new BehaviorSubject(false);

  default: Colour[] = [
    {
      name: '',
      hex: '#f44336',
    },
    {
      name: '',
      hex: '#e91e63',
    },
    {
      name: '',
      hex: '#9c27b0',
    },
    {
      name: '',
      hex: '#673ab7',
    },
    {
      name: '',
      hex: '#3f51b5',
    },
    {
      name: '',
      hex: '#2196f3',
    },
    {
      name: '',
      hex: '#03a9f4',
    },
    {
      name: '',
      hex: '#00bcd4',
    },
    {
      name: '',
      hex: '#009688',
    },
    {
      name: '',
      hex: '#4caf50',
    },
    {
      name: '',
      hex: '#8bc34a',
    },
    {
      name: '',
      hex: '#cddc39',
    },
    {
      name: '',
      hex: '#ffeb3b',
    },
    {
      name: '',
      hex: '#ffc107',
    },
    {
      name: '',
      hex: '#ff9800',
    },
    {
      name: '',
      hex: '#ff5722',
    },
    {
      name: '',
      hex: '#795548',
    },
    {
      name: '',
      hex: '#607d8b',
    },
  ];

  colours: Colour[];

  constructor(private dataService: DataService) {}

  /**
   * get
   */
  get() {
    this.dataService.get(colourStorageKey).then((response) => {
      this.colours = response.data !== undefined ? response.data : [];
      this.subject.next([...this.default, ...this.colours]);
    });

    return this;
  }
}
