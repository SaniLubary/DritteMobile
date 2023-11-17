import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Navigation, RootStackParamList } from '../App';
import { TextCustom as Text } from '../components/atoms/text';
import { Button } from '../components/atoms/button';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useScreenSize } from '../hooks/useScreenSize';

const introspectiveQuestions = [
  "What am I feeling right now?",
  "Can I identify the root cause of this emotion?",
  "How is this emotion affecting my thoughts and actions?",
  "Have I felt this way before in similar situations?",
  "What are the physical sensations associated with this emotion?",
  "What thoughts or beliefs might be contributing to this emotion?",
  "Is there something I'm avoiding or not addressing that's related to this feeling?",
  "How would I like to feel in this situation, and what steps can I take to move toward that emotion?",
  "What can I learn from this emotion about my needs and values?",
  "Are there any recurring patterns or triggers for this emotion in my life?",
  "How do I typically cope with this emotion, and is there a more effective way to manage it?",
  "Can I practice self-compassion and understanding toward myself for experiencing this emotion?",
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
          oh!  Looks like you faced a troubled day.
        </Text>
        <Text style={{ marginBottom: 8 }} variant='normal'>{`Would you like to answer the following questions for yoursef of the future?`}</Text>
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
