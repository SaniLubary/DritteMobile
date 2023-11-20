import React from 'react';
import BrittaNice from '../../assets/britta-2-full-bodie'

import NameInput from '../../components/molecules/name-input';
import MultipleSelectPillsInput from '../../components/molecules/multiple-select-pills-input';
import BirthdayInput from '../../components/molecules/birthday-input';
import { UserProfile } from '../../utils/interfaces';
import { TFunction } from 'i18next';

export interface Question {
  title: string;
  question: string;
  input: React.JSX.Element;
  image: React.JSX.Element;
}

export default function getQuestions(
  user: UserProfile,
  t: TFunction<"translation", undefined>
) {
  const pillsLenguage = ['español', 'english'];

  const questions: Question[] = []

  console.log("Setting up questions...", user)

  if (!user.lenguagePreference) {
    console.log("Setting question lenguage preference...")
    questions.push({
      title: 'lenguageQuestion',
      question: t('profileCreation:lenguageQuestion'),
      input: <MultipleSelectPillsInput title={'lenguageQuestion'} pickOne propertyUpdated='lenguagePreference' pillsData={pillsLenguage} />,
      image: <BrittaNice />
    })
  }
  
  if (!user.name) {
    console.log("Setting question name...")
    questions.push({
      title: 'nameQuestion',
      question: t('profileCreation:nameQuestion'),
      input: <NameInput title={'nameQuestion'} />,
      image: <BrittaNice />
    })
  }
  
  if (!user.birthDate) {
    console.log("Setting question birthday...")
    questions.push({
      title: 'birthdayQuestion',
      question: t('profileCreation:birthdayQuestion'),
      input: <BirthdayInput title={'birthdayQuestion'} />,
      image: <BrittaNice />
    })
  }

  return questions
}