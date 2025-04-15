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
export class ChatComponent implements OnInit {

  safeHtmlAnswer: SafeHtml = '';

  question: string = '';

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
        this.question = data.chat.question;
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


  // testing
  messages: { sender: 'user' | 'bot', text: string }[] = [];
  // messages: { sender: 'user' | 'bot', text?: string, html?: SafeHtml }[] = [];
  
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
  
        // Show in chat
        this.messages.push({ sender: 'user', text: this.question });
        this.messages.push({ sender: 'bot', text: extractAnswer });
        // this.messages.push({ sender: 'user', text: this.question });
        // this.messages.push({ sender: 'bot', html: safeAnswer }); 

  
        // Optionally store the safe HTML separately if you're rendering markdown/HTML
        this.htmlAnswer = safeAnswer;
      },
      error: (err) => console.error('Error:', err),
    });
  }

  chatId: string = '';
  askQuestion(chatId : string ) {
    this.loadChat(chatId);
  }

}
