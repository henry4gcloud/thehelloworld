import {Model} from './Model';
import {Rootable} from './Rootable';

export class ContentModel extends Model implements Rootable{
    content?: string;

    collectRootData(): object {
        return {id: this.id};
    }
}
