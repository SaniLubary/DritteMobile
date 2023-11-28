import React, { useContext } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../components/atoms/button';
import { Navigation, RootStackParamList } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { RouteProp, useRoute } from '@react-navigation/native';
import { UserContext } from '../context/user-context';
import { emotions } from './create-entry';

export type Emotion = {
  emoji: any;
  value: string;
}

const ViewEntry = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const route = useRoute<RouteProp<RootStackParamList, 'ViewEntry'>>()
  const { journals } = useContext(UserContext);
  const entryId = route?.params?.entryId
  const journal = journals.filter((journal) => `${journal._id}` === entryId)[0]

  return journal && (
    <View style={styles.container}>
      {journal?.createdAt && <Text variant='medium' style={{ textAlign: 'center' }}>
        {`Mira tu entrada del ${new Date(journal.createdAt).getDate()}/${new Date(journal.createdAt).getMonth()}/${new Date(journal.createdAt).getFullYear()}`}
      </Text>}
      <ImageBackground source={require('../assets/bg.png')} style={styles.titleCard}>
        {emotions.filter(emotion => emotion.value === journal.emotion)[0].emoji('large')}
        <View style={{ marginLeft: 8, width: '50%'}}>
          <Text variant='normal' style={{ color: 'white' }}>Titulo</Text>
          <Text variant='medium' style={{ color: 'white' }}>{journal.title}</Text>
          {journal.emotion === 'happy' || journal.emotion === 'love' ?
            <Image style={{ width: 210, height: 190, position: 'absolute', top: 50 }} source={require('../assets/blobs/red-blob.png')} />
            : <Image style={{ width: 210, height: 190, position: 'absolute', top: 50 }} source={require('../assets/blobs/green-blob.png')} />}
        </View>
      </ImageBackground>
      <ScrollView style={{ height: 200 }}>
        <View style={styles.inputContainer}>
          <Text variant='normal'>Tu entrada</Text>
          <Text variant='title'>{journal.description}</Text>
        </View>
        <View>
          {journal.question && journal.response && <View style={styles.inputContainer}>
            <Text variant='normal'>Tu Pregunta y Respuesta</Text>
            <Text variant='normalBold'>{journal.question}</Text>
            <Text variant='medium'>{journal.response}</Text>
          </View>}
        </View>
      </ScrollView>

      <Button title={t('Volver')} onPress={() => navigation.navigate('MainScreen')} />
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
  titleCard: {
    padding: 8,
    borderColor: '#F5649E',
    borderWidth: 1,
    borderRadius: 14,
    marginTop: 24,
    flexDirection: 'row',
    backgroundColor: "#ffc1f7964",
    overflow: 'hidden'
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
