import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../../shared/services/notes.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  content: any;
  selectedFile: any;
  doc: any = localStorage.getItem('docCount');
  @ViewChild('itemTitle') el: ElementRef;
  constructor(private noteServ: NotesService) {
    this.content = 'Text/Description';
    this.selectedFile = null;
    if (!this.doc) {
      localStorage.setItem('docCount', '1');
      this.doc = localStorage.getItem('docCount');
    }
 }

  ngOnInit() {
  }

  onAdd(title, content) {
    const type = 'Document';
    if (title === '' || content === '' || this.selectedFile === null) {
      return;
    }
    const metaData = {'contentType': this.selectedFile.type};
    console.log(metaData);
    const storageRef = firebase.storage().ref('/files/' + this.doc);
    storageRef.put(this.selectedFile, metaData)
              .then((res) => {
                this.noteServ.addDocument(title, type, this.doc , metaData.contentType);
                this.el.nativeElement.value = '';
                this.doc++;
                localStorage.setItem('docCount', this.doc);
              });
    console.log('Uploading Document');
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

}
