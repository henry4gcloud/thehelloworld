import {Component, HostListener} from '@angular/core';
import {InlineTextComponent} from '../inline-text/inline-text.component';


@Component({
  selector: 'gt-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends InlineTextComponent {
}
