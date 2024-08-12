import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    private toDoService: ToDoService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.toDoService.getById(params["id"]).subscribe((response: ToDoViewModel) => {
        this.toDo = response;
      });
    });
  }

  public delete(): void {
    this.toDoService.delete(this.toDo.id).subscribe((response: any) => {
      alert("To-Do deleted successfully!");
      this.router.navigate(["/"]);
    });
  }
}
