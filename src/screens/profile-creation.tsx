import React, { createContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import MultipleSelectPillsInput from '../components/multiple-select-pills-input';
import BrittaSad from '../assets/britta-1-full-bodie'
import BrittaNice from '../assets/britta-2-full-bodie'
import NameInput from '../components/name-input';
import { UserProfile } from "../utils/interfaces"
import { locallyRetrieveUserProfile, locallyStoreUserProfile } from "../services/local-user-profile-service"
import BirthdayInput from '../components/birthday-input';
import { ProfileCreationProvider } from '../context/profile-creation-context';
import ProfileCreationFlowButtons from '../components/profile-creation-flow-buttons';

const pillsMusicGenreData = ['clasica', 'rock', 'pop', 'folk', 'r&b', 'regge', 'rap'];
const pillsPronounsData = ['he', 'she', 'they'];
const pillsLenguage = ['español', 'english'];

export interface Question {
  question: string;
  input: React.JSX.Element;
  image: React.JSX.Element;
}

export const ProfileCreation = ({ navigation: { navigate } }) => {
  const { t } = useTranslation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [userProfile, setUserProfile] = useState<UserProfile>();

  useEffect(() => {
    locallyStoreUserProfile(userProfile)
  }, [userProfile])

  useEffect(() => {
    (async function () { setUserProfile(await locallyRetrieveUserProfile()) })()
  }, [])

  const questions = useMemo<Question[]>(() => [
    {
      question: t('profileCreation:nameQuestion'),
      input: <NameInput title={'profileCreation:nameQuestion'} setUserProfile={setUserProfile} />,
      image: <BrittaSad />
    },
    {
      question: t('profileCreation:birthdayQuestion'),
      input: <BirthdayInput title={'profileCreation:birthdayQuestion'} setUserProfile={setUserProfile} />,
      image: <BrittaNice />
    },
    {
      question: t('profileCreation:musicalGenreQuestion'),
      input: <MultipleSelectPillsInput title={'profileCreation:musicalGenreQuestion'} propertyUpdated='musicGenres' userProfile={userProfile} pillsData={pillsMusicGenreData} setUserProfile={setUserProfile} />,
      image: <BrittaNice />
    },
    {
      question: t('profileCreation:pronounsQuestion'),
      input: <MultipleSelectPillsInput title={'profileCreation:pronounsQuestion'} propertyUpdated='pronouns' userProfile={userProfile} pillsData={pillsPronounsData} setUserProfile={setUserProfile} />,
      image: <BrittaSad />
    },
    {
      question: t('profileCreation:lenguageQuestion'),
      input: <MultipleSelectPillsInput title={'profileCreation:lenguageQuestion'} pickOne propertyUpdated='lenguagePreference' userProfile={userProfile} pillsData={pillsLenguage} setUserProfile={setUserProfile} />,
      image: <BrittaNice />
    },
  ], []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('Home');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate('Home');
    }
  };

  const question = questions[currentQuestionIndex]

  return (
    <ProfileCreationProvider>
      <View style={styles.container}>
        {question.image}

        <Text style={styles.title}>
          {question.question}
        </Text>

        {question.input}

        <ProfileCreationFlowButtons
          title={question.question}
          currentQuestionIndex={currentQuestionIndex}
          handleNextQuestion={handleNextQuestion}
          handlePrevQuestion={handlePrevQuestion}
        />
      </View>
    </ProfileCreationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    color: 'black',
  },
});
