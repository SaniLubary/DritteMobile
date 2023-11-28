import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
import BgCircles from '../assets/gradiants/bg-circles'

export const LogIn = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { authorize, isLoading, user } = useAuth0();
  const [savingUser, setSavingUser] = useState<boolean>(false);
  const { t } = useTranslation()
  const { isMediumScreen } = useScreenSize()
  const [error, setError] = useState<string | null>(null)
  const { screenSize } = useScreenSize()

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
            return
          });
      }
    })().catch((err): undefined => {
      console.log("Error no user/email found on auth0 user", err)
      setSavingUser(false)
      return
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
      <BgCircles style={{ position: 'absolute' }} />
      <Image style={isMediumScreen() ? styles.imageMedium : styles.imageLarge} source={require('../assets/britta-happy-full-body.png')} />
      <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={isMediumScreen() ? styles.greetingsMedium : styles.greetingsLarge}>
          <Text variant='title' style={{ textAlign: 'center', fontSize: 70, color: 'white' }}>DRITTE</Text>
          <Text variant='normal' style={{ textAlign: 'center', color: 'white' }}>{t('logIn:text').toUpperCase()}</Text>
        </View>
        <View style={{ width: screenSize.width * 0.8, top: screenSize.height * 0.6, alignSelf: 'center' }}>
          {error && <Text variant='medium' style={{ textAlign: 'center', color: 'red' }}>{error}</Text>}
          <Button onPress={logIn} variant='primary' title={'Iniciar sesión'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2AEC0',
    flex: 1,
  },
  greetingsLarge: {
    margin: 50,
  },
  greetingsMedium: {
    margin: 10,
  },
  imageMedium: { width: 400, height: 900, top: 125, position: 'absolute' },
  imageLarge: { width: 700, height: 1300, top: 300, position: 'absolute' }
});
