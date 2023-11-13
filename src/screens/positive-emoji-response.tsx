import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Navigation } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { Button } from '../components/atoms/button';

const PositiveEmojiResponse = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={{top: 100, height: 400, width: 300, alignItems: 'center' }}>
        <Image style={{ width: 210, height: 190, position: 'absolute', top: 50 }} source={require('../assets/blobs/green-blob.png')} />
        <Image style={{ width: 200, height: 350, position: 'absolute' }} source={require('../assets/britta-happy-full-body.png')} />
      </View>
      
      <View style={{ top: 100, padding: 50 }}>
        <Text style={{ marginBottom: 28 }} variant='normal'>
          Bien! Parece que tuviste un buen dia.
          Recuerda comer algo rico hoy y tomar agua!
        </Text>
        <Button title="Volver" variant='primary' onPress={() => navigation.navigate('MainScreen')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});


export default PositiveEmojiResponse;
