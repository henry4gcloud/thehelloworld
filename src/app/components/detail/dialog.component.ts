import {Component, ContentChildren, OnInit, QueryList, TemplateRef} from '@angular/core';
import {Blog} from '../../models/Blog';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'gt-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogPage implements OnInit {


  blog  = new Blog({});
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    this.blog = await this.apiService.get(id);
  }

}
