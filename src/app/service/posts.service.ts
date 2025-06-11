import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { posts } from '../interface/posts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postURL: string

  constructor(private http: HttpClient) { 
    this.postURL = 'https://jsonplaceholder.typicode.com/';
  }

  getPost(): Observable<posts[]> {
    return this.http.get<posts[]>(`${this.postURL}posts`);
  }

  getSinglePost(id: number): Observable<posts> {
    return this.http.get<posts>(`${this.postURL}posts/${id}`);
  }

  getPostsByUserId(userId: number): Observable <posts[]>{
    return this.http.get<posts[]>(`${this.postURL}posts?userId=${userId}`)
  }
}
