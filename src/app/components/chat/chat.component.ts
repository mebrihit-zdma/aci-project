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

  askedQuestion: string = '';
  
  //sources
  sources: { file_name: string, page_number: string, file_path: string }[] = []; 

  // messages that display on html
  messages: { 
    sender: 'user' | 'bot', 
    text: SafeHtml,
    sources?: { file_name: string, page_number: string, file_path: string}[] 
  }[] = [];
  
  constructor(private apiService: ApiService, private sanitizer: DomSanitizer){}
 
  // get api call
  loadChat(chat_id: string) {
    this.apiService.get<any>(chat_id).subscribe({
      next: async (data) => {
        const raw = data.chat.answer;
        const extractAnswer = this.extractAnswerText(raw);
        const safeAnswer = await this.convertMarkdown(extractAnswer);
        const question = data.chat.question;

        this.sources = data.source || [];

        this.messages.push({ sender: 'user', text:question });
        this.messages.push({ sender: 'bot', 
          text: safeAnswer, sources: this.sources 
         });
      },
      error: (err) => console.error('Error:', err),
    });
  }

  // askQuestion(askedQuestion : string ) {
  //   this.loadChat(askedQuestion);
  // }

  //post api call

  askQuestion(askedQuestion : string ) {
    this.postChat(askedQuestion);
  }

  postChat(askedQuestion: string) {
    const payload = {
      app_id: '67daf330d62c5ade928150d1',
      session_id: '93bcc86e-a1a5-4d4e-a626-dc4d0c2a9377',
      user_id: '67daf330d62c5ade928150mz',
      question: askedQuestion, 
      model_name: 'openai/gpt-4o',
      source: [],
      top_k: 0,
      filter: {
        additionalProp1: 'string',
        additionalProp2: 'string',
        additionalProp3: 'string',
      },
      use_cache: true
    };
    
    this.apiService.post<any>('chat_stream', payload, 'text').subscribe({
      next: async (data) => {
        console.log("api post data mz:", data);
        const extractAnswer = this.extractAnswerText(data);
        const safeAnswer = await this.convertMarkdown(extractAnswer);
        console.log("safeAnswermz:", safeAnswer);

        this.sources = data.source || [];
  
        this.messages.push({ sender: 'user', text: askedQuestion });
        this.messages.push({ sender: 'bot', 
          text: safeAnswer, sources: this.sources 
         });
      },
      error: (err) => console.error('Error:', err),
    });
  }

  //helper functions
  extractAnswerText(raw: string): string {
    const match = raw.match(/<answer>([\s\S]*?)<\/answer>/);
    return match ? match[1].trim() : '';
  }
  
  async convertMarkdown(md: string): Promise<SafeHtml> {
    const html = await marked(md || '');
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  
  
}
