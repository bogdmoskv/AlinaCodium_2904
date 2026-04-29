import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-main3',
  imports: [FormsModule],
  providers: [DataService],
  templateUrl: './main3.component.html',
  styleUrl: './main3.component.css'
})
export class Main3Component {
  items: string[] = [];
  name: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void{
    this.items = this.dataService.getData();
  }

  addItem(){
    if (!this.name.trim()) return;

    this.dataService.addData(this.name);
    this.name = '';
  }
}
