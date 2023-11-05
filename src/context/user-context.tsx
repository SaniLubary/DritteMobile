import React, { createContext, useState } from 'react';
import { JournalEntry, UserProfile } from '../utils/interfaces';

const mockUser = {
  name: '',
  birthDate: new Date(),
  email: '',
  lenguagePreference: '',
  musicGenres: [],
  profileUri: ''
}

const mockUserContext = {
  user: mockUser,
  setUser: () => { },
  journals: [],
  setJournals: () => { }
}

const UserContext = createContext<{
  user: UserProfile, setUser: React.Dispatch<React.SetStateAction<UserProfile>>, journals: JournalEntry[], setJournals: React.Dispatch<React.SetStateAction<JournalEntry[]>>
}>(mockUserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [journals, setJournals] = useState<JournalEntry[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser, journals, setJournals }}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
