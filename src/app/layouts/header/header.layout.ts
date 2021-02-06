import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'gt-header',
  templateUrl: './header.layout.html',
  styleUrls: ['./header.layout.scss']
})
export class HeaderLayout implements OnInit {

  @Input()
  title: String;

  constructor() { }

  ngOnInit(): void {
  }

}
