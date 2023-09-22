import React, { useEffect, useMemo, useState } from 'react';
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
import { saveUserProfile } from '../services/user-service'
import { useAuth0 } from 'react-native-auth0';

const pillsMusicGenreData = ['clasica', 'rock', 'pop', 'folk', 'r&b', 'regge', 'rap'];
const pillsPronounsData = ['he', 'she', 'they'];
const pillsLenguage = ['español', 'english'];

export interface Question {
  title: string;
  question: string;
  input: React.JSX.Element;
  image: React.JSX.Element;
}

export const ProfileCreation = ({ navigation: { navigate } }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();

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
      title: 'nameQuestion',
      question: t('profileCreation:nameQuestion'),
      input: <NameInput title={'nameQuestion'} setUserProfile={setUserProfile} />,
      image: <BrittaSad />
    },
    {
      title: 'birthdayQuestion',
      question: t('profileCreation:birthdayQuestion'),
      input: <BirthdayInput title={'birthdayQuestion'} setUserProfile={setUserProfile} />,
      image: <BrittaNice />
    },
    {
      title: 'musicalGenreQuestion',
      question: t('profileCreation:musicalGenreQuestion'),
      input: <MultipleSelectPillsInput title={'musicalGenreQuestion'} propertyUpdated='musicGenres' userProfile={userProfile} pillsData={pillsMusicGenreData} setUserProfile={setUserProfile} />,
      image: <BrittaNice />
    },
    {
      title: 'pronounsQuestion',
      question: t('profileCreation:pronounsQuestion'),
      input: <MultipleSelectPillsInput title={'pronounsQuestion'} propertyUpdated='pronouns' userProfile={userProfile} pillsData={pillsPronounsData} setUserProfile={setUserProfile} />,
      image: <BrittaSad />
    },
    {
      title: 'lenguageQuestion',
      question: t('profileCreation:lenguageQuestion'),
      input: <MultipleSelectPillsInput title={'lenguageQuestion'} pickOne propertyUpdated='lenguagePreference' userProfile={userProfile} pillsData={pillsLenguage} setUserProfile={setUserProfile} />,
      image: <BrittaNice />
    },
  ], []);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      user && saveUserProfile({ ...userProfile, email: user.email })
      navigate('Home');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
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
          title={question.title}
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
