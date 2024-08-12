import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../services/toDoService';
import { ToDoInputModel } from '../models/toDo-input-model';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToDoViewModel } from '../models/toDo-view-model';

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
  
  constructor(private toDoService: ToDoService) { }
  
  ngOnInit(): void {
    this.toDoService.getAll().subscribe((response: any) => {
      this.toDos = response;
    });
  }
}
