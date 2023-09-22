import React, { createContext, useState } from 'react';

const initialQuestionsStatusState = [
  { title: 'profileCreation:nameQuestion', answered: false },
  { title: 'profileCreation:birthdayQuestion', answered: true },
  { title: 'profileCreation:musicalGenreQuestion', answered: false },
  { title: 'profileCreation:pronounsQuestion', answered: false },
  { title: 'profileCreation:lenguageQuestion', answered: false },
];

interface IProfileCreationContext {
  questions: {
    title: string,
    answered: boolean
  }[],
  answered: (title: string) => void,
  unanswered: (title: string) => void,
  isAnswered: (title: string) => boolean
}

const ProfileCreationContext = createContext<IProfileCreationContext>({
  questions: [{ title: '', answered: true }],
  answered: () => { },
  unanswered: () => { },
  isAnswered: () => true
});

const ProfileCreationProvider = ({ children }) => {
  const [questions, setQuestions] = useState(initialQuestionsStatusState);

  const answered = (title) => {
    const questionToUpdateIndex = questions.findIndex(question => question.title === title);
    questions[questionToUpdateIndex].answered = true;
    setQuestions([...questions])
  };

  const unanswered = (title) => {
    const questionToUpdateIndex = questions.findIndex(question => question.title === title);
    questions[questionToUpdateIndex].answered = false;
    setQuestions([...questions])
  };

  const isAnswered = (title) => {
    return !!questions.findIndex(question => question.title === title && question.answered === true)
  }

  const contextValue = {
    questions,
    answered,
    unanswered,
    isAnswered
  };

  return (
    <ProfileCreationContext.Provider value={contextValue}>{children}</ProfileCreationContext.Provider>
  );
};

export { ProfileCreationProvider, ProfileCreationContext };
