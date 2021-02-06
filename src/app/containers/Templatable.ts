import {Template} from './Template';


export interface Templatable {
    toTemplate(): Template;
}

