import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Navigation, RootStackParamList } from '../App';
import { TextCustom as Text } from '../components/atoms/text';
import { Button } from '../components/atoms/button';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useScreenSize } from '../hooks/useScreenSize';

const introspectiveQuestions = [
  "¿Qué estoy sintiendo en este momento?",
  "¿Puedo identificar la causa raíz de esta emoción?",
  "¿Cómo está afectando esta emoción mis pensamientos y acciones?",
  "¿He sentido esto antes en situaciones similares?",
  "¿Cuáles son las sensaciones físicas asociadas con esta emoción?",
  "¿Qué pensamientos o creencias podrían estar contribuyendo a esta emoción?",
  "¿Hay algo que esté evitando o que no esté abordando y que esté relacionado con este sentimiento?",
  "¿Cómo me gustaría sentirme en esta situación y qué pasos puedo tomar para moverme hacia esa emoción?",
  "¿Qué puedo aprender de esta emoción sobre mis necesidades y valores?",
  "¿Existen patrones recurrentes o desencadenantes para esta emoción en mi vida?",
  "¿Cómo suelo afrontar esta emoción y hay una manera más efectiva de manejarla?",
  "¿Puedo practicar la autocompasión y comprensión hacia mí mismo por experimentar esta emoción?",
];

function getRandomIntrospectiveQuestion() {
  const randomIndex = Math.floor(Math.random() * introspectiveQuestions.length);
  return introspectiveQuestions[randomIndex];
}

const PositiveEmojiResponse = ({ navigation }: { navigation: Navigation }) => {
  const route = useRoute<RouteProp<RootStackParamList,'NegativeEmojiResponse'>>()
  const question = getRandomIntrospectiveQuestion()
  const { isMediumScreen } = useScreenSize()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={isMediumScreen() ? styles.mediumImage : styles.largeImage}>
        <Image style={{ width: 118, height: 105, position: 'absolute', marginTop: 50 }} source={require('../assets/blobs/red-blob.png')} />
        <Image style={isMediumScreen() ? styles.mediumBritta : styles.largeBritta} source={require('../assets/britta-upset-full-body.png')} />
      </View>

      <View style={{ paddingHorizontal: 50 }}>
        <Text style={{ marginBottom: 8 }} variant='normal'>
          oh!  Parece que tuviste un dia complicado.
        </Text>
        <Text style={{ marginBottom: 8 }} variant='normal'>{`Te gustaria responder la siguiente pregunta para el vos del futuro?`}</Text>
        <Text style={{ marginBottom: 28 }} variant='normalBold'>{question}</Text>
        <Button title="Volver" variant='secondary' onPress={() => navigation.navigate('Home')} />
        <Button title="Responder" variant='primary' onPress={() => navigation.navigate('AnswerIntrospectiveQuestion', { question, entryId: route?.params?.['entryId'] })} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  largeImage: { marginTop: 50, height: 400, width: 300, alignItems: 'center' },
  mediumImage: { height: 230, width: 300, alignItems: 'center' },
  largeBritta: { width: 200, height: 350, position: 'absolute'},
  mediumBritta: { width: 100, height: 180, position: 'absolute', marginTop: 25 }
});


export default PositiveEmojiResponse;
