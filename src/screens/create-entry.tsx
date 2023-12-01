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
import Wave from '../assets/gradiants/wave'
import Arrow from '../assets/icons/arrow'
import CheckMark from '../assets/icons/check-mark'
import EmojiPill from '../assets/gradiants/bg-emoji-pill'

export type EmotionValues = 'angry' | 'sad' | 'neutral' | 'happy' | 'love'

export type Emotion = {
  emoji: any;
  value: EmotionValues;
}

type size = 'small' | 'normal' | 'large'

const selectEmojiSize = (size: size) => size === 'small' ? { width: 60, height: 50 } : size === "large" ? { width: 120, height: 100 } : { width: 85, height: 75 }

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
  const [error, setError] = useState<{ input: string }[]>([]);
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
    let error = []

    if (!title) {
      error.push({ input: 'title' })
    }
    if (!description) {
      error.push({ input: 'description' })
    }
    setError(error)
    return error.length === 0
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

  const Emoji = ({ emotion }: { emotion: Emotion }) => {
    return (
      <TouchableOpacity
        key={emotion.value}
        style={[{ marginHorizontal: 6 }, selectedEmotion?.value === emotion.value && { borderWidth: 3, borderColor: '#28ad1c84', borderRadius: 20 }]}
        onPress={() => {
          setSelectedEmotion(emotion);
        }}
      >
        <EmojiPill color={emotionFeedback?.value === emotion.value ? '#c85daa' : null}>
          <View style={{ alignItems: 'center', top: emotion.value === selectedEmotion?.value ? 0 : 8 }}>
            {emotion.emoji(emotion.value === selectedEmotion?.value ? 'normal' : 'small')}
            <Text style={{ position: 'absolute', bottom: -20 }} variant='normalBold'>{emotionFeedback?.value === emotion.value ? "Este?" : ""}</Text>
          </View>
        </EmojiPill>
      </TouchableOpacity>
    )
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ position: 'absolute', right: 0 }}>
        <Wave />
      </View>

      <View>
        <Arrow style={{ marginBottom: 6, alignItems: 'flex-end', transform: [{ rotate: '180deg' }] }} color='#838383' onPress={() => navigation.navigate('Home')} />

        <Text variant='title'>MI ENTRADA</Text>
        <Text variant='normal'>Expresa tus emociones</Text>
      </View>

      <View style={{ marginVertical: 6 }}>
        <View style={styles.inputContainer}>
          <Text variant='normalBold'>TITULO</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={text => setTitle(text)}
              placeholderTextColor={"black"}
              value={title}
              placeholder="Un buen dia..."
            />
            <CheckMark color={error && error.find(err => err.input === 'title') ? '#f31050' : '#28ad1c'} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text variant='normalBold' >DESCRIPCION</Text>
          <View style={styles.input}>
            <TextInput
              onChangeText={text => setDescription(text)}
              onChange={() => giveEmotionFeedback()}
              value={description}
              style={{ width: '80%' }}
              placeholder="Hoy fue un buen dia porque..."
              textAlignVertical='top'
              placeholderTextColor={"black"}
              multiline={true}
              numberOfLines={4}
            />
            <CheckMark color={error && error.find(err => err.input === 'description') ? '#f31050' : '#28ad1c'} style={{ alignSelf: 'flex-end' }} />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text variant='normalBold' >EMOJI</Text>
          <View>
            <Text variant='normal'>Dejame adivinar el emoji!</Text>
            <Text variant='normal'>O elije otro :)</Text>
          </View>
          <View style={styles.emojisContainer}>
            {emotions.slice(0, 3).map(emotion => <Emoji key={emotion.value} emotion={emotion} />)}
          </View>
          <View style={styles.emojisContainer}>
            {emotions.slice(3, 5).map(emotion => <Emoji key={emotion.value} emotion={emotion} />)}
          </View>
        </View>
      </View>

      <View>
        <Button title="Enviar" textVariant='medium' variant={error.find(err => err.input) ? 'disabled' : 'primary'} onPress={handleFormSubmit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    minHeight: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emojisContainer: { flexDirection: 'row', marginVertical: 8, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }
});


export default CreateEntry;
