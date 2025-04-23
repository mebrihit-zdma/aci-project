import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { extractAnswerText, convertMarkdown, extractSources } from '../../../utils/chat-utils';
import { AnswerSource, ChatMessage, ChatHistory } from '../../../models/chat.model';

@Component({
  selector: 'app-chat-history',
  standalone:true,
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css'
})
export class ChatHistoryComponent {

  chatHistory: ChatHistory[] = [];

  constructor(private apiService: ApiService){}
  
  userId: string = "get_all_chats";
 
  getChatHistory(userId: string) {
    this.apiService.get<any>(userId).subscribe({
      next: (data) => {
        console.log("data history:", data);
        data.forEach((item: { chat: { question: string }, chat_id: string }) => {
          const question = item.chat?.question || "";
          const chatId = item.chat_id;
          this.chatHistory.push({ question, chatId });
        });
        console.log("chatHistory:", this.chatHistory);
      },
      error: (err) => console.error('Error:', err),
    });
  }
  
  ngOnInit() {
    this.getChatHistory(this.userId);
  }

   
}
