import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabase, AngularFireDatabaseModule} from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesComponent } from './acne-app/notes/notes.component';
import { HeaderComponent } from './acne-app/header/header.component';

import {environment} from '../environments/environment';
import { NewNoteComponent } from './acne-app/new-note/new-note.component';
import { NotesService } from './shared/services/notes.service';
import { ArticleComponent } from './acne-app/article/article.component';
import { PictureComponent } from './acne-app/picture/picture.component';
import { DocumentComponent } from './acne-app/document/document.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent, NotesComponent, HeaderComponent, NewNoteComponent, ArticleComponent, PictureComponent, DocumentComponent],
    providers: [NotesService],
    bootstrap: [AppComponent]
})
export class AppModule {}
