import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, TextInput } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { ProfileCreationContext } from '../context/profile-creation-context';

const NameInput = ({ title }: {
  title: string
}) => {
  const { user } = useAuth0();
  const [text, setText] = useState('');
  const { answered, unanswered, localUser, setLocalUser } = useContext(ProfileCreationContext)

  useEffect(() => {
    if (localUser && localUser.name) {
      console.log("Getting name from local user", localUser)
      setText(localUser.name)
    } else if (user?.givenName) {
      console.log("Getting name from auth0 user", user)
      setText(user?.givenName)
    }
  }, [])

  useEffect(() => {
    if (text !== '') {
      setLocalUser((prevLocalUser) => {
        console.log("Saving local user name with name: ", text, "For local user", prevLocalUser)
        return prevLocalUser ? { ...prevLocalUser, name: text } : { name: text }
      })
      answered(title)
    }
  }, [text])

  const onChangeText = (newText: string) => {
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