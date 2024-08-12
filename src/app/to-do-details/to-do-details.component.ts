import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToDoService } from '../services/toDoService';
import { ToDoViewModel } from '../models/toDo-view-model';
import * as bootstrap from 'bootstrap'; // Import the 'bootstrap' module
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToDoInputModel } from '../models/toDo-input-model';

@Component({
  selector: 'app-to-do-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [ToDoService],
  templateUrl: './to-do-details.component.html',
  styleUrl: './to-do-details.component.css'
})
export class ToDoDetailsComponent implements OnInit {
  public toDo: ToDoViewModel = new ToDoViewModel();
  public updateForm: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private toDoService: ToDoService,
    private router: Router
  ) {
    this.updateForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required])
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.toDoService.getById(params["id"]).subscribe((response: ToDoViewModel) => {
        this.toDo = response;
        this.updateForm.setValue({
          title: this.toDo.name,
          description: this.toDo.description,
          priority: this.toDo.priority
        });
      });
    });
  }

  public delete(): void {
    this.toDoService.delete(this.toDo.id).subscribe((response: any) => {
      const deleteModal = document.getElementById('deleteModal');
      
      if (deleteModal) {
        const modal = bootstrap.Modal.getInstance(deleteModal);
        modal?.hide();
      }
      
      document.body.classList.remove('modal-open');
      document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
      this.router.navigate(['/']);
    });
  }

  public update(): void {
    let updatedToDo: ToDoInputModel = new ToDoInputModel();
    updatedToDo.name = this.updateForm.get('title')?.value;
    updatedToDo.description = this.updateForm.get('description')?.value;
    updatedToDo.priority = this.updateForm.get('priority')?.value;
    updatedToDo.isCompleted = this.toDo.isCompleted;

    this.toDoService.update(this.toDo.id, updatedToDo).subscribe({
      next: (response: any) => {
        this.toDo = response;

        const updateModal = document.getElementById('updateModal');

        if (updateModal) {
          const modal = bootstrap.Modal.getInstance(updateModal);
          modal?.hide();
        }
      },
      error: (error: any) => {
        alert('An error occurred while updating your to do. Please, try again.');
      } 
    });
  }
}
