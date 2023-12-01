import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { Button } from '../components/atoms/button';
import { Navigation, RootStackParamList } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { getUser } from '../services/user-service';
import { useAuth0 } from 'react-native-auth0';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getJournal, saveJournalEntry } from '../services/journal-service';
import { UserContext } from '../context/user-context';
import Wave from '../assets/gradiants/wave'
import Arrow from '../assets/icons/arrow'
import Booble from '../assets/booble'
import CheckMark from '../assets/icons/check-mark'

const AnswerIntrospectiveQuestion = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { user } = useAuth0()
  const route = useRoute<RouteProp<RootStackParamList, 'AnswerIntrospectiveQuestion'>>()
  const { searchJournals } = useContext(UserContext);

  const validateForm = () => {
    if (!response) {
      setError(t('answer-introspective-question:response'));
      return false;
    }
    setError('')
    return true
  }

  useEffect(() => {
    validateForm()
  }, [response])

  const handleFormSubmit = () => {
    if (!validateForm() || !response) return
    user?.email && getUser(user?.email).then(async (dbUser) => {
      if (dbUser) {
        const journal = await getJournal(`${route?.params?.['entryId']}`)
        if (!journal) {
          return
        }
        console.log("Journal found: ", journal)
        journal['question'] = route?.params?.['question']
        journal['response'] = response
        dbUser?.email && saveJournalEntry({ ...journal, userEmail: dbUser.email }).then(res => {
          if (res) {
            searchJournals()
            navigation.navigate('Home')
          }
        })
      } else {
        console.error("Validation Error saving user profile with data: ", dbUser)
      }
    }).catch(err => console.log(err))
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', right: 0 }}>
        <Wave />
      </View>

      <View>
        <Arrow style={{ marginBottom: 6, alignItems: 'flex-end', transform: [{ rotate: '180deg' }] }} color='#838383' onPress={() => navigation.navigate('Home')} />

        <Text variant='title'>retrospectiva</Text>
        <Text variant='normalBold'>{route?.params?.['question']}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text variant='normalBold' >DESCRIPCION</Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={text => setResponse(text)}
            value={response}
            style={{ width: '80%' }}
            placeholder="Hoy fue un buen dia porque..."
            textAlignVertical='top'
            placeholderTextColor={"black"}
            multiline={true}
            numberOfLines={4}
          />
          <CheckMark color={error ? '#f31050' : '#28ad1c'} style={{ alignSelf: 'flex-end' }} />
        </View>
      </View>

      <View style={{ top: 30 }}>
        <View style={{ bottom: 100, left: 80 }}>
          <Booble style={{ transform: [{ rotateY: '180deg' }] }} />
          <Text style={{ color: 'white', bottom: 160, left: 70, width: 180, transform: [{ rotate: '30deg' }] }} variant='normal'>
            Bien hecho! tu puedes!
          </Text>
        </View>
        <Image style={{ width: 300, height: 550, top: 50, right: 140, position: 'absolute', transform: [{ 'rotateY': '180deg' }] }} source={require('../assets/britta-happy-full-body.png')} />
      </View>


      <Button title="Listo" variant={error !== '' ? 'disabled' : 'primary'} onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: '100%',
  },
  inputContainer: {
    marginVertical: 4,
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


export default AnswerIntrospectiveQuestion;
