import { Component, OnInit } from '@angular/core';
import {InlineTextComponent} from '../inline-text/inline-text.component';

@Component({
  selector: 'gt-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent extends InlineTextComponent{
}
