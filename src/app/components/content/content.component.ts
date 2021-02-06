import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  HostListener,
  HostBinding, Type
} from '@angular/core';
import {ContentModel} from '../../models/ContentModel';
import {UtilityService} from '../../services/utility.service';
import {Templatable} from '../../containers/Templatable';
import { Template } from 'src/app/containers/Template';


@Component({
  selector: 'gt-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent<M> implements OnInit, Templatable {

  protected backUpModel: ContentModel;

  @Input()
  mode: 'VIEW' | 'EDIT' | 'DESIGN' = 'VIEW';

  @Input()
  model: M;

  @Output('modelChange')
  change = new EventEmitter<M>();


  constructor(protected elementRef: ElementRef, protected utility: UtilityService) {
  }

  ngOnInit(): void {
    if (!['VIEW', 'EDIT', 'DESIGN'].includes(this.mode)){
      this.mode = 'VIEW';
    }
  }

  triggerModelChange(): void {
    this.change.emit(this.model);
  }

  toTemplate(): Template {
    return {
      type: this.constructor as Type<any>
    };
  }


}
