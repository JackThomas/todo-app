import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaneService {
  @Output() present = new EventEmitter<string>();

  constructor() {}

  presentPane() {
    this.present.emit();
  }
}
