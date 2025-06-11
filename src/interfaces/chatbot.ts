export interface IChatbotUser {
  ardaId: number;
  username: string;
  name: string;
}

export interface IChatbotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  highlightedUsers?: string[];
}
