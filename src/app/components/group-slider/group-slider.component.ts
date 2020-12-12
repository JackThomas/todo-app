import { Component, OnInit } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { iosLeaveAnimation } from 'src/app/animations/fade-out/fade-out';
import { ListPage } from 'src/app/pages/create/list/list.page';

@Component({
  selector: 'app-group-slider',
  templateUrl: './group-slider.component.html',
  styleUrls: ['./group-slider.component.scss'],
})
export class GroupSliderComponent implements OnInit {
  public sliderOptions = {
    slidesPerView: 'auto',
    centeredSlides: false,
    pagination: false,
  };

  constructor(private modalCtrl: ModalController, private animationCtrl: AnimationController) {}

  ngOnInit() {}

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
