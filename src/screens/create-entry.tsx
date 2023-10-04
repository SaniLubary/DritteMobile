import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Button from '../components/atoms/button';
import { Navigation } from '../App';
import { useTranslation } from 'react-i18next';
import Text from '../components/atoms/text';
import { getUser, saveUserProfile } from '../services/user-service';
import { useAuth0 } from 'react-native-auth0';
import { locallyRetrieveUserProfile } from '../services/local-user-profile-service';

type Emotion = {
  label: string;
  value: string;
}
const emotions: Emotion[] = [
  { label: '😃', value: 'happy' },
  { label: '😢', value: 'sad' },
  { label: '😡', value: 'angry' },
  { label: '😍', value: 'love' },
  { label: '😐', value: 'neutral' },
];

const CreateEntry = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>();
  const [error, setError] = useState<string>('');
  const { user } = useAuth0()

  const validateForm = () => {
    if (!title) {
      setError(t('create-entry.title-required'));
      return false;
    }
    if (!description) {
      setError(t('create-entry.description-required'));
      return false;
    }
    if (!selectedEmotion) {
      setError(t('create-entry.emotion-required'));
      return false;
    }
    setError('')
    return true
  }

  useEffect(() => {
    validateForm()
  }, [title, description, selectedEmotion])

  const handleFormSubmit = () => {
    if (!validateForm() || !selectedEmotion) return

    user?.email && getUser(user?.email).then((dbUser) => {
      if (dbUser) {
        const newJournalEntry = { title, description, emotion: selectedEmotion.value }
        user?.email && saveUserProfile({ ...dbUser, journalEntries: [...dbUser.journalEntries, newJournalEntry] })
          .then((result) => {
            result && navigation.navigate('MainScreen')
          }).catch(err => console.error("Error saving user profile with new entry", err))
      } else {
        console.error("Validation Error saving user profile with data: ", dbUser, title, description, selectedEmotion.value,)
      }
    })
  };

  return (
    <View style={styles.container}>
      <Text variant='normal'>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setTitle(text)}
        value={title}
        placeholder="Enter title"
      />

      <Text variant='normal'>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setDescription(text)}
        value={description}
        placeholder="Enter description"
        multiline={true}
        numberOfLines={4}
      />

      <Text variant='normal'>Emotion</Text>
      <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between' }}>
        {emotions.map(emotion => {
          return (
            <TouchableOpacity
              key={emotion.value}
              style={{ backgroundColor: selectedEmotion && emotion.value === selectedEmotion.value ? 'green' : 'white' }}
              onPress={() => {
                setSelectedEmotion(emotion)
              }}
            >
              <Text variant='title'>{emotion.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <Text variant='title' style={{ color: 'red' }}>{error}</Text>

      <Button title="Submit" variant={error !== '' ? 'disabled' : 'primary'} onPress={handleFormSubmit} />
      <Button title={t('createEntry:backButton')} onPress={() => navigation.navigate('MainScreen')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    marginTop: 4,
  },
});


export default CreateEntry;
