import {Component, EventEmitter, HostBinding, HostListener, OnInit, Output} from '@angular/core';
import {ContentComponent} from '../content/content.component';

@Component({
  selector: 'gt-single-text',
  templateUrl: './single-text.component.html',
  styleUrls: ['./single-text.component.scss']
})
export class SingleTextComponent extends ContentComponent<string> implements OnInit{

  @Output()
  focusIn = new EventEmitter<void>();
  //
  @Output()
  focusOut = new EventEmitter<void>();
  //
  @HostBinding('attr.contenteditable')
  get contentEditable(): boolean {
    return this.mode === 'EDIT';
  }
  //
  ngOnInit(): void {
    this.elementRef.nativeElement.innerHTML = this.model || '';
    super.ngOnInit();
  }
  //
  @HostListener('keydown.enter', ['$event'])
  onKeydownEnter(event: KeyboardEvent): void{
    console.log('content -> keydown.enter');
    // prevent the default behaviour of return key pressed
    event.preventDefault();
    // insert a br tags
    document.execCommand('insertHTML', false, '<br/>');
  }

  @HostListener('focusin')
  onFocus(): void {
    console.log('content -> focusin');
    this.focusIn.emit();
  }

  @HostListener('focusout')
  onFocusout(): void {
    console.log('content -> focusout');
    this.focusOut.emit();
    this.triggerModelChange();
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    console.log('content -> input');
    this.model = this.elementRef.nativeElement.innerHTML;
  }

}
