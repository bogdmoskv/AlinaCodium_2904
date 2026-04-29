import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main2',
  imports: [CommonModule],
  templateUrl: './main2.component.html',
  styleUrl: './main2.component.css'
})
export class Main2Component {
  //переменная, которая отвечает за вход пользователя
  isLoggedIn: boolean = false;

  userRole: string = 'guest';

  //метод для переключения состояния входа
  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  setRole(role: string) {
    this.userRole = role;
  }
}
