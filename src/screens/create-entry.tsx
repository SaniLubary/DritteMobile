import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button } from '../components/atoms/button';
import { Navigation } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { getUser } from '../services/user-service';
import { getJournalEmotionFeedback, saveJournalEntry } from '../services/journal-service';
import { useAuth0 } from 'react-native-auth0';
import { JournalEntry } from '../utils/interfaces';
import { UserContext } from '../context/user-context';
import Spinner from '../components/atoms/spinner';

export type EmotionValues = 'angry' | 'sad' | 'neutral' | 'happy' | 'love'

export type Emotion = {
  emoji: any;
  value: EmotionValues;
}

type size = 'small' | 'normal' | 'large'

const selectEmojiSize = (size: size) => size === 'small' ? { width: 60, height: 50 } : size === "large" ? { width: 120, height: 100 } : { width: 100, height: 80 }

export const emotions: Emotion[] = [
  { emoji: (size: size) => <Image style={selectEmojiSize(size)} source={require('../assets/emojis/mad.png')} />, value: 'angry' },
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
  const [error, setError] = useState<{ error: string, input: string } | null>(null);
  const { user, clearSession } = useAuth0()
  const { searchJournals } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);

  const giveEmotionFeedback = async () => {
    const feedback = await getJournalEmotionFeedback(description)
    console.log("Got feedback: ", feedback)
    setEmotionFeedback({ emoji: '', value: feedback.emotion })
    setSelectedEmotion({ emoji: '', value: feedback.emotion })
  }

  const isFormValid = () => {
    if (!title) {
      setError({ error: t('create-entry:title-required'), input: 'title' });
      return false;
    }
    if (!description) {
      setError({ error: t('create-entry:description-required'), input: 'description' });
      return false;
    }
    if (!selectedEmotion) {
      setError({ error: t('create-entry:emotion-required'), input: 'emoji' });
      return false;
    }
    setError(null)
    return true
  }

  useEffect(() => {
    isFormValid()
  }, [title, description, selectedEmotion])

  const handleFormSubmit = () => {
    if (!isFormValid() || !selectedEmotion) return
    setLoading(true)
    user?.email && getUser(user?.email)
      .then((dbUser) => {
        if (dbUser) {
          const newJournalEntry = { title, description, emotion: selectedEmotion.value }
          user?.email && saveJournalEntry({ ...newJournalEntry, userEmail: user.email }).then((result: JournalEntry) => {
            if (!result) {
              return
            }
            searchJournals()
            if (selectedEmotion?.value === 'happy' || selectedEmotion?.value === 'love') {
              setLoading(false)
              navigation.navigate('PositiveEmojiResponse')
            } else {
              setLoading(false)
              result._id && navigation.navigate('NegativeEmojiResponse', { entryId: result._id })
            }
          })
        } else {
          console.error("Validation Error saving user profile with data: ", dbUser, title, description, selectedEmotion.value,)
        }
      }).catch(err => {
        console.log(err)
        clearSession()
        return
      })
  };

  if (loading) {
    return <View style={{ flex: 1 }}><Spinner /></View>
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant='title' style={{ textAlign: 'center' }}>mi entrada diaria</Text>

      <View>
        <View style={styles.inputContainer}>
          <Text variant='normalBold'>Titulo</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setTitle(text)}
            placeholderTextColor={"black"}
            value={title}
            placeholder="Un buen dia..."
          />
          {error && error.input === 'title' && <Text variant='normal' style={{ color: '#D32455' }}>{error.error}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text variant='normalBold' >Entrada</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setDescription(text)}
            onChange={() => giveEmotionFeedback()}
            value={description}
            placeholder="Hoy fue un buen dia porque..."
            textAlignVertical='top'
            placeholderTextColor={"black"}
            multiline={true}
            numberOfLines={4}
          />
          {error && error.input === 'description' && <Text variant='normal' style={{ color: '#D32455' }}>{error.error}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text variant='normalBold' >Emotion</Text>
          <View>
            <Text variant='normal' style={{ width: 200 }}>Dejame adivinar o corrigeme... te representa...</Text>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
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
                    <Text variant='normal'>
                      {emotionFeedback?.value === emotion.value ? "Este?" : ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
          {error && error.input === 'emoji' && <Text variant='normal' style={{ color: '#D32455' }}>{error.error}</Text>}
        </View>
      </View>

      <View>
        <Button title="Enviar" textVariant='medium' variant={error ? 'disabled' : 'primary'} onPress={handleFormSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginVertical: 4,
  },
  input: {
    color: 'black',
    borderColor: 'pink',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    marginTop: 4,
  },
});


export default CreateEntry;
