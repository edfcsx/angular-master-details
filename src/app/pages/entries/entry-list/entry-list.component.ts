import { Component, OnInit } from '@angular/core';
import { Entry } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent implements OnInit {
  entries: Entry[] = [];

  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      (entries) => this.entries = entries,
      (error) => alert('erro ao carregar a lista')
    );
  }

  deleteEntry(category: Entry) {
    const mustDelete = confirm('Deseja realmente excluir ?');

    if (mustDelete) {
      this.entryService.delete(category.id).subscribe(
        () => this.entries = this.entries.filter(element => element !== category),
        () => alert('erro ao excluir categoria')
      );
    }

  }

}
