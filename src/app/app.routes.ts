import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateToDoComponent } from './create-to-do/create-to-do.component';
import { ToDoDetailsComponent } from './to-do-details/to-do-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'create', component: CreateToDoComponent},
    {path: 'detail/:id', component: ToDoDetailsComponent}
];
