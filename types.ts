
export type Mood = 'peaceful' | 'heavy' | 'scattered' | 'quiet' | 'anxious' | 'none';

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  mood: Mood;
  gratitude: string;
}

export interface AIInsight {
  text: string;
  timestamp: string;
}

export enum View {
  LOGIN = 'login',
  HOME = 'home',
  WRITE = 'write',
  PAUSE = 'pause',
  REFLECT = 'reflect',
  ARCHIVE = 'archive'
}
