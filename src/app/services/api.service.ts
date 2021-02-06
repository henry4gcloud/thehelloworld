import { Injectable } from '@angular/core';
import {Blog} from "../models/Blog";


const sampleData: Array<Blog> = [
  {
    id: 1,
    title: 'Learn Angular',
    author: 'Author 1',
    publishAt: new Date()
  },
  {
    id: 2,
    title: 'CLI Documentation',
    author: 'Author 2',
    publishAt: new Date()
  },
  {
    id: 3,
    title: 'Angular Blog',
    author: 'Author 3',
    publishAt: new Date()
  },
  {
    id: 4,
    title: 'Angular Blog',
    author: 'Author 4',
    publishAt: new Date()
  },
  {
    id: 5,
    title: 'Learn Angular',
    author: 'Author 5',
    publishAt: new Date()
  },
  {
    id: 6,
    title: 'Angular Blog',
    author: 'Author 6',
    publishAt: new Date()
  },
  {
    id: 7,
    title: 'Learn Angular',
    author: 'Author 7',
    publishAt: new Date()
  },

  {
    id: 8,
    title: 'Learn Angular',
    author: 'Author 8',
    publishAt: new Date()
  },
  {
    id: 9,
    title: 'CLI Documentation',
    author: 'Author 9',
    publishAt: new Date()
  },
  {
    id: 10,
    title: 'Angular Blog',
    author: 'Author 10',
    publishAt: new Date()
  },
  {
    id: 11,
    title: 'Angular Blog',
    author: 'Author 11',
    publishAt: new Date()
  },
  {
    id: 12,
    title: 'Learn Angular',
    author: 'Author 12',
    publishAt: new Date()
  },
  {
    id: 13,
    title: 'Angular Blog',
    author: 'Author 13',
    publishAt: new Date()
  },
  {
    id: 14,
    title: 'Learn Angular',
    author: 'Author 14',
    publishAt: new Date()
  },
  {
    id: 15,
    title: 'Angular Blog',
    author: 'Author 15',
    publishAt: new Date()
  },
  {
    id: 16,
    title: 'Learn Angular',
    author: 'Author 16',
    publishAt: new Date()
  }
].map(item => new Blog(item));


const sleep = m => new Promise(r => setTimeout(r, m));

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  async search(condition?: any): Promise<Array<Blog>>{
    await sleep(250);
    return sampleData;
  }

  async get(id): Promise<Blog>{
    await sleep(250);
    return sampleData[id];
  }
}
