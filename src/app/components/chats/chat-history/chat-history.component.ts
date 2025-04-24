import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ChatHistory } from '../../../models/chat.model';

@Component({
  selector: 'app-chat-history',
  standalone:true,
  imports: [],
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css'
})
export class ChatHistoryComponent {
  selectedQuestion: string | null = null;
  chatHistory: ChatHistory[] = [];

  constructor(private apiService: ApiService){}
  
  userId: string = "get_all_chats";
 
  getChatHistory(userId: string) {
    this.apiService.get<any>(userId).subscribe({
      next: (data) => {
        data.forEach((item: { chat: { question: string }, chat_id: string }) => {
          const question = item.chat?.question || "";
          const chatId = item.chat_id;
          this.chatHistory.push({ question, chatId });
        });
      },
      error: (err) => console.error('Error:', err),
    });
  }
  
  ngOnInit() {
    this.getChatHistory(this.userId);
  }
  // selected question from chat history
  selectChat(chatId: string) {
    this.apiService.getSelectedQuestion<any>(chatId).subscribe({
      next: (data) => {
        this.selectedQuestion = data.chat?.question;
        console.log("selectedQuestion:", this.selectedQuestion);
      },
      error: (err) => console.error("Error loading chat:", err),
    });
  }
}
