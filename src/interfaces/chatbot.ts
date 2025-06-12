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
export interface ITorreSearchParams {
  "skill/role"?: {
    text: string;
    experience?: string;
    proficiency?: string;
  }[];
  location?: { term: string };
  remoter?: { term: boolean };
  compensation?: { minAmount: number; currency: string };
  languages?: { language: string; fluency: string }[];
  organization?: { term: string };
  theme?: string;
  context?: {
    contextFeature: "candidate";
    nyax?: boolean;
  };
}
