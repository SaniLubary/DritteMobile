import React, { useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { UserProfile } from "../utils/interfaces"
import { Navigation } from '../App';
import { locallyStoreToken } from '../services/local-auth-service';
import { getUser, createBaseUser } from '../services/user-service';
import { locallyRetrieveUserProfile } from '../services/local-user-profile-service';


export const LogIn = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { authorize, isLoading, user } = useAuth0();

  const onLogin = async () => {
    try {
      const response = await authorize();
      locallyStoreToken(response)
    } catch (e) {
      console.log(e);
    }
  };

  const isIncompleteProfileCreation = (dbUser: UserProfile, localUser: UserProfile) => {
    return !dbUser.birthDate
      || !dbUser.lenguagePreference
      || !dbUser.name
      || dbUser?.musicGenres?.length === 0
      || !localUser.birthDate
      || !localUser.lenguagePreference
      || !localUser.name
      || localUser?.musicGenres?.length === 0
  }

  useEffect(() => {
    (async function () {
      if (user && user.email) {
        const dbUser: UserProfile = await getUser(user.email)
        const localUser: UserProfile = await locallyRetrieveUserProfile()

        if (dbUser) {
          if (isIncompleteProfileCreation(dbUser, localUser)) {
            navigate('ProfileCreation')
            return
          }
          navigate('Home')
          return
        }

        await createBaseUser({
          profileUri: user.picture,
          email: user.email,
        })
        navigate('ProfileCreation');
      }
    })()
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
