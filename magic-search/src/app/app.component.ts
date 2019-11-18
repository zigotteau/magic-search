import { Component, OnInit } from '@angular/core';
import { MagicSearch } from './magic-search';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'magic-search';

  searchTerms: string;

  search = new MagicSearch();

  ngOnInit() {
    this.search.setDictionary(['orange', 'pomme', 'orage']);
  }

  onSearch() {
    let result = this.search.doSearch(this.searchTerms);
    console.log("result:", result);
  }


}
