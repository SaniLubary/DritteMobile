import React, { ReactElement, createContext, useState } from 'react';
import { JournalEntry, UserProfile } from '../utils/interfaces';
import { getJournals } from '../services/journal-service';

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
  setJournals: () => { },
  setDbUser: () => {},
  dbUser: undefined,
  searchJournals: () => {}
}

const UserContext = createContext<{
  user: UserProfile, 
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>, 
  journals: JournalEntry[],
  setJournals: React.Dispatch<React.SetStateAction<JournalEntry[]>>,
  setDbUser: React.Dispatch<React.SetStateAction<UserProfile | undefined>>,
  dbUser: UserProfile | undefined,
  searchJournals: () => void
}>(mockUserContext);

const UserProvider = ({ children }: {children: ReactElement}) => {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [dbUser, setDbUser] = useState<UserProfile>();
  const [journals, setJournals] = useState<JournalEntry[]>([]);

  const searchJournals = () => {
    if (dbUser?.email) {
      getJournals(dbUser.email).then((journals):any => {
        console.log("Got journals! -> ", journals)
        journals.reverse()
        setJournals(journals)
      }).catch((err) => console.log('Journals not found: ', err))
    }
  }
  
  return (
    <UserContext.Provider value={{ user, setUser, journals, setJournals, dbUser, setDbUser, searchJournals }}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
