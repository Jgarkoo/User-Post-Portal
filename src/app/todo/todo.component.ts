import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { todos } from '../interface/todos';
import { TodosService } from '../service/todos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo',
  imports: [ RouterLink],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnDestroy, OnInit{
  
  id: string | undefined;
  todo: any = {};
  subscription = new Subscription();

  private service = inject(TodosService);
  private route = inject(ActivatedRoute);

  
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || ' ';
    this.fetchSingleTodo();
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  fetchSingleTodo(){
    const todoSub = this.service.getSingleTodo(this.id).subscribe({
      next: (res: todos) =>{
        this.todo = res;
      },
      error: (err) =>{
        console.log(err);
      }
    })
  this,this.subscription.add(todoSub);
  }
  
}
