import {Type} from '@angular/core';

export class Template {
    staticStyle?: any;
    type?: Type<any>;
    children?: Array<Template>;
}
