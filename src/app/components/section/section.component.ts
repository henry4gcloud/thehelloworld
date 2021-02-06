import { Component, OnInit } from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {SectionModel} from '../../models/SectionModel';

@Component({
  selector: 'gt-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent extends ContentComponent<SectionModel>{

  changeProperty(): void {
    console.log('gt-section -> changeProperty');
    this.triggerModelChange();
  }
}
