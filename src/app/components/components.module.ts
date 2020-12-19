import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { GroupSliderComponent } from 'src/app/components/group-slider/group-slider.component';
import { ListComponent } from 'src/app/components/list/list.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [GroupSliderComponent, ListComponent],
  exports: [GroupSliderComponent, ListComponent],
})
export class ComponentsModule {}
