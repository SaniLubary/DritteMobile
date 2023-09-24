import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../../App';
import { UserProfile } from '../../utils/interfaces';
import { getUser } from '../../services/user-service';
import { ProfileCreationProvider } from '../../context/profile-creation-context';
import ProfileCreationFlowButtons from '../../components/profile-creation-flow-buttons';
import getQuestions, { Question } from './getQuestions';

export const ProfileCreation = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const { user } = useAuth0();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [dbUser, setDbUser] = useState<UserProfile>();

  useEffect(() => {
    (async function () {
      user?.email && setDbUser(await getUser(user?.email))
    })()
  }, []);

  useEffect(() => {
    setCurrentQuestionIndex(0);
  }, []);

  const questions = useMemo<Question[]>(() => {
    console.log("Trying to set up questions...")
    console.log("Using dbUser: ", dbUser)
    return dbUser ? getQuestions(dbUser, t) : []
  }, [dbUser]);
  const currentQuestion = questions[currentQuestionIndex] ? questions[currentQuestionIndex] : null

  if (dbUser && questions.length === 0) {
    navigate('Home')
  }

  return (
    <ProfileCreationProvider>
      {currentQuestion &&
        <View style={styles.container}>
          {currentQuestion.image}

          <Text style={styles.title}>
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
