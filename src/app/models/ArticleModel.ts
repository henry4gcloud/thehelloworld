import {Rootable} from './Rootable';
import {ContentModel} from './ContentModel';
import {SectionModel} from './SectionModel';

export class ArticleModel extends ContentModel implements Rootable{
    title?: string;
    sections?: Array<SectionModel>;

    collectRootData(): object {
        return {
            id: this.id,
            sections: this.sections.map(section => section.collectRootData())
        };
    }
}
