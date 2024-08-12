import { Injectable } from "@angular/core";
import { ToDoInputModel } from "../models/toDo-input-model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToDoViewModel } from "../models/toDo-view-model";

@Injectable({
    providedIn: "root"
})
export class ToDoService {
    public urlApi: string = "https://localhost:7171/api/to-do";

    constructor(private http: HttpClient) { }
    
    public create(toDo: ToDoInputModel): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
        
        return this.http.post<ToDoInputModel>(`${this.urlApi}/CreateToDo`, toDo, { headers: headers })
            .pipe(map((response: any) => response), (error: any) => error);
    }

    public getAll(): Observable<ToDoViewModel[]> {
        return this.http.get<ToDoViewModel[]>(`${this.urlApi}/GetAllToDo`);
    }

    public getById(id: string): Observable<ToDoViewModel> {
        return this.http.get<ToDoViewModel>(`${this.urlApi}/GetToDoById/${id}`);
    }

    public delete(id: string): Observable<any> {
        return this.http.delete(`${this.urlApi}/DeleteToDo/${id}`);
    }

    public update(id: string, toDo: ToDoInputModel): Observable<ToDoViewModel> {
        let headers: HttpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });
        
        return this.http.put<ToDoViewModel>(`${this.urlApi}/UpdateToDo/${id}`, toDo, { headers: headers })
            .pipe(map((response: any) => response), (error: any) => error);
    }
}