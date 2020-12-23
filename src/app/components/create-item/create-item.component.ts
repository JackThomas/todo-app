import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { PaneType } from 'src/app/enums/paneTypes.enum';
import { List } from 'src/app/interfaces/list';
import { ListService } from 'src/app/services/list/list.service';
import { PaneService } from 'src/app/services/pane/pane.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
  enable: boolean = false;
  form: FormGroup;

  list: List;
  cupertinoPane: CupertinoPane;

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private paneService: PaneService
  ) {}

  ngOnInit() {
    this.getSelected();
    this.createForm();
    this.initPane();
  }

  /**
   * getSelected
   */
  getSelected() {
    this.listService.selected.subscribe((list: List) => {
      if (list) {
        this.list = list;
      }
    });
  }

  /**
   * createForm
   */
  createForm() {
    this.enable = true;
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * submitForm
   */
  submitForm() {
    this.listService
      .transformItem(this.form.value)
      .addItem(this.list)
      .then(() => {
        console.log('List created');
        this.cupertinoPane.hide();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * initPane
   */
  public initPane() {
    const settings: CupertinoSettings = {
      parentElement: 'app-create-item', // Parent container
      backdrop: true,
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
      onDidPresent: () => {
        this.paneService.onDidPresent();
      },
      onDrag: () => {
        this.paneService.onDrag(this.cupertinoPane);
      },
      onBackdropTap: () => this.cupertinoPane.hide(),
      onTransitionStart: ($event) => {
        this.paneService.onTransitionStart($event, this.cupertinoPane);
        this.paneService.fixedBottomAnimate(this.cupertinoPane);
      },
    };
    this.cupertinoPane = new CupertinoPane('.pane.pane--create-item', settings);
    this.paneService.fixedBottom(this.paneService, this.cupertinoPane);

    this.paneService.present.subscribe((type: PaneType) => {
      console.log('present');
      if (type === PaneType.CreateItem) {
        this.presentPane();
        this.paneService.watch(this.cupertinoPane, this.paneService.fixedBottom);
      }
    });
  }

  /**
   * presentPane
   */
  public presentPane() {
    this.cupertinoPane.present({ animate: true });
  }
}
