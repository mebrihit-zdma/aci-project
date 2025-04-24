import { HttpClient } from '@angular/common/http';
import { Component, inject,  OnInit, signal, Input   } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { SourceCardComponent } from '../../components/cards/source-card/source-card.component';
import { AnswerSource, ChatMessage } from '../../models/chat.model';
import { extractAnswerText, convertMarkdown, extractSources } from '../../utils/chat-utils';



@Component({
  selector: 'app-chat',
  standalone:true,
  imports: [CommonModule, FormsModule, SourceCardComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  askedQuestion: string = '';
  sources: AnswerSource[] = [];
  messages: ChatMessage[] = [];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer){}
  
  // get api call
  getChat(chat_id: string) {
    this.apiService.getSelectedQuestion<any>(chat_id).subscribe({
      next: async (data) => {
        const raw = data.chat.answer;
        const extractAnswer = extractAnswerText(raw);
        const safeAnswer = await convertMarkdown(extractAnswer, this.sanitizer);
        const question = data.chat.question;

        let answerSource: AnswerSource[] = extractSources(raw); 
        
        this.messages.push({ sender: 'user', text:question });
        this.messages.push({ 
          sender: 'bot', 
          text: safeAnswer, 
          sources: answerSource 
         });
      },
      error: (err) => console.error('Error:', err),
    });
  }

  askQuestion(askedQuestion : string ) {
    const question = askedQuestion.trim();
    if (!question) return;
    this.getChat(question);
    this.askedQuestion = ''; 
  }

  //post api call
  // askQuestion(askedQuestion : string ) {
  //   const question = askedQuestion.trim();
  //   if (!question) return;
  //   this.postChat(question);
  //   this.askedQuestion = ''; 
  // }

  postChat(askedQuestion: string) {
    const payload = {
      app_id: '67daf330d62c5ade928150d1',
      session_id: 'b956506-2a95-43a2-8737-c0deb90d0b75',
      user_id: '90487389-fd4d-4951-a72c-069d7b20test',
      question: askedQuestion, 
      model_name: 'openai/gpt-4o',
      top_k: 3,
      use_cache: true
    };
    this.apiService.post<any>('chat_stream', payload, 'text').subscribe({
      next: async (data) => {
        console.log("api post data mz:", data);
        const extractAnswer = extractAnswerText(data);
        const safeAnswer = await convertMarkdown(extractAnswer, this.sanitizer);
        
        let answerSource: AnswerSource[] = extractSources(data); 
        
        this.messages.push({ sender: 'user', text: askedQuestion });
        this.messages.push({ 
          sender: 'bot', 
          text: safeAnswer, 
          sources: answerSource 
         });
      },
      error: (err) => console.error('Error:', err),
    });
  }

}
