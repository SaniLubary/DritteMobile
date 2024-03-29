import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { UserProfile } from '../utils/interfaces';
import { locallyStoreUserProfile } from '../services/local-user-profile-service';

const initialQuestionsStatusState = [
  { title: 'nameQuestion', answered: false },
  { title: 'birthdayQuestion', answered: true },
  { title: 'musicalGenreQuestion', answered: false },
  { title: 'pronounsQuestion', answered: false },
  { title: 'lenguageQuestion', answered: false },
];

interface IProfileCreationContext {
  questions: {
    title: string,
    answered: boolean
  }[],
  answered: (title: string) => void,
  unanswered: (title: string) => void,
  isAnswered: (title: string) => boolean,
  localUser: UserProfile | undefined,
  setLocalUser: React.Dispatch<React.SetStateAction<UserProfile | undefined>>,
}

const ProfileCreationContext = createContext<IProfileCreationContext>({
  questions: [{ title: '', answered: true }],
  answered: () => { },
  unanswered: () => { },
  isAnswered: () => true,
  localUser: {},
  setLocalUser: () => { }
});

const ProfileCreationProvider = ({ children, user }: {children: ReactNode, user: UserProfile | undefined}) => {
  const [questions, setQuestions] = useState(initialQuestionsStatusState);
  const [localUser, setLocalUser] = useState<UserProfile | undefined>(user);

  useEffect(() => {
    console.log("User storing locally is", localUser)
    localUser && locallyStoreUserProfile(localUser)
  }, [localUser])

  const answered = (title: string) => {
    const questionToUpdateIndex = questions.findIndex(question => question.title === title);
    if (questions[questionToUpdateIndex]) {
      questions[questionToUpdateIndex].answered = true;
      setQuestions([...questions])
    }
  };

  const unanswered = (title: string) => {
    const questionToUpdateIndex = questions.findIndex(question => question.title === title);
    if (questions[questionToUpdateIndex]) {
      questions[questionToUpdateIndex].answered = false;
      setQuestions([...questions])
    }
  };

  const isAnswered = (title: string) => {
    return questions[questions.findIndex(question => question.title === title)].answered
  }

  const contextValue = {
    questions,
    answered,
    unanswered,
    isAnswered,
    localUser,
    setLocalUser
  };

  return (
    <ProfileCreationContext.Provider value={contextValue}>{children}</ProfileCreationContext.Provider>
  );
};

export { ProfileCreationProvider, ProfileCreationContext };
