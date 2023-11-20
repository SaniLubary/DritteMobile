import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { ProfileCreationContext } from '../../context/profile-creation-context';
import { saveUserProfile } from '../../services/user-service';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../../App';
import { Question } from '../../screens/profile-creation/get-questions';
import Arrow from '../../assets/icons/arrow'

const ProfileCreationFlowButtons = ({ questions, title, currentQuestionIndex, setCurrentQuestionIndex, navigate }: {
  questions: Question[], title: string, currentQuestionIndex: number, setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>, navigate: Navigation['navigate']
}) => {
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
      ) {
        user?.email && saveUserProfile({ ...localUser, email: user.email }).then((result) => {
          console.log('User fully created', result)
          result ? navigate('MainScreen') : navigate('LogIn');
        })
      } else {
        console.log("Validation Error saving user profile with data: ", localUser)
      }
    }
  };

  return (
      <Arrow color={!isAnswered(title) ? '#838383' : '#D32455'} disabled={!isAnswered(title)} onPress={handleNextQuestion}/>
  )
}

export default ProfileCreationFlowButtons