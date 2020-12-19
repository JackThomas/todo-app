import { Component, ElementRef, ViewChild } from '@angular/core';
import { Capacitor, Plugins, StatusBarAnimation, StatusBarAnimationOptions } from '@capacitor/core';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';

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

  constructor() {
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
   * scrollEvent
   */
  public scrollEvent($event): void {
    this.scrollPosition = {
      top: $event.detail.scrollTop,
      left: $event.detail.scrollLeft,
    };
    // this.handleStatusBar();
    // this.handleBackground();
  }

  // /**
  //  * handleStatusBar
  //  */
  // public handleStatusBar() {
  //   if (!Capacitor.isPluginAvailable('StatusBar')) {
  //     return false;
  //   }

  //   const scrollTop = this.scrollPosition.top;
  //   const scrollDistance = this.container.nativeElement.clientHeight / 2 + 10; // get safe area top
  //   const hideStatusbar = scrollTop > scrollDistance;
  //   const statusBarOptions: StatusBarAnimationOptions = {
  //     animation: StatusBarAnimation.Fade,
  //   };

  //   if (hideStatusbar) {
  //     StatusBar.hide(statusBarOptions);
  //   } else {
  //     StatusBar.show(statusBarOptions);
  //   }
  // }

  // /**
  //  * handleBackground
  //  */
  // public handleBackground() {
  //   const scrollTop = this.scrollPosition.top;
  //   const isAtEnd = scrollTop >= 0;
  //   const colour = isAtEnd ? '#ffffff' : '#000000';
  //   this.container.nativeElement.style.setProperty('--backdrop-background-pseudo', colour);
  // }
}
