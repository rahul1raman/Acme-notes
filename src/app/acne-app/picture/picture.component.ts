import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../../shared/services/notes.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {

  content: any;
  selectedImage: any;
  url: any = localStorage.getItem('urlCount');
  @ViewChild('itemTitle') el: ElementRef;
  @ViewChild('content') cont: ElementRef;

  constructor(private noteServ: NotesService) {
    this.content = 'Text/Description';
    this.selectedImage = null;
    if (!this.url) {
      localStorage.setItem('urlCount', '1');
      this.url = localStorage.getItem('urlCount');
    }
 }

  ngOnInit() {
  }

  onAdd(title, content) {
    const type = 'Picture';
    if (title === '' || content === '' || this.selectedImage === null) {
      return;
    }
    const metaData = {'contentType': this.selectedImage.type};
    const storageRef = firebase.storage().ref('/images/' + this.url);
    storageRef.put(this.selectedImage, metaData)
              .then((res) => {
                this.noteServ.addPicture(title, content, type, this.url);
                this.el.nativeElement.value = '';
                this.cont.nativeElement.value = '';
                this.url++;
                localStorage.setItem('urlCount', this.url);
              });
    console.log('Uploading');
  }

  onImageSelected(event) {
    this.selectedImage = <File>event.target.files[0];
  }

}
