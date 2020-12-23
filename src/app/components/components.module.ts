import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GroupSliderComponent } from 'src/app/components/group-slider/group-slider.component';
import { ListComponent } from 'src/app/components/list/list.component';
import { CreateItemComponent } from 'src/app/components/create-item/create-item.component';
import { CreateListComponent } from 'src/app/components/create-list/create-list.component';
import { ColourPickerComponent } from 'src/app/components/colour-picker/colour-picker.component';

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  declarations: [
    GroupSliderComponent,
    ListComponent,
    CreateItemComponent,
    CreateListComponent,
    ColourPickerComponent,
  ],
  exports: [
    GroupSliderComponent,
    ListComponent,
    CreateItemComponent,
    CreateListComponent,
    ColourPickerComponent,
  ],
})
export class ComponentsModule {}
