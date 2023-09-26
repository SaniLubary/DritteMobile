import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { UserProfile } from "../utils/interfaces"
import { Navigation } from '../App';
import { locallyStoreToken } from '../services/local-auth-service';
import { getUser, createBaseUser } from '../services/user-service';
import { locallyRetrieveUserProfile, locallyStoreUserProfile } from '../services/local-user-profile-service';
import Text from '../components/atoms/text';
import Button from '../components/atoms/button';


export const LogIn = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { authorize, isLoading, user } = useAuth0();

  const logIn = async () => {
    try {
      const response = await authorize();
      locallyStoreToken(response)
    } catch (e) {
      console.log(e);
    }
  };

  const isIncompleteProfileCreation = (dbUser: UserProfile) => {
    try {
      return !dbUser.birthDate
        || !dbUser.lenguagePreference
        || !dbUser.name
        || dbUser?.musicGenres?.length === 0
    } catch (error) {
      console.log("Error", error)
      return false
    }
  }

  useEffect(() => {
    (async function () {
      if (user && user.email) {
        const dbUser: UserProfile = await getUser(user.email)
        const localUser: UserProfile = await locallyRetrieveUserProfile()

        if (dbUser && localUser) {
          if (isIncompleteProfileCreation(dbUser)) {
            console.log("Navigating to Profile Creation...")
            navigate('ProfileCreation')
            return
          }
          await locallyStoreUserProfile(dbUser)
          console.log("Navigating to Home...")
          navigate('Home')
          return
        }

        await createBaseUser({
          profileUri: user.picture,
          email: user.email,
        })
        console.log("Navigating to Profile Creation...")
        navigate('ProfileCreation');
      }
    })()
  }, [user, navigate]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text variant='normal'>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={logIn} title="Log in" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
