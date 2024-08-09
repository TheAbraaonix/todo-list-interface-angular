import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-to-do',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-to-do.component.html',
  styleUrl: './create-to-do.component.css'
})
export class CreateToDoComponent {
  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null, [Validators.required])
  });
  
  constructor() { }

  public createToDo(): void {
    console.log(this.formulario);
  }
}
