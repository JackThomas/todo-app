import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ColourService } from 'src/app/services/colour/colour.service';
import { Colour } from 'src/app/interfaces/colour';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-colour-picker',
  templateUrl: './colour-picker.component.html',
  styleUrls: ['./colour-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColourPickerComponent),
      multi: true,
    },
  ],
})
export class ColourPickerComponent implements OnInit {
  @Input() formControlName: string;

  colours: Colour[];
  selected: Colour | null;

  value: any;

  constructor(private colourService: ColourService) {}

  ngOnInit() {
    this.getColours();
  }

  /**
   * getColours
   */
  getColours() {
    this.colourService.get().subject.subscribe((data) => {
      if (data) {
        this.colours = data;
      }
    });
  }

  /**
   * select
   */
  select(colour: Colour) {
    this.selected = colour;
    this.propagateChange(colour);
  }

  /**
   * reset
   */
  reset() {
    this.selected = null;
  }

  /**
   * writeValue
   * Write values for reactive forms
   */
  writeValue(value: any) {
    if (value === null) {
      this.reset();
    }
    if (value !== undefined) {
      this.value = value;
    }
  }

  /**
   * propagateChange
   */
  propagateChange = (_: any) => {};

  /**
   * registerOnChange
   * Register on change for reactive forms
   */
  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  /**
   * registerOnTouched
   * Register element touched for forms
   */
  registerOnTouched() {}
}
