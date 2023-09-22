import React, { createContext, useState } from 'react';

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
    if (questions[questionToUpdateIndex]) {
      questions[questionToUpdateIndex].answered = true;
      setQuestions([...questions])
    }
  };

  const unanswered = (title) => {
    const questionToUpdateIndex = questions.findIndex(question => question.title === title);
    if (questions[questionToUpdateIndex]) {
      questions[questionToUpdateIndex].answered = false;
      setQuestions([...questions])
    }
  };

  const isAnswered = (title) => {
    return questions[questions.findIndex(question => question.title === title)].answered
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
