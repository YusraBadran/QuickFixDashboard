import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceCategoriesItem } from '../service/categories-item.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
  constructor(
    private servicecategoriesitem: ServiceCategoriesItem,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}
}
