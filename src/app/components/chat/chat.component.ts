import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, Input   } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { SourceCardComponent } from '../../components/cards/source-card/source-card.component';

@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [CommonModule, FormsModule, SourceCardComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  safeHtmlAnswer: SafeHtml = '';

  question: string = '';

  sources: { file_name: string, page_number: string, file_path: string }[] = []; 
  
  constructor(private apiService: ApiService, private sanitizer: DomSanitizer){}
  
  extractAnswerText(raw: string): string {
    const match = raw.match(/<answer>([\s\S]*?)<\/answer>/);
    return match ? match[1].trim() : '';
  }
  
  async convertMarkdown(md: string): Promise<SafeHtml> {
    const html = await marked(md || '');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }


  // testing
  messages: { 
    sender: 'user' | 'bot', 
    text: SafeHtml,
    sources?: { file_name: string, page_number: string, file_path: string}[] 
  }[] = [];

  inputText: string = '';

  htmlAnswer: SafeHtml = '';

  loadChat(chat_id: string) {
    this.apiService.get<any>(chat_id).subscribe({
      next: async (data) => {
        const raw = data.chat.answer;
        const extractAnswer = this.extractAnswerText(raw);
        const safeAnswer = await this.convertMarkdown(extractAnswer);
  
        this.question = data.chat.question;
        this.sources = data.source || [];
  
        this.htmlAnswer = safeAnswer;
        this.messages.push({ sender: 'user', text: this.question });
        this.messages.push({ sender: 'bot', 
          text: this.htmlAnswer, sources: this.sources 
         });
      },
      error: (err) => console.error('Error:', err),
    });
  }

  chatId: string = '';
  askQuestion(chatId : string ) {
    this.loadChat(chatId);
  }

}
