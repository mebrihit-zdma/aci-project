import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, Input   } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  safeHtmlAnswer: SafeHtml = '';

  answer: any= '' ;

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    this.apiService.get<any>('559041ee-0318-4c65-a185-20d62d735cd7').subscribe({
      next: async (data) => {
        console.log("api data:", data.chat.answer);
        const raw = data.chat.answer;
        const extractAnswer = this.extractAnswerText(raw);
        
        this.safeHtmlAnswer = await this.convertMarkdown(extractAnswer);
      },
      error: (err) => console.error('Error:', err),
    });
  }
  
  extractAnswerText(raw: string): string {
    return raw.replace(/<\/?answer>/g, '').trim();
  }
  
  async convertMarkdown(md: string): Promise<SafeHtml> {
    const html = await marked(md || '');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
