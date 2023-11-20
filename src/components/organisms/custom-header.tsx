import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import {TextCustom} from '../atoms/text';
import { useNavigation } from '@react-navigation/native';
import { Navigation } from '../../App';

const CustomHeader = () => {
  const { user } = useAuth0();
  const { navigate } = useNavigation<Navigation>();

  return (
    <View style={styles.headerContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../assets/emojis/extra-happy.png')} style={{ width: 25, height: 25 }}/>
        <TextCustom style={{ marginLeft: 8 }} variant='normalBold'>Dritte</TextCustom>
      </View>
      <TouchableOpacity onPress={() => navigate('Profile')}>
        {user?.picture && <Image source={{ uri: user?.picture }} style={{ width: 50, height: 50, borderRadius: 50 }} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  }
});

export default CustomHeader
