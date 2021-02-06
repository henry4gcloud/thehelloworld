import {Component, Input, OnInit} from '@angular/core';
import {Blog} from "../../models/Blog";

@Component({
  selector: 'gt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  data = new Blog();

  constructor() { }

  ngOnInit(): void {
  }

}
