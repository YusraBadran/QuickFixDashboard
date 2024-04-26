import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/router/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  submitted = false;
  rout = routes;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Initialize component
  }
}
