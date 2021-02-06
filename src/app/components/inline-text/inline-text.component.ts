import {Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, HostListener} from '@angular/core';
import {SingleTextComponent} from '../single-text/single-text.component';


@Component({
  selector: 'gt-text',
  templateUrl: './inline-text.component.html',
  styleUrls: ['./inline-text.component.scss']
})
export class InlineTextComponent extends SingleTextComponent {

  onKeydownEnter(event: KeyboardEvent): void{
    console.log('gt-inline-text -> keydown.enter');
    // prevent the default behaviour of return key pressed
    event.preventDefault();
    this.triggerModelChange();
    // this.onFocusout();
  }
}
