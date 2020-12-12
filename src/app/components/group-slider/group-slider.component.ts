import { ListService } from 'src/app/services/list/list.service';
import { Component, OnInit, Self } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { iosLeaveAnimation } from 'src/app/animations/fade-out/fade-out';
import { ListPage } from 'src/app/pages/create/list/list.page';
import { List } from 'src/app/interfaces/list';

@Component({
  selector: 'app-group-slider',
  templateUrl: './group-slider.component.html',
  styleUrls: ['./group-slider.component.scss'],
})
export class GroupSliderComponent implements OnInit {
  lists: List[];

  public sliderOptions = {
    slidesPerView: 'auto',
    centeredSlides: false,
    pagination: false,
  };

  constructor(private listService: ListService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    this.listService.get().subject.subscribe((data) => {
      this.lists = data;
    });
  }

  /**
   * presentModal
   */
  public async presentCreateList() {
    const modal = await this.modalCtrl.create({
      component: ListPage,
      cssClass: 'modal modal--half',
      swipeToClose: true,
      leaveAnimation: iosLeaveAnimation,
    });
    await modal.present();
  }
}
