import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import TextCustom from './atoms/text';

const CustomHeader = () => {
  const { user } = useAuth0();

  return (
    <View style={styles.headerContainer}>
      <TextCustom variant='title'>Dritte</TextCustom>
      {user?.picture && <Image source={{ uri: user?.picture }} style={{ width: 50, height: 50, borderRadius: 50, marginRight: 15 }} />}
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
    width: Dimensions.get('window').width - 15
  }
});

export default CustomHeader
