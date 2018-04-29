import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {NotesComponent} from './acne-app/notes/notes.component';
import { NewNoteComponent } from './acne-app/new-note/new-note.component';
import { ArticleComponent } from './acne-app/article/article.component';
import { PictureComponent } from './acne-app/picture/picture.component';
import { DocumentComponent } from './acne-app/document/document.component';

const routes: Routes = [
    { path: '', redirectTo: '/notes', pathMatch: 'full' },
    {
      path: 'notes', component: NotesComponent,
      children: [
        {
          path: 'add',
          component: NewNoteComponent,
          outlet: 'new'
        },
        {
          path: 'article',
          component: ArticleComponent,
          outlet: 'new'
        },
        {
          path: 'picture',
          component: PictureComponent,
          outlet: 'new'
        },
        {
          path: 'document',
          component: DocumentComponent,
          outlet: 'new'
        }
      ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
