import { Component, OnInit } from '@angular/core';
import {ContentComponent} from '../content/content.component';
import {ArticleModel} from '../../models/ArticleModel';
import {SectionModel} from '../../models/SectionModel';

@Component({
  selector: 'gt-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent extends ContentComponent<ArticleModel> implements OnInit{

  ngOnInit(): void {
    super.ngOnInit();
  }

  changeProperty(): void {
    this.triggerModelChange();
  }

  sectionChange(section: SectionModel, index: number): void {
    this.model.sections[index] = Object.assign(this.model.sections[index], section);
    this.changeProperty();
  }

  newSection(): void {
    this.model.sections.push(new SectionModel({heading: '', content: ''}));
  }
}
