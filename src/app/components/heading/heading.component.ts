import {Component, Input, OnInit} from '@angular/core';
import {InlineTextComponent} from '../inline-text/inline-text.component';
import {HeadingModel} from '../../models/HeadingModel';
import {ContentSyncProvider} from '../../providers/ContentSyncProvider';
import {AutoSync} from '../../decorators/AutoSync';

@Component({
  selector: 'gt-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent extends InlineTextComponent {
  @Input()
  @AutoSync(ContentSyncProvider)
  headingModel: HeadingModel;


}
