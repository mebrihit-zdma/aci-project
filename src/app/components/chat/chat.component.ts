import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, Input   } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { SourceCardComponent } from '../../components/cards/source-card/source-card.component';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [CommonModule, SourceCardComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  safeHtmlAnswer: SafeHtml = '';

  answer: SafeHtml = '';

  sources: { file_name: string, page_number: string, file_path: string }[] = []; 
  
  constructor(private apiService: ApiService, private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    // const chat_id = '559041ee-0318-4c65-a185-20d62d735cd7';
    const chat_id = 'c732cbdd-afdf-4a39-959a-661adc07cb18';
    this.apiService.get<any>(chat_id).subscribe({
      next: async (data) => {
        console.log("api data:", data.chat.answer);
        const raw = data.chat.answer;
        const extractAnswer = this.extractAnswerText(raw);
        this.safeHtmlAnswer = await this.convertMarkdown(extractAnswer);

        this.sources = data.source || [];
        console.log("this.sources:", this.sources);
      },
      error: (err) => console.error('Error:', err),
    });
  }
  
  extractAnswerText(raw: string): string {
    const match = raw.match(/<answer>([\s\S]*?)<\/answer>/);
    return match ? match[1].trim() : '';
  }
  
  async convertMarkdown(md: string): Promise<SafeHtml> {
    const html = await marked(md || '');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
