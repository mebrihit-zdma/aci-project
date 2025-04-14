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

  title = '';

  constructor(private api: ApiService){}

  ngOnInit(): void {
    this.api.getApiCall().subscribe({
      next: (data) => {
        console.log("API Data:", data);
        this.title = data['title'];
      },
      error: (err) => {
        console.error('API call failed:', err);
      }
    });
  }
}
