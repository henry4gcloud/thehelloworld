import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {SectionModel} from '../../models/SectionModel';
import {AutoSync} from '../../decorators/AutoSync';
import {ContentSyncProvider} from '../../providers/ContentSyncProvider';
import {DisplayMode} from '../../models/DisplayMode';

@Component({
  selector: 'gt-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent{


  @Input()
  displayMode = DisplayMode.VIEW;
  @Input()
  @AutoSync(ContentSyncProvider)
  sectionModel: SectionModel;

  @Output()
  sectionModelChange: EventEmitter<SectionModel> = new EventEmitter<SectionModel>();
  triggerSectionModelChange(): void {
    this.sectionModelChange.emit(this.sectionModel);
  }
}
