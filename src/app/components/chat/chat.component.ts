import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Todo } from '../../model/todo.typs';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  todoService = inject(ApiService)
  todoArray = signal<Array<Todo>>([])

  ngOnInit(): void {
    // console.log("todoService", this.todoService)

    this.todoService.getFromApi()
      .pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((todos) =>{
      this.todoArray.set(todos)
    });

    console.log("todoArray", this.todoService)
    
  }


}
