import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParagraphModel} from '../../models/ParagraphModel';
import {AutoSync} from '../../decorators/AutoSync';
import {ContentSyncProvider} from '../../providers/ContentSyncProvider';
import {DisplayMode} from '../../models/DisplayMode';

@Component({
  selector: 'gt-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss']
})
export class ParagraphComponent implements OnInit{

  @Input()
  displayMode: DisplayMode = DisplayMode.VIEW;
  @Input()
  @AutoSync(ContentSyncProvider)
  public paragraphModel: ParagraphModel;

  // @Output()
  // paragraphModelChange: EventEmitter<ParagraphModel> = new EventEmitter<ParagraphModel>();
  constructor() {
    console.log(this.paragraphModel);
  }

  ngOnInit(): void {
    console.log(this.paragraphModel);
  }



}
