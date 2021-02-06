import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogPage } from './components/detail/dialog.component';
import { FooterLayout } from './layouts/footer/footer.layout';
import { HeaderLayout } from './layouts/header/header.layout';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import {FormsModule} from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import {ListPage} from './pages/list/list.page';
import { ContentComponent } from './components/content/content.component';
import { LayoutContainer } from './containers/layout/layout.container';
import { ComponentContainer } from './containers/component/component.container';
import {PageContainer} from './containers/page/page.container';
import {DetailPage} from './pages/detail/detail.page';
import { AbstractComponent } from './containers/abstract/abstract.container';
import {LabelComponent} from './components/label/label.component';
import {InlineTextComponent} from './components/inline-text/inline-text.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { HeadingComponent } from './components/heading/heading.component';
import { SectionComponent } from './components/section/section.component';
import { SingleTextComponent } from './components/single-text/single-text.component';
import { ArticleComponent } from './components/article/article.component';
import { TitleComponent } from './components/title/title.component';

const entryComponents = [
  PageContainer,
  LayoutContainer,
  ComponentContainer,
    //
  ContentComponent,
  InlineTextComponent,
  LabelComponent,
  ParagraphComponent,
  HeadingComponent,
  SectionComponent
];

@NgModule({
  declarations: [
    AppComponent,
    DialogPage,
    ListPage,
    DetailPage,
    FooterLayout,
    HeaderLayout,
    SearchBarComponent,
    CardComponent,
    ContentComponent,
    LabelComponent,
    InlineTextComponent,
    PageContainer,
    LayoutContainer,
    ComponentContainer,
    AbstractComponent,
    ParagraphComponent,
    HeadingComponent,
    SectionComponent,
    SingleTextComponent,
    ArticleComponent,
    TitleComponent
  ],

  entryComponents: [
      ...entryComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
