import React, { createContext, useState } from 'react';
import { UserProfile } from '../utils/interfaces';

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
  setUser: () => { }
}

const UserContext = createContext<{ user: UserProfile, setUser: React.Dispatch<React.SetStateAction<UserProfile>> }>(mockUserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(mockUser);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
