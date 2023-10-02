import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Button from '../components/atoms/button';
import { Navigation } from '../App';
import { useTranslation } from 'react-i18next';
import Text from '../components/atoms/text';

const Emotions = [
  { label: '😃', value: 'happy' },
  { label: '😢', value: 'sad' },
  { label: '😡', value: 'angry' },
  { label: '😍', value: 'love' },
  { label: '😐', value: 'neutral' },
];

const CreateEntry = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState(Emotions[0]);

  const handleFormSubmit = () => {
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Emotion:', selectedEmotion);
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


      <Button title="Submit" onPress={handleFormSubmit} />
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
