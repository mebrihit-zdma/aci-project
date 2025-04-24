import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../../services/api.service';
import { ChatHistory } from '../../../models/chat.model';
import { extractAnswerText, convertMarkdown, extractSources } from '../../../utils/chat-utils';
import { AnswerSource, ChatMessage } from '../../../models/chat.model';


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
  messages: ChatMessage[] = [];

  constructor(private apiService: ApiService, private sanitizer: DomSanitizer){}
  
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
  // selectChat(chatId: string) {
  //   this.apiService.getSelectedQuestion<any>(chatId).subscribe({
  //     next: (data) => {
  //       this.selectedQuestion = data.chat?.question;
  //       console.log("selectedQuestion:", this.selectedQuestion);
  //     },
  //     error: (err) => console.error("Error loading chat:", err),
  //   });
  // }

  selectChat(chatId: string) {
    this.apiService.getSelectedQuestion<any>(chatId).subscribe({
      next: async (data) => {
        const raw = data.chat.answer;
        const question = data.chat?.question;
        console.log("question:", question);
        console.log("raw:", raw);
        const extractAnswer = extractAnswerText(raw);
        const safeAnswer = await convertMarkdown(extractAnswer, this.sanitizer);
        let answerSource: AnswerSource[] = extractSources(raw); 
        
        this.messages.push({ sender: 'user', text:question });
        this.messages.push({ 
          sender: 'bot', 
          text: safeAnswer, 
          sources: answerSource 
         });
      },
      error: (err) => console.error("Error loading chat:", err),
    });
  }
  
}
