import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Blog} from "../../models/Blog";

@Component({
  selector: 'gt-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  searchingValue = '';
  pageIndex = 0;
  searchType = 'next';
  indexId;

  blogs: Array<Blog> = [];

  constructor(private apiService: ApiService) {
  }

  async ngOnInit(): Promise<void> {
    this.blogs = await this.apiService.search({});
  }

  async search(): Promise<void> {
    const query = {
      searchingValue: this.searchingValue,
      searchType: this.searchType,
      indexId: this.indexId
    };
    this.blogs = await this.apiService.search(query);
  }

  changeSearchingValue(): void{
    this.pageIndex = 0;
    this.indexId = 0;
    this.search();
  }

  next(): void{
    this.pageIndex += 1;
    this.indexId = this.blogs[this.blogs.length - 1].id;
    this.searchType = 'next';
    this.search();
  }

  back(): void{
    this.pageIndex -= 1;
    this.indexId = this.blogs[0].id;
    this.searchType = 'back';
    this.search();
  }
}
