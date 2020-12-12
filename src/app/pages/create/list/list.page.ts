import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private listService: ListService) {}

  ngOnInit() {
    this.createForm();
  }

  /**
   * createForm
   */
  createForm() {
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
        console.log('done');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
