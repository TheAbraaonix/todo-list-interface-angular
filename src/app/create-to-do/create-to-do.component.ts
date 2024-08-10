import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDoInputModel } from '../models/toDo-input-model';
import { ToDoService } from '../services/toDoService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-to-do',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [ToDoService, Router],
  templateUrl: './create-to-do.component.html',
  styleUrl: './create-to-do.component.css'
})
export class CreateToDoComponent {
  public router: Router = new Router();
  
  public formulario: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    priority: new FormControl(null, [Validators.required]),
  });
  
  constructor(private toDoService: ToDoService) { }

  public createToDo(): void {
    let toDo: ToDoInputModel = new ToDoInputModel();
    toDo.Name = this.formulario.get("title")!.value;
    toDo.Description = this.formulario.get("description")!.value;
    toDo.Priority = parseInt(this.formulario.get("priority")!.value);
    
    this.toDoService.create(toDo)
      .subscribe({
        next: (response: any) => {
          this.success();
        },
        error: (error: any) => {
          alert("An error occurred while creating your to do. Please, try again.");
        }
      });
  }

  public success(): void {
    this.formulario.reset();
    alert("Your to do was created successfully!");
    this.router.navigate(["/"]);
  }
}
