import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CupertinoPane, CupertinoSettings } from 'cupertino-pane';
import { PaneType } from 'src/app/enums/paneTypes.enum';
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
      onDragStart: () => this.paneService.onDragStart(),
      onDrag: () => this.paneService.onDrag(this.cupertinoPane),
      onDragEnd: () => this.paneService.onDragEnd(),
      onBackdropTap: () => this.cupertinoPane.hide(),
    };
    this.cupertinoPane = new CupertinoPane('.pane.pane--create-item', settings);

    this.paneService.present.subscribe((type: PaneType) => {
      console.log('present');
      if (type === PaneType.CreateItem) {
        this.presentPane();
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
