import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import TextCustom from './atoms/text';

const CustomHeader = () => {
  const { user } = useAuth0();

  return (
    <View style={styles.headerContainer}>
      <TextCustom variant='normalBold'>Dritte</TextCustom>
      <TouchableOpacity onPress={() => { }}>
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
