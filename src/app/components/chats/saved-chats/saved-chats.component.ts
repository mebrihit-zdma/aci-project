import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { SavedChats } from '../../../models/chat.model';

@Component({
  selector: 'app-saved-chats',
  standalone:true,
  imports: [],
  templateUrl: './saved-chats.component.html',
  styleUrl: './saved-chats.component.css'
})
export class SavedChatsComponent {
  savedChats: SavedChats[] = [];

  constructor(private apiService: ApiService){}
  
  userId: string = "get_all_chats";
 
  getSavedChats(userId: string) {
    this.apiService.get<any>(userId).subscribe({
      next: (data) => {
        data.forEach((item: { chat: { question: string }, chat_id: string }) => {
          const question = item.chat?.question || "";
          const chatId = item.chat_id;
          this.savedChats.push({ question, chatId });
        });
      },
      error: (err) => console.error('Error:', err),
    });
  }
  
  ngOnInit() {
    this.getSavedChats(this.userId);
  }
}
