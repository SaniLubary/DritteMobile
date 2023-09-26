import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ProfileCreationContext } from '../context/profile-creation-context';
import { saveUserProfile } from '../services/user-service';
import { useAuth0 } from 'react-native-auth0';
import Button from './atoms/button';

const ProfileCreationFlowButtons = ({ questions, title, currentQuestionIndex, setCurrentQuestionIndex, navigate }) => {
  const { t } = useTranslation();
  const { isAnswered, localUser } = useContext(ProfileCreationContext);
  const { user } = useAuth0()

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (localUser?.name
        && localUser?.birthDate
        && localUser?.lenguagePreference?.length
        && localUser?.lenguagePreference?.length > 0
        && localUser?.musicGenres
        && localUser?.musicGenres.length > 0
      ) {
        user?.email && await saveUserProfile({ ...localUser, email: user.email })
        navigate('Home');
      } else {
        console.log("Error saving user profile with data: ", localUser)
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <View>
      <Button disabled={!isAnswered(title)} onPress={handleNextQuestion} title={t('profileCreation:next')} />
      {currentQuestionIndex > 0 && <Button onPress={handlePrevQuestion} title={t('profileCreation:prev')} />}
    </View>
  )
}

export default ProfileCreationFlowButtons