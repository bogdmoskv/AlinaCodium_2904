import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit {
  counter = 0;

  ngOnInit(){
    interval(1000).subscribe(value => {
      this.counter = value;
    })
  }
}
