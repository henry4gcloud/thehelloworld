import {Model} from './Model';
import {Rootable} from './Rootable';

export class HeadingModel extends Model implements Rootable{
    heading?: string;

    collectRootData(): object {
        return {id: this.id};
    }
}
