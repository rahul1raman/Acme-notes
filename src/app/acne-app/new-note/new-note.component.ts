import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../../shared/services/notes.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.scss']
})
export class NewNoteComponent implements OnInit {
  @ViewChild('itemTitle') el: ElementRef;

  constructor(private noteServ: NotesService) {
 }

  ngOnInit() {
  }

  onAdd(title, content) {
    const type = 'Text';
    console.log(title, content);
    if (title === '') {
      return;
    }
    this.noteServ.addTitle(title, content, type);
    this.el.nativeElement.value = '';
  }

}
