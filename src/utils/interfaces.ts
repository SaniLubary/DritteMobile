interface UserProfile {
  name?: string;
  profileUri?: string;
  lenguagePreference?: string;
  birthDate?: Date;
  musicGenres?: string[]
  email?: string;
}

interface JournalEntry {
  _id: number;
  userEmail: string;
  title: string;
  description: string;
  emotion: string;
  createdAt: Date
}

export type { UserProfile, JournalEntry }