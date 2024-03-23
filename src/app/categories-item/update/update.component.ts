import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCategoriesItem } from '../service/categories-item.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  

  constructor(
    private formBuilder: FormBuilder,
    private servicecategoriesitem: ServiceCategoriesItem,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    
  }

  updateCategory(): void {
    
  }
}