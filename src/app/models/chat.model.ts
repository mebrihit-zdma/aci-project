// chat.model.ts
export interface AnswerSource {
    fileName: string;
    pageNumber: string;
    url: string;
}
  
export interface ChatMessage {
    sender: 'bot' | 'user';
    html: any;
    sources?: AnswerSource[];
}