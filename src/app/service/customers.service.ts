import { Injectable } from '@angular/core';
import { user } from '../interface/customers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  userURL: string;

  constructor( private http: HttpClient) { 
    this.userURL = 'https://jsonplaceholder.typicode.com/users';
  }

  getUser(): Observable<user[]> {
    return this.http.get<user[]>(`${this.userURL}`);
  } 

  getSingleUser(id: number): Observable<user>{
    return this.http.get<user>(`${this.userURL}/${id}`)
  }

}

