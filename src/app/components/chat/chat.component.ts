import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal  } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  answer: any = '';

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.apiService.get<any>('559041ee-0318-4c65-a185-20d62d735cd7').subscribe({
      next: (data) => 
      {
        console.log("api data:", data.chat.answer)
        const raw = data.chat.answer;
        this.answer = this.extractAnswerText(raw);
        // this.answer = data.chat.answer;
    },
      error: (err) => console.error('Error:', err),
    });
  }

  extractAnswerText(raw: string): string {
    // Remove <answer> tags
    return raw.replace(/<\/?answer>/g, '').trim();
  }
}
