import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { iosLeaveAnimation } from 'src/app/animations/fade-out/fade-out';
import { ListPage } from 'src/app/pages/create/list/list.page';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list/list.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'app-group-slider',
  templateUrl: './group-slider.component.html',
  styleUrls: ['./group-slider.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0', width: '0' }),
        animate('.5s ease-out', style({ opacity: '1', width: '130px' })),
      ]),
    ]),
  ],
})
export class GroupSliderComponent implements OnInit, AfterViewInit {
  lists: List[];

  enableAnimation: boolean = true;

  public sliderOptions = {
    slidesPerView: 'auto',
    centeredSlides: false,
    pagination: false,
  };

  constructor(private listService: ListService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.getLists();
  }

  ngAfterViewInit() {
    this.enableAnimation = true;
  }

  /**
   * getLists
   */
  getLists() {
    this.listService.get().subject.subscribe((data) => {
      if (data) {
        this.lists = data.sort((a, b) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
      }
    });
  }

  /**
   * onAnimationEvent
   */
  onAnimationEvent($event) {
    console.log($event);
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
