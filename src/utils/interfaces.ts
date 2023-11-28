import { EmotionValues } from "@app/screens/create-entry";

interface UserProfile {
  name?: string;
  deviceTokens?: string[];
  profileUri?: string;
  lenguagePreference?: string;
  birthDate?: Date;
  musicGenres?: string[]
  email?: string;
  achievements?: {
    achievementId: string;
    notified: boolean;
    dateWon: Date;
  }
}

interface JournalEntry {
  _id?: number;
  userEmail: string;
  title: string;
  description: string;
  question?: string;
  response?: string;
  emotion: EmotionValues;
  createdAt?: Date
}

interface Emotions {
  type: string;
  total: number;
  week: number;
  day: number;
}

interface Criteria {
  emotions: Emotions[];
  totalJournals: number;
  perWeekJournals: number;
  perDayJournals: number;
  totalAnsweredQuestions: number;
}

interface Achievements {
  _id: string;
  name: string;
  description: string;
  image: string;
  criteria: Criteria;
}

export type { UserProfile, JournalEntry, Achievements }