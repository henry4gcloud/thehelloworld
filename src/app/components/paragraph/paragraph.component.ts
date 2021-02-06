import { Component, OnInit } from '@angular/core';
import {SingleTextComponent} from '../single-text/single-text.component';

@Component({
  selector: 'gt-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent extends SingleTextComponent {
}
