import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { todos } from '../interface/todos';
import { TodosService } from '../service/todos.service';

@Component({
  selector: 'app-todo',
  imports: [ RouterLink],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit{
  
  id: string;
  todo: any = {};

  constructor(private service: TodosService, private route: ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id') || ' ';
  }
  
  ngOnInit(): void {
    this.fetchSingleTodo();
  }

  fetchSingleTodo(){
    this.service.getSingleTodo(this.id).subscribe({next: (res: todos) =>{
      this.todo = res;
    },
    error: (err) =>{
      console.log(err);
      
    }
  })
  }
}
