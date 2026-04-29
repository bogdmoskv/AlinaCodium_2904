import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  items = ['apple', 'banana', 'orange', 'grape', 'kiwi', 'mango'];
  results: string[] = [];
  searchControl = new FormControl('');

  ngOnInit(): void {
      this.searchControl.valueChanges
        .pipe(
          debounceTime(500), //ждем 500мс после последнего ввода
          map(value => this.filterItems(value ?? '')) //фильтруем данніе
        )
        .subscribe(results => { //подпишись на поток данных и каждый раз, когда придут результаты, сохрани их
          this.results = results;
        });
  }

  //принимает текст поиска - возвращает список подходящих єлементов
  filterItems(query: string): string[]{
    return this.items.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    )
  }
}
