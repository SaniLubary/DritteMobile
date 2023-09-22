import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, View } from 'react-native';
import { ProfileCreationContext } from '../context/profile-creation-context';

const ProfileCreationFlowButtons = ({ title, handleNextQuestion, currentQuestionIndex, handlePrevQuestion }) => {
  const { t } = useTranslation();
  const { isAnswered } = useContext(ProfileCreationContext);

  return (
    <View>
      <Button disabled={isAnswered(title)} onPress={handleNextQuestion} title={t('profileCreation:next')} />
      {currentQuestionIndex > 0 && <Button onPress={handlePrevQuestion} title={t('profileCreation:prev')} />}
    </View>
  )
}

export default ProfileCreationFlowButtons