import { Injectable } from '@angular/core';


const sleep = (ms): Promise<void> => new Promise(r => setTimeout(r, ms));

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  async delay(ms: number): Promise<void> {
    return sleep(ms);
  }

   clone(obj: any): any{
    return JSON.parse(JSON.stringify(obj));
  }

  equalString(obj: any, obj1: any): any{
    return JSON.stringify(obj) === JSON.stringify(obj1);
  }
}
