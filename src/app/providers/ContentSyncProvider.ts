import {SyncProviderInterface} from './SyncProviderInterface';
import {HttpClient} from '@angular/common/http';
import {HttpSyncProviderAbstract} from './HttpSyncProviderAstract';
import {ContentModel} from '../models/ContentModel';
import {SyncProvider} from '../decorators/AutoSync';

// @SyncProvider()
export class ContentSyncProvider extends HttpSyncProviderAbstract<ContentModel>{
    protected httpOptions: {  };
    protected syncUrl = 'http://cms-api-308908.appspot.com/content';
}
