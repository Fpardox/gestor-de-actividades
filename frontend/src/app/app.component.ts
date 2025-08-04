import { Component, OnInit, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Gestor de Tareas';
  tasks: any[] = [];
  private apiUrl = '';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.apiUrl = 'http://localhost:3000/api/tasks';
    } else {
      this.apiUrl = 'https://gestor-de-actividades.onrender.com';
    }
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.tasks = data;
    });
  }

  addTask(title: string) {
    if (!title) return;
    const newTask = { title: title, completed: false };
    this.http.post<any>(this.apiUrl, newTask).subscribe(addedTask => {
      this.tasks.push(addedTask);
    });
  }

  updateTask(task: any) {
    const updatedTask = { ...task, completed: !task.completed };
    this.http.put<any>(`${this.apiUrl}/${task._id}`, updatedTask).subscribe(response => {
      const index = this.tasks.findIndex(t => t._id === response._id);
      if (index !== -1) {
        this.tasks[index] = response;
      }
    });
  }

  deleteTask(task: any) {
    this.http.delete(`${this.apiUrl}/${task._id}`).subscribe(() => {
      this.tasks = this.tasks.filter(t => t._id !== task._id);
    });
  }
}