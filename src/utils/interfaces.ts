interface UserProfile {
  name?: string;
  deviceTokens?: string[];
  profileUri?: string;
  lenguagePreference?: string;
  birthDate?: Date;
  musicGenres?: string[]
  email?: string;
}

interface JournalEntry {
  _id?: number;
  userEmail: string;
  title: string;
  description: string;
  question?: string;
  response?: string;
  emotion: string;
  createdAt?: Date
}

export type { UserProfile, JournalEntry }