import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotesService } from '../../shared/services/notes.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  content: any;
  @ViewChild('itemTitle') el: ElementRef;
  @ViewChild('content') cont: ElementRef;

  constructor(private noteServ: NotesService) {
    this.content = 'Text/Description';
 }

  ngOnInit() {
  }

  onAdd(title, content) {
    const type = 'Article';
    console.log(title, content);
    if (title === '' || content === '') {
      return;
    }
    this.noteServ.addTitle(title, content, type);
    this.el.nativeElement.value = '';
    this.cont.nativeElement.value = '';
  }

}
