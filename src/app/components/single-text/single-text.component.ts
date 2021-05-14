import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  Type
} from '@angular/core';
import {Templatable} from '../../containers/Templatable';
import {UtilityService} from '../../services/utility.service';
import {Template} from '../../containers/Template';
import {DisplayMode, isValidDisplayMode} from '../../models/DisplayMode';

@Component({
  selector: 'gt-single-text',
  templateUrl: './single-text.component.html',
  styleUrls: ['./single-text.component.scss']
})
export class SingleTextComponent implements OnChanges, Templatable, OnInit {

  @Input()
  text = '';

  @Input()
  displayMode: DisplayMode = DisplayMode.VIEW;

  @Output()
  textChange = new EventEmitter<string>();

  @Output()
  focusIn = new EventEmitter<void>();
  //
  @Output()
  focusOut = new EventEmitter<void>();

  //
  @HostBinding('attr.contenteditable')
  get contentEditable(): boolean {
    return this.displayMode === DisplayMode.EDIT;
  }

  constructor(protected elementRef: ElementRef, protected utility: UtilityService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const text: SimpleChange = changes.text;
    if (text &&
        (text.isFirstChange() || (text.previousValue !== text.currentValue && this.elementRef.nativeElement.innerHTML !== this.text))){
      this.elementRef.nativeElement.innerHTML = this.text || '&nbsp';
    }
    console.log(changes);
  }
  //
  ngOnInit(): void {
    if (!isValidDisplayMode(this.displayMode)){
      this.displayMode = DisplayMode.VIEW;
    }
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
    this.text = this.elementRef.nativeElement.innerHTML;
  }


  triggerModelChange(): void {
    this.textChange.emit(this.text);
  }

  toTemplate(): Template {
    return {
      type: this.constructor as Type<any>
    };
  }

}
