import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { locallyRetrieveUserProfile } from '../services/local-user-profile-service';
import { UserProfile } from '../utils/interfaces';
import { ProfileCreationContext } from '../context/profile-creation-context';

const NameInput = ({ title, setUserProfile }: {
  title: string, setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>
}) => {
  const { user } = useAuth0();
  const [text, setText] = useState(user ? user.givenName : '');
  const { answered, unanswered } = useContext(ProfileCreationContext)

  useEffect(() => {
    (async () => {
      const userProfile: UserProfile = await locallyRetrieveUserProfile()
      if (userProfile) {
        setText(userProfile.name)
        answered(title)
      }
    })()
  }, [])

  const onChangeText = (newText: string) => {
    setUserProfile((userProfile) => (userProfile && { ...userProfile, name: newText }))
    setText(newText);

    if (newText !== '') {
      answered(title)
    } else {
      unanswered(title)
    }
  }

  return (
    <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 180,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
});

export default NameInput