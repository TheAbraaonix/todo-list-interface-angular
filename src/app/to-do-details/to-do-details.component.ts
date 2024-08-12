import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ToDoService } from '../services/toDoService';
import { ToDoViewModel } from '../models/toDo-view-model';

@Component({
  selector: 'app-to-do-details',
  standalone: true,
  imports: [],
  providers: [ToDoService],
  templateUrl: './to-do-details.component.html',
  styleUrl: './to-do-details.component.css'
})
export class ToDoDetailsComponent implements OnInit {
  public toDo: ToDoViewModel = new ToDoViewModel();
  
  constructor(
    private route: ActivatedRoute,
    private toDoService: ToDoService
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.toDoService.getById(params["id"]).subscribe((response: ToDoViewModel) => {
        this.toDo = response;
        console.log(this.toDo);
      });
    });
  }
}
