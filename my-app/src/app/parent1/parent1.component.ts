import { Component } from '@angular/core';
import { Child1Component } from '../child1/child1.component';

@Component({
  selector: 'app-parent1',
  imports: [Child1Component],
  templateUrl: './parent1.component.html',
  styleUrl: './parent1.component.css'
})
export class Parent1Component {
  parentMessage: string = 'Привет из родительского компонента!';

  handleChildMessage(msg: string) {
    this.parentMessage = msg;
    console.log("Сообщение от ребёнка: ", msg);
  }
}
