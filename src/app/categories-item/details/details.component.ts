import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  //itemId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
