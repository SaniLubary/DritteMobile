import React from 'react';
import BrittaSad from '../../assets/britta-1-full-bodie'
import BrittaNice from '../../assets/britta-2-full-bodie'

import NameInput from '../../components/name-input';
import MultipleSelectPillsInput from '../../components/multiple-select-pills-input';
import BirthdayInput from '../../components/birthday-input';
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
  const pillsMusicGenreData = ['clasica', 'rock', 'pop', 'folk', 'r&b', 'regge', 'rap'];
  const pillsLenguage = ['español', 'english'];

  const questions: Question[] = []

  console.log("User info to set up questions...", user)

  if (!user.name) {
    questions.push({
      title: 'nameQuestion',
      question: t('profileCreation:nameQuestion'),
      input: <NameInput title={'nameQuestion'} />,
      image: <BrittaSad />
    })
  }

  if (!user.birthDate) {
    questions.push({
      title: 'birthdayQuestion',
      question: t('profileCreation:birthdayQuestion'),
      input: <BirthdayInput title={'birthdayQuestion'} />,
      image: <BrittaNice />
    })
  }

  if (!user.musicGenres || user.musicGenres.length === 0) {
    questions.push({
      title: 'musicalGenreQuestion',
      question: t('profileCreation:musicalGenreQuestion'),
      input: <MultipleSelectPillsInput title={'musicalGenreQuestion'} propertyUpdated='musicGenres' pillsData={pillsMusicGenreData} />,
      image: <BrittaNice />
    })
  }

  if (!user.lenguagePreference) {
    questions.push({
      title: 'lenguageQuestion',
      question: t('profileCreation:lenguageQuestion'),
      input: <MultipleSelectPillsInput title={'lenguageQuestion'} pickOne propertyUpdated='lenguagePreference' pillsData={pillsLenguage} />,
      image: <BrittaNice />
    })
  }

  return questions
}