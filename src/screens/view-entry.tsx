import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/atoms/button';
import { Navigation, RootStackParamList } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { useAuth0 } from 'react-native-auth0';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import { UserContext } from '../context/user-context';
import { emotions } from './create-entry';

export type Emotion = {
  emoji: any;
  value: string;
}

const ViewEntry = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const route = useRoute()
  const { journals } = useContext(UserContext);
  const entryId = route?.params?.['entryId']
  const journal = journals.filter((journal) => journal._id === entryId)[0]

  return (
    <View style={styles.container}>
      <Text variant='title'>
        {`Mira tu entrada del ${new Date(journal.createdAt).getDate()}/${new Date(journal.createdAt).getMonth()}/${new Date(journal.createdAt).getFullYear()}`}
      </Text>

      <View>
        <View style={styles.inputContainer}>
          <Text style={{ textAlign: 'center' }} variant='normalBold'>Title</Text>
          <Text style={{ textAlign: 'center' }} variant='normal'>{journal.title}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text variant='normalBold' style={{ textAlign: 'center' }}>Description</Text>
          <Text style={{ textAlign: 'center' }} variant='normal'>{journal.description}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text variant='normalBold' style={{ textAlign: 'center' }}>Emotion</Text>
          {emotions.filter(emotion => emotion.value === journal.emotion)[0].emoji('small')}
        </View>
      </View>

      <View>
        <Button title={t('createEntry:backButton')} onPress={() => navigation.navigate('MainScreen')} />
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
    alignItems: 'center'
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


export default ViewEntry;
