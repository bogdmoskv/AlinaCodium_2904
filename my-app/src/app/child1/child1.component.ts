import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child1',
  imports: [],
  templateUrl: './child1.component.html',
  styleUrl: './child1.component.css'
})
export class Child1Component {
  @Input() message!: string;
  //! это оператор утверждения. Он говорит TypeScript: Я гарантирую, что это свойство будет инициализировано,
  //даже если сейчас ты этого не видишь

  //Без ! TS в строгом режиме требует, чтобы все свойства класса были инициализированы в конструкторе


  //Создаём Output для отправки события родителю
  @Output() messageChange: EventEmitter<string> = new EventEmitter<string>();

  //Метод для отправки события
  sendMessageToParent(){
    //Это значит: Эй родитель, я отправляю тебе сообщение
    this.messageChange.emit("Привет из дочернего компонента!");
  }
}
