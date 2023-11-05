import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { Button } from '../components/atoms/button';
import { Navigation } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { getUser } from '../services/user-service';
import { getJournalEmotionFeedback, saveJournalEntry } from '../services/journal-service';
import { useAuth0 } from 'react-native-auth0';
import { RouteProp } from '@react-navigation/native';

export type Emotion = {
  emoji: any;
  value: string;
}

type size = 'small' | 'normal'

const selectEmojiSize = (size: size) => size === 'small' ? { width: 60, height: 50 } : { width: 100, height: 80 }

export const emotions: Emotion[] = [
  { emoji: (size: size) => <Image style={selectEmojiSize(size) } source={require('../assets/emojis/mad.png')} />, value: 'angry' },
  { emoji: (size: size) => <Image style={selectEmojiSize(size)} source={require('../assets/emojis/sad.png')} />, value: 'sad' },
  { emoji: (size: size) => <Image style={selectEmojiSize(size)} source={require('../assets/emojis/neutral.png')} />, value: 'neutral' },
  { emoji: (size: size) => <Image style={selectEmojiSize(size)} source={require('../assets/emojis/happy.png')} />, value: 'happy' },
  { emoji: (size: size) => <Image style={selectEmojiSize(size)} source={require('../assets/emojis/extra-happy.png')} />, value: 'love' },
];

const CreateEntry = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>();
  const [emotionFeedback, setEmotionFeedback] = useState<Emotion>();
  const [error, setError] = useState<string>('');
  const { user } = useAuth0()

  const giveEmotionFeedback = async () => {
    const feedback = await getJournalEmotionFeedback(description)
    console.log("Got feedback: ", feedback)
    setEmotionFeedback({ emoji: '', value: feedback.emotion })
    setSelectedEmotion({emoji: '', value: feedback.emotion})
  }

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
        user?.email && saveJournalEntry({ ...newJournalEntry, userEmail: user.email }).then(result => {
          result && navigation.navigate('MainScreen')
        })
      } else {
        console.error("Validation Error saving user profile with data: ", dbUser, title, description, selectedEmotion.value,)
      }
    })
  };

  return (
    <View style={styles.container}>
      <Text variant='title'>Crear nueva entrada</Text>

    <View>

      <View style={styles.inputContainer}>
        <Text style={{ textAlign: 'center' }} variant='normalBold'>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setTitle(text)}
          placeholderTextColor={"black"}
          value={title}
          placeholder="Enter title"
          />
      </View>

      <View style={styles.inputContainer}>
        <Text variant='normalBold' style={{ textAlign: 'center' }}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setDescription(text)}
          onChange={() => giveEmotionFeedback()}
          value={description}
          placeholder="Enter description"
          textAlignVertical='center'
          placeholderTextColor={"black"}
          multiline={true}
          numberOfLines={4}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text variant='normalBold' style={{ textAlign: 'center' }}>Emotion</Text>
        <View style={{ alignItems: 'center' }}>
          <Text variant='normal' style={{ width: 200, textAlign: 'center' }}>Dejame adivinar o corrigeme... te representa...</Text>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          {emotions.map(emotion => {
            return (
              <TouchableOpacity
                key={emotion.value}
                onPress={() => {
                  setSelectedEmotion(emotion)
                }}
              >
                <View style={{ alignItems: 'center', }}>
                  {emotion.emoji(emotion.value === selectedEmotion?.value ? 'normal' : 'small')}
                  <Text style={{ textAlign: 'center' }} variant='normal'>
                    {emotionFeedback?.value === emotion.value ? "Este?" : ""}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </View>

      <Text variant='title' style={{ color: 'red' }}>{error}</Text>

      <View>
        <Button title={t('createEntry:backButton')} onPress={() => navigation.navigate('MainScreen')} />
        <Button title="Submit" variant={error !== '' ? 'disabled' : 'secondary'} onPress={handleFormSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginVertical: 14,
  },
  input: {
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginTop: 4,
  },
});


export default CreateEntry;
