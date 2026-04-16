export type Page = 'login' | 'dashboard' | 'analysis' | 'history' | 'settings';

export interface Paper {
  id: string;
  title: string;
  uploadDate: string;
  status: 'analyzing' | 'completed' | 'failed';
  summary?: string;
  insights?: string[];
  gaps?: string[];
  futureIdeas?: string[];
}
