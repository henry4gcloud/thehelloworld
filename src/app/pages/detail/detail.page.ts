import {Component, Injector, OnInit, Type} from '@angular/core';
import {Blog} from '../../models/Blog';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentModel} from '../../models/ContentModel';
import {Templatable} from '../../containers/Templatable';
import {SectionModel} from '../../models/SectionModel';
import {ArticleModel} from '../../models/ArticleModel';
import {UtilityService} from '../../services/utility.service';
import {Dependency} from '../../decorators/dependency-injection';
import {ContentComponent} from '../../components/content/content.component';

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

  @Dependency()
  private date: Date;

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private utilityService: UtilityService, private injector: Injector,
              private apiService: ApiService ) { }

  async ngOnInit(): Promise<void> {
    // const id = this.activatedRoute.snapshot.paramMap.get('id');
    // this.blog = await this.apiService.get(id);
    //
    // let activatedRoute1 = this.injector.get(ActivatedRoute, undefined);
    // const injector = Injector.create({providers: [{provide: DetailPage, deps: []}]});
    // let activatedRoute2 = injector.get(ActivatedRoute, undefined);
    // console.log(this.router);
    // debugger;
    // setTimeout(() => {
    //   this.article = new ArticleModel(JSON.parse(JSON.stringify(this.article)));
    //   }, 5000);
  }

}
