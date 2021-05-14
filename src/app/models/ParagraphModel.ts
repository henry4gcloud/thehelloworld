import {Model} from './Model';
import {Rootable} from './Rootable';

export class ParagraphModel extends Model implements Rootable{
    content?: string;
    collectRootData(): object {
        return {id: this.id};
    }
}
