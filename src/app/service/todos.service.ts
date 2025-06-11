import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { todos } from '../interface/todos';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todoURL: string

  constructor(private http: HttpClient) {
    this.todoURL = 'https://jsonplaceholder.typicode.com/';
  }

  getSingleTodo(id: any): Observable<todos> {
    return this.http.get<todos>(`${this.todoURL}todos/${id}`);
  }
}
