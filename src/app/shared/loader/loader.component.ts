import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent {
  constructor(public loader: LoaderService) {}

  loading$ = this.loader.loading$;

  ngOnInit(): void {}
}
