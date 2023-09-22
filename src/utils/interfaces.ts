interface UserProfile {
  name: string;
  profileUri: string;
  pronouns: string[];
  lenguagePreference: string;
  birthDate: Date;
  musicGenres: string[]
  email: string;
}

export type { UserProfile }