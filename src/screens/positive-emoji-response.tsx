import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Navigation } from '../App';
import { useTranslation } from 'react-i18next';
import { TextCustom as Text } from '../components/atoms/text';
import { Button } from '../components/atoms/button';
import { useScreenSize } from '../hooks/useScreenSize';
import Wave from '../assets/gradiants/wave'
import Arrow from '../assets/icons/arrow'
import Booble from '../assets/booble'

const PositiveEmojiResponse = ({ navigation }: { navigation: Navigation }) => {
  const { t } = useTranslation();
  const { isMediumScreen } = useScreenSize()

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', right: 0 }}>
        <Wave />
      </View>

      <View>
        <Arrow style={{ marginBottom: 6, alignItems: 'flex-end', transform: [{ rotate: '180deg' }] }} color='#838383' onPress={() => navigation.navigate('Home')} />

        <Text variant='title'>:)</Text>
      </View>

      <View style={isMediumScreen() ? styles.mediumImage : styles.largeImage}>
        <View style={{ bottom: 100, left: 80 }}>
          <Booble style={{ transform: [{ rotateY: '180deg' }] }} />
          <Text style={{ color: 'white', bottom: 160, left: 70, width: 180, transform: [{rotate: '30deg'}] }} variant='normal'>
            Parece que tuviste un buen dia!
            Recuerda tomar agua!
          </Text>
        </View>
        <Image style={{ width: 400, height: 750, top: 30, right: 50, position: 'absolute', transform: [{ 'rotateY': '180deg' }] }} source={require('../assets/britta-happy-full-body.png')} />
      </View>

      <View style={{ marginTop: 100 }}>
        <Button title="Volver" variant='primary' onPress={() => navigation.navigate('Home')} />
      </View>
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
  largeImage: { height: 400, width: 300, alignItems: 'center' },
  mediumImage: { marginTop: 50, height: 225, alignItems: 'center' }
});


export default PositiveEmojiResponse;
