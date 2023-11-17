import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../App';
import { locallyStoreToken } from '../services/local-auth-service';
import { getUser, createBaseUser, saveUserProfile } from '../services/user-service';
import { locallyStoreUserProfile } from '../services/local-user-profile-service';
import { TextCustom as Text } from '../components/atoms/text';
import { Button } from '../components/atoms/button';
import isIncompleteProfileCreation from '../utils/isIncompleteProfileCreation'
import { useTranslation } from 'react-i18next';
import Spinner from '../components/atoms/spinner';
import { getFcmToken, notificationListener } from '../utils/push-notification-helper';
import { UserProfile } from '../utils/interfaces';
import { useScreenSize } from '../hooks/useScreenSize';

export const LogIn = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { authorize, isLoading, user } = useAuth0();
  const [savingUser, setSavingUser] = useState<boolean>(false);
  const { t } = useTranslation()
  const { isMediumScreen } = useScreenSize()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    notificationListener(navigate);
  }, [])

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

        console.log("User from auth0: " + user.email);

        const deviceToken = await getFcmToken()

        getUser(user.email)
          .then((dbUser: UserProfile) => {
            if (dbUser.email) {
              if (isIncompleteProfileCreation(dbUser)) {
                setSavingUser(false);
                console.log("Navigating to Profile Creation...")
                navigate('ProfileCreation')
                return
              }

              // If current device token is not in database, add it
              if (dbUser.deviceTokens && !dbUser.deviceTokens.find((token: string) => token === deviceToken)) {
                saveUserProfile({ ...dbUser, deviceTokens: [...dbUser.deviceTokens, deviceToken] })
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
              deviceTokens: [deviceToken]
            }).then(() => {
              setSavingUser(false);
              console.log("Navigating to Profile Creation...")
              navigate('ProfileCreation');
            }).catch(err => console.error(err));
          }).catch((err) => {
            if (err.code === 'ERR_BAD_RESPONSE') {
              setError('Sesión expirada!');
            }
            setSavingUser(false)
          });
      }
    })().catch((err) => {
      console.log("Error no user/email found on auth0 user", err)
      setSavingUser(false)
    });
  }, [user]);

  if (isLoading || savingUser) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={{ width: 200, height: 400 }} source={require('../assets/britta-happy-full-body.png')} />
      <View style={isMediumScreen() ? styles.greetingsMedium : styles.greetingsLarge}>
        <Text variant='title' style={{ textAlign: 'center' }}>Hola!</Text>
        <Text variant='normalBold' style={{ textAlign: 'center' }}>{t('logIn:text')}</Text>
      </View>
      {error && <Text variant='medium' style={{ textAlign: 'center', color: 'red' }}>{error}</Text>}
      <Button onPress={logIn} variant='secondary' title={t('logIn:login')} />
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
  greetingsLarge: {
    margin: 50,
  },
  greetingsMedium: {
    margin: 10,
  }
});
