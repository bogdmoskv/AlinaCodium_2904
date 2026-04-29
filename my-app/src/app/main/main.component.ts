import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-main',
  imports: [FormsModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  newTaskTitle = '';

  tasks: Task[] = [
    {
      id: 1,
      title: 'Изучить Ангуляр',
      done: false,
      important: true
    },
    {
      id: 2,
      title: 'Сделать домашку',
      done: true,
      important: false
    }
  ]

  addTask() {
    const newTask: Task = {
      id: Date.now(),
      title: this.newTaskTitle,
      done: false,
      important: false
    };

    this.tasks.push(newTask);
    this.newTaskTitle = '';
  }

  toggleDone(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task){
      task.done = !task.done
    }
  }

  toggleImportant(id: number){
    const task = this.tasks.find(t => t.id === id);
    if (task){
      task.important = !task.important;
    }
  }

  deleteTask(id: number){
    const index = this.tasks.findIndex(t => t.id === id);
    this.tasks.splice(index, 1);
  }

}
