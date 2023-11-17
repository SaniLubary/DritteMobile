import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../../App';
import { getUser } from '../../services/user-service';
import { ProfileCreationProvider } from '../../context/profile-creation-context';
import ProfileCreationFlowButtons from '../../components/molecules/profile-creation-flow-buttons';
import getQuestions, { Question } from './get-questions';
import { TextCustom as Text } from '../../components/atoms/text';
import Spinner from '../../components/atoms/spinner';
import { locallyRetrieveUserProfile, locallyStoreUserProfile } from '../../services/local-user-profile-service';
import { UserProfile } from '@app/utils/interfaces';

export const ProfileCreation = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [localUser, setLocalUser ] = useState<UserProfile>()

  useEffect(() => {
    (async function () {
      let userToUse
      userToUse = await locallyRetrieveUserProfile()
      if (!userToUse?.birthDate && !userToUse?.name && !userToUse?.lenguagePreference) {
        userToUse = user?.email && await getUser(user?.email)
      }

      if(userToUse !== '') {
        console.log("Trying to set up questions...")
        console.log("Using localUser: ", userToUse)
        const questions = userToUse ? getQuestions(userToUse, t) : []
        setQuestions(questions)
        console.log("Questions", questions)
        
        setLocalUser(userToUse)
        userToUse && locallyStoreUserProfile(userToUse)
        setLoadingQuestions(false)
      }
    })()
  }, []);

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex] ? questions[currentQuestionIndex] : null)
  }, [questions, currentQuestionIndex])


  if (loadingQuestions) {
    return <View style={{ flex:1 }}><Spinner /></View>
  }

  return (
    <ProfileCreationProvider user={localUser}>
      {currentQuestion ?
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
        : <></>}
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
