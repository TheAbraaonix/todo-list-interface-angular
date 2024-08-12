import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/toDoService';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToDoViewModel } from '../models/toDo-view-model';
import * as bootstrap from 'bootstrap'; // Import the 'bootstrap' module

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  providers: [ToDoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public toDos: ToDoViewModel[] = [];
  
  constructor(
    private toDoService: ToDoService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.toDoService.getAll().subscribe((response: any) => {
      this.toDos = response;
    });
  }

  public selectedFilter(filter: string): void {
    if (filter === "Completed") {
      this.toDoService.getAll().subscribe((response: any) => {
        this.toDos = response.filter((todo: ToDoViewModel) => todo.isCompleted === true);
      })
    }

    if (filter === "In progress") {
      this.toDoService.getAll().subscribe((response: any) => {
        this.toDos = response.filter((todo: ToDoViewModel) => todo.isCompleted === false);
      })
    }
    
    if (filter === "All") {
      this.toDoService.getAll().subscribe((response: any) => {
        this.toDos = response;
      });
    }
  }

  public updateToDoStatus(status: string, toDo: ToDoViewModel): void {
    if (status === "toCompleted") {
      toDo.isCompleted = true;
      this.toDoService.update(toDo.id, toDo).subscribe((response: any) => {});
    }

    if (status === "toInProgress") {
      toDo.isCompleted = false;
      this.toDoService.update(toDo.id, toDo).subscribe((response: any) => {});
    }
  }

  public delete(id: string): void {
    this.toDoService.delete(id).subscribe((response: any) => {
      const deleteModal = document.getElementById('deleteModal');
      
      if (deleteModal) {
        const modal = bootstrap.Modal.getOrCreateInstance(deleteModal);
        modal?.hide();
      }
      
      document.body.classList.remove('modal-open');
      document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
      window.location.reload();
    });
  }
}
