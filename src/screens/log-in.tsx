import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { UserProfile } from "../utils/interfaces"
import { Navigation } from '../App';
import { locallyStoreToken } from '../services/local-auth-service';
import { getUser, createBaseUser } from '../services/user-service';
import { locallyRetrieveUserProfile, locallyStoreUserProfile } from '../services/local-user-profile-service';
import Text from '../components/atoms/text';
import Button from '../components/atoms/button';
import isIncompleteProfileCreation from '../utils/isIncompleteProfileCreation'

export const LogIn = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { authorize, isLoading, user } = useAuth0();
  const [savingUser, setSavingUser] = useState<boolean>(false);

  const logIn = async () => {
    try {
      const response = await authorize();
      locallyStoreToken(response)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async function () {
      if (user && user.email) {
        setSavingUser(true);
        const dbUser: UserProfile = await getUser(user.email)
        const localUser: UserProfile = await locallyRetrieveUserProfile()

        console.log("IN DA IF", dbUser, localUser)
        if (dbUser.email) {
          if (isIncompleteProfileCreation(dbUser)) {
            setSavingUser(false);
            console.log("Navigating to Profile Creation...")
            navigate('ProfileCreation')
            return
          }
          locallyStoreUserProfile(dbUser).then(() => {
            console.log("User locally stored with", dbUser)
            console.log("Navigating to Home...")
            navigate('MainScreen')
            setSavingUser(false);
          })
          return
        }

        createBaseUser({
          profileUri: user.picture,
          email: user.email,
        }).then(() => {
          setSavingUser(false);
          console.log("Navigating to Profile Creation...")
          navigate('ProfileCreation');
        }).catch(err => console.error(err));
      }
    })()
  }, [user]);

  if (isLoading || savingUser) {
    return (
      <View style={styles.container}>
        <Text variant='title'>Loading</Text>
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
