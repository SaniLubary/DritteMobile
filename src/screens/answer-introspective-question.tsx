import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from '../components/atoms/button';
import { Navigation, RootStackParamList } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { getUser } from '../services/user-service';
import { useAuth0 } from 'react-native-auth0';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getJournal, saveJournalEntry } from '../services/journal-service';


const AnswerIntrospectiveQuestion = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { user } = useAuth0()
  const route = useRoute<RouteProp<RootStackParamList, 'AnswerIntrospectiveQuestion'>>()

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
        dbUser?.email && saveJournalEntry({...journal, userEmail: dbUser.email}).then(res => {
          if (res) {
            navigation.navigate('Home')
          }
        })
      } else {
        console.error("Validation Error saving user profile with data: ", dbUser)
      }
    })
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant='title' style={{ textAlign: 'center', marginBottom: 14 }}>retrospective</Text>
        <View>
          <Text variant='normalBold'>{route?.params?.['question']}</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setResponse(text)}
            value={response}
            placeholder="To be very honest today..."
            textAlignVertical='top'
            placeholderTextColor={"black"}
            multiline={true}
            numberOfLines={10}
          />
        </View>
        <Text variant='normal' style={{ color: 'red' }}>{error}</Text>
        <View style={{ marginTop: 0 }}>
          <Text variant='normal'>Algunos tips que puedes seguir hoy:</Text>
          <Text variant='normalBold'>respira hondo... toma un baño caliente..</Text>
        </View>
      </View>

      <Button title="Submit" variant={error !== '' ? 'disabled' : 'primary'} onPress={handleFormSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
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
