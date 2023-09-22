import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { storeToken } from '../services/local-auth-service';

export const LogIn = ({ navigation: { navigate } }) => {
  const { authorize, isLoading, user } = useAuth0();

  const onLogin = async () => {
    try {
      const response = await authorize();
      storeToken(response)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('ProfileCreation');
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={onLogin} title={'Log In'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
