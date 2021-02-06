import {Component, OnInit, Type} from '@angular/core';
import {Blog} from '../../models/Blog';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {ContentModel} from '../../models/ContentModel';
import {UtilityService} from "../../services/utility.service";
import {ContentComponent} from '../../components/content/content.component';
import {Templatable} from '../../containers/Templatable';
import {SectionModel} from '../../models/SectionModel';
import {ArticleModel} from '../../models/ArticleModel';

@Component({
  selector: 'gt-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
// tslint:disable-next-line:component-class-suffix
export class DetailPage implements OnInit {

  mode: 'DESIGN' | 'EDIT' | 'VIEW' = 'VIEW';

  contentType: Type<Templatable> = ContentComponent;

  blog = new Blog({});
  content = new ContentModel({content: 'Hello World'});

  section: SectionModel  = new SectionModel({
    heading: 'Introduction',
    content: 'This document provides a guide to help with the important task of choosing the correct Apple'
  });

  article = new ArticleModel({
    title: 'Choosing an Apple',
    sections: [
      new SectionModel({
        heading: 'Introduction',
        content: 'This document provides a guide to help with the important task of choosing the correct Apple'
      }),
      new SectionModel({
        heading: 'Criteria',
        content: 'There are many different criteria to be considered when choosing an Apple — size, color, firmness, sweetness, tartness...'
      })

    ]
  });

  constructor(private route: ActivatedRoute,
              private utilityService: UtilityService,
              private apiService: ApiService ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.blog = await this.apiService.get(id);
  }

}
