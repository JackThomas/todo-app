import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/pages/modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('container', { read: ElementRef, static: false }) container: any;

  public day: any;
  public month: any;
  public scrollPosition: any;

  constructor(private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) {
    const date = new Date();
    this.day = date.toLocaleString('default', { day: 'numeric' });
    this.month = date.toLocaleString('default', { month: 'long' });
  }

  /**
   * presentModal
   */
  public getDateOrdinal(date) {
    if (date > 20 || date < 10) {
      switch (date % 10) {
        case 1:
          return 'st';
        case 2:
          return 'nd';
        case 3:
          return 'rd';
      }
    }
    return 'th';
  }

  /**
   * presentModal
   */
  public async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      swipeToClose: true,

      presentingElement: this.routerOutlet.nativeEl,
    });

    await modal.present();
  }

  /**
   * scrollEvent
   */
  public scrollEvent($event): void {
    this.scrollPosition = {
      top: $event.detail.scrollTop,
      left: $event.detail.scrollLeft,
    };
    this.handleBackground();
  }

  /**
   * handleBackground
   */
  public handleBackground() {
    const scrollTop = this.scrollPosition.top;
    const scrollDistance = this.container.nativeElement.clientHeight / 2 - 70;
    const isAtEnd = scrollTop >= scrollDistance;

    if (isAtEnd) {
      this.container.nativeElement.style.setProperty('--backdrop-background-pseudo', '#ffffff');
    } else {
      this.container.nativeElement.style.removeProperty('--backdrop-background-pseudo');
    }
  }
}
