interface UserProfile {
  name: string;
  profileUri: string;
  pronouns: string[];
  lenguagePreference: string;
  birthDate: Date;
  musicGenres: string[]
}

export type { UserProfile }