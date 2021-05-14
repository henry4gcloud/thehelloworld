import { Component, OnInit } from '@angular/core';
import {ParagraphModel} from '../../models/ParagraphModel';

@Component({
  selector: 'gt-page',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class TestPage implements OnInit {

  constructor() { }

  public paragraphDataList: Array<ParagraphModel> = [];

  ngOnInit(): void {
    this.paragraphDataList.push(new ParagraphModel({id: '607e2ed3eed8b7000a273a31'}));
    this.paragraphDataList.push(new ParagraphModel({id: '6080d0e87fe1e6000a32f076'}));
  }

  addNew(): void{
    this.paragraphDataList.push(new ParagraphModel({}));
  }

}
