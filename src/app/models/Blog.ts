import {ContentModel} from './ContentModel';

export class Blog extends ContentModel{
    title?: string;
    author?: string;
    description?: string;
    publishAt?: Date;
}
