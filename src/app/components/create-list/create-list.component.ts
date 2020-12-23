import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { PaneType } from 'src/app/enums/paneTypes.enum';
import { ListService } from 'src/app/services/list/list.service';
import { PaneService } from 'src/app/services/pane/pane.service';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  enable: boolean = false;
  form: FormGroup;

  cupertinoPane: CupertinoPane;

  constructor(
    private formBuilder: FormBuilder,
    private listService: ListService,
    private paneService: PaneService
  ) {}

  ngOnInit() {
    this.createForm();
    this.initPane();
  }

  /**
   * createForm
   */
  createForm() {
    this.enable = true;
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      colour: ['', Validators.compose([Validators.required])],
    });
  }

  /**
   * submitForm
   */
  submitForm() {
    this.listService
      .transformData(this.form.value)
      .create()
      .then(() => {
        console.log('List created');
        this.form.reset();
        this.dismissPane();
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
      parentElement: 'app-create-list', // Parent container
      backdrop: true,
      backdropOpacity: 0.8,
      breaks: {
        top: {
          // Topper point that pane can reach
          enabled: true, // Enable or disable breakpoint
          height: this.paneService.height.top, // Pane breakpoint height
          bounce: true, // Bounce pane on transition
        },
        middle: { enabled: true, height: this.paneService.height.middle, bounce: true },
        bottom: { enabled: true },
      },
      bottomClose: true,
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

    this.cupertinoPane = new CupertinoPane('.pane.pane--create-list', settings);
    this.paneService.fixedBottom(this.paneService, this.cupertinoPane);

    this.paneService.present.subscribe((type: PaneType) => {
      if (type === PaneType.CreateList) {
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

  /**
   * dismissPane
   */
  public dismissPane() {
    this.cupertinoPane.hide();
  }
}
