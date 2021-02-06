
import {Rootable} from './Rootable';
import {ContentModel} from './ContentModel';

export class SectionModel extends ContentModel implements Rootable{
    heading?: string;
    content?: string;

    collectRootData(): object {
        return {id: this.id};
    }
}
