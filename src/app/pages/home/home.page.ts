import { Component, ElementRef, ViewChild } from '@angular/core';
import { Plugins, StatusBarAnimation, StatusBarAnimationOptions } from '@capacitor/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/pages/modal/modal.page';

const { StatusBar } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('container', { read: ElementRef, static: false }) container: any;
  @ViewChild('main', { read: ElementRef, static: true }) main: any;

  public day: any;
  public dayLong: any;
  public month: any;
  public scrollPosition: any;

  constructor(private modalCtrl: ModalController, private routerOutlet: IonRouterOutlet) {
    const date = new Date();

    this.day = date.toLocaleString('default', { day: 'numeric' });
    this.dayLong = date.toLocaleString('default', { weekday: 'long' });
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
    this.handleStatusBar();
    this.handleBackground();
  }

  /**
   * handleStatusBar
   */
  public handleStatusBar() {
    const scrollTop = this.scrollPosition.top;
    const scrollDistance = this.container.nativeElement.clientHeight / 2 + 10; // get safe area top
    const hideStatusbar = scrollTop > scrollDistance;
    const statusBarOptions: StatusBarAnimationOptions = {
      animation: StatusBarAnimation.Fade,
    };

    if (hideStatusbar) {
      StatusBar.hide(statusBarOptions);
    } else {
      StatusBar.show(statusBarOptions);
    }
  }

  /**
   * handleBackground
   */
  public handleBackground() {
    const scrollTop = this.scrollPosition.top;
    // const scrollDistance = this.main.nativeElement.clientHeight - 70;
    const isAtEnd = scrollTop >= 0;
    const colour = isAtEnd ? '#ffffff' : '#000000';
    console.log('scrollTop', scrollTop);
    // console.log('scrollDistance', scrollDistance);
    // console.log(scrollTop >= scrollDistance);

    this.container.nativeElement.style.setProperty('--backdrop-background-pseudo', colour);
  }
}
