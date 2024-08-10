import { Injectable } from "@angular/core";
import { ToDoInputModel } from "../models/toDo-input-model";
import { map, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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
}