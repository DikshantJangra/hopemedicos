export interface Update {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'celebration' | 'health-tip' | 'announcement' | 'community' | 'awareness';
  author: string;
  date: string;
  imageUrl?: string;
  featured?: boolean;
  tags?: string[];
}

export interface UpdateCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}
