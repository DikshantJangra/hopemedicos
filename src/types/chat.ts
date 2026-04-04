// Chat types and interfaces

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  provider?: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface AIProvider {
  name: string;
  endpoint: string;
  apiKey: string;
  model: string;
  enabled: boolean;
  priority: number;
  rateLimit: {
    requests: number;
    window: number; // in milliseconds
  };
}

export interface AIResponse {
  content: string;
  provider: string;
  success: boolean;
  error?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  prompt: string;
}
