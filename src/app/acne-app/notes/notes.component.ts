import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';
import { NotesService } from '../../shared/services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notesArray: any[];
  displayMode: number;
  constructor(private noteServ: NotesService) {
      this.displayMode = 1;
   }

  ngOnInit() {
    this.noteServ.getNotes().snapshotChanges()
    .subscribe(item => {
      this.notesArray = [];
      // tslint:disable-next-line:no-shadowed-variable
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.notesArray.push(x);
      });

      this.reverse(this.notesArray);

    });
  }

  reverse (array) {
    let i = 0, temp = null;
    const    n = array.length,
             middle = Math.floor(n / 2);

    for (; i < middle; i += 1) {
       temp = array[i];
       array[i] = array[n - 1 - i];
       array[n - 1 - i] = temp;
    }
  }

}
