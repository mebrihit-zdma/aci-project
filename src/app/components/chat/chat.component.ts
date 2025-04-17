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
  // ngOnInit(): void {
  //   const chat_id = 'c732cbdd-afdf-4a39-959a-661adc07cb18';
  //   this.apiService.get<any>(chat_id).subscribe({
  //     next: async (data) => {
  //       console.log("api data:", data.chat.answer);
  //       const raw = data.chat.answer;
  //       const extractAnswer = this.extractAnswerText(raw);
  //       this.safeHtmlAnswer = await this.convertMarkdown(extractAnswer);
  //       this.question = data.chat.question;
  //       this.sources = data.source || [];
  //       console.log("this.sources:", this.sources);
  //     },
  //     error: (err) => console.error('Error:', err),
  //   });
  // }
  
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

  //post
  ngOnInit(): void {
    const payload = {
      app_id: '67daf330d62c5ade928150d1',
      session_id: '93bcc86e-a1a5-4d4e-a626-dc4d0c2a9377',
      user_id: '67daf330d62c5ade928150mz',
      question: 'How do I setup automated payment entry in ACI Payment Hub?', 
      // question: this.inputText, 
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
        console.log("api post data:", data);
        const extractAnswer = this.extractAnswerText(data);
        console.log("extractAnswer", extractAnswer);
        this.safeHtmlAnswer = await this.convertMarkdown(extractAnswer);
        console.log("safeHtmlAnswer", this.safeHtmlAnswer);
        this.question = "testing mz";
      },
      error: (err) => console.error('Error:', err),
    });
  }

}
