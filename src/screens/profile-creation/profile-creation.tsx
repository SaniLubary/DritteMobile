import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../../App';
import { UserProfile } from '../../utils/interfaces';
import { getUser } from '../../services/user-service';
import { ProfileCreationProvider } from '../../context/profile-creation-context';
import ProfileCreationFlowButtons from '../../components/molecules/profile-creation-flow-buttons';
import getQuestions, { Question } from './get-questions';
import {TextCustom as Text} from '../../components/atoms/text';
import Spinner from '../../components/atoms/spinner';

export const ProfileCreation = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dbUser, setDbUser] = useState<UserProfile>();
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);

  useEffect(() => {
    (async function () {
      const dbUserRetrieved = user?.email && await getUser(user?.email)
      if (dbUserRetrieved) {
        setDbUser(dbUserRetrieved)
        return
      }
      console.log("Navigating to Home page from ProfileCreation...")
      navigate('MainScreen')
    })()
  }, []);

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, []);

  const questions = useMemo<Question[]>(() => {
    if (!dbUser) {
      return []
    }
    console.log("Trying to set up questions...")
    console.log("Using dbUser: ", dbUser)
    const questions = dbUser ? getQuestions(dbUser, t) : []
    setLoadingQuestions(false)
    return questions
  }, [dbUser]);

  const currentQuestion = questions[currentQuestionIndex] ? questions[currentQuestionIndex] : null

  if (loadingQuestions) {
    return <View><Spinner /></View>
  }

  if (!loadingQuestions && !currentQuestion) {
    navigate('MainScreen');
  }

  return (
    <ProfileCreationProvider>
      {currentQuestion &&
        <View style={styles.container}>
          {currentQuestion.image}

          <Text variant='title'>
            {currentQuestion.question}
          </Text>

          {currentQuestion?.input}

          <ProfileCreationFlowButtons
            title={currentQuestion.title}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            currentQuestionIndex={currentQuestionIndex}
            navigate={navigate}
            questions={questions}
          />
        </View>
      }
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
