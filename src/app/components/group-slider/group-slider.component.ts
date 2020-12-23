import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list/list.service';
import { listItemFadeIn } from 'src/app/animations/list-item/fade-in/fade-in';
import { PaneService } from 'src/app/services/pane/pane.service';
import { PaneType } from 'src/app/enums/paneTypes.enum';
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
    freeModeMomentumRatio: 2,
  };

  constructor(private listService: ListService, private paneService: PaneService) {}

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
    this.paneService.presentPane(PaneType.ViewList);
  }

  /**
   * presentCreateList
   */
  public async presentCreateList() {
    this.paneService.presentPane(PaneType.CreateList);
  }
}
