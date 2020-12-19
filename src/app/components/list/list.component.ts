import { Status } from './../../enums/status.enum';
import { Component, OnInit } from '@angular/core';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list/list.service';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { PaneService } from 'src/app/services/pane/pane.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list: List;
  public cupertinoPane: CupertinoPane;

  constructor(private listService: ListService, private paneService: PaneService) {}

  ngOnInit() {
    this.getSelected();
    this.initPane();
  }

  /**
   * getSelected
   */
  getSelected() {
    this.listService.selected.subscribe((list: List) => {
      console.log('list sub', list);

      if (list) {
        this.list = list;
      }
    });
  }

  /**
   * addItem
   */
  addItem() {
    this.listService.update(this.list, {
      items: [...this.list.items, { priority: 1, title: 'test', status: Status.Pending }],
    });
  }

  /**
   * initPane
   */
  public initPane() {
    const settings: CupertinoSettings = {
      parentElement: 'ion-app', // Parent container
      breaks: {
        top: {
          // Topper point that pane can reach
          enabled: true, // Enable or disable breakpoint
          height: window.screen.height - 135 * 0.35, // Pane breakpoint height
          bounce: true, // Bounce pane on transition
        },
        middle: { enabled: true, height: window.screen.height * 0.5, bounce: true },
        bottom: { enabled: true, height: 80 },
      },
      onDragStart: () => console.log('Drag start'),
      onDrag: () => console.log('Drag event'),
      onDragEnd: () => console.log('Drag end'),
    };
    this.cupertinoPane = new CupertinoPane('.cupertino-pane', settings);

    this.paneService.present.subscribe(() => {
      console.log('present');

      this.presentPane();
    });
  }

  /**
   * presentPane
   */
  public presentPane() {
    this.cupertinoPane.present({ animate: true });
  }
}
