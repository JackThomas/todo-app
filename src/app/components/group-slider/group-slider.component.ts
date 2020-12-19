import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { iosLeaveAnimation } from 'src/app/animations/modal/fade-out/fade-out';
import { ListPage } from 'src/app/pages/create/list/list.page';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list/list.service';
import { listItemFadeIn } from 'src/app/animations/list-item/fade-in/fade-in';
import { PaneService } from 'src/app/services/pane/pane.service';
@Component({
  selector: 'app-group-slider',
  templateUrl: './group-slider.component.html',
  styleUrls: ['./group-slider.component.scss'],
  animations: [listItemFadeIn],
})
export class GroupSliderComponent implements OnInit, AfterViewInit {
  enableAnimation: boolean = true;
  lists: List[];

  public sliderOptions = {
    slidesPerView: 'auto',
    centeredSlides: false,
    pagination: false,
    freeMode: true,
    freeModeSticky: true,
  };

  constructor(
    private listService: ListService,
    private paneService: PaneService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.enableAnimation = true;
    this.getLists();
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
  listItemFadeInEnd($event, list: List) {
    if (list.active === false) {
      this.listService.update(list, { active: true });
    }
  }

  /**
   * selectList
   */
  selectList(list: List) {
    this.listService.select(list);
    this.paneService.presentPane();
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
