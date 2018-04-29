import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class NotesService {
  notesList: AngularFireList<any>;
  url = 1;
  constructor(private firebasedb: AngularFireDatabase) { }

  getNotes() {
    this.notesList = this.firebasedb.list('titles');
    return this.notesList;
  }

  addTitle(title: any, content: any, type: any) {
    if (content === undefined || content === null) {
      content = '';
    }
    this.notesList.push({
      title : title,
      content: content,
      type: type,
      picture: 0
    });
  }

  addPicture(title: any, content: any, type: any, url: any) {
    if (content === undefined || content === null) {
      content = '';
    }
    if (url === null || url === undefined) {
      console.log('No picture');
      return;
    }
    const storage = firebase.storage();
    const pathReference = storage.ref('images/' + url);
    pathReference.getDownloadURL().then((data) => {
        this.notesList.push({
        title : title,
        content: content,
        type: type,
        picture: data
      });
    });
  }

  addDocument(title: any, type: any, doc: any, doc_type: any) {
    if (doc === null || doc === undefined) {
      console.log('No document selected');
      return;
    }
    const storage = firebase.storage();
    const pathReference = storage.ref('files/' + doc);
    pathReference.getDownloadURL().then((data) => {
        this.notesList.push({
        title : title,
        type: type,
        file: data,
        doc_type : doc_type
      });
    });
  }
}
