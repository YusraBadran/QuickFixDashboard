import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/router/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  address: any;
  submitted = false;
  rout = routes;
  constructor() {}
  getPosition(event: any) {
    console.log(event);

    this.address = event;
  }
  ngOnInit(): void {}
}
