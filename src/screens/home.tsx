import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { locallyClearToken } from '../services/local-auth-service';
import Text from '../components/atoms/text';
import { locallyClearUserProfile, locallyRetrieveUserProfile, locallyStoreUserProfile } from '../services/local-user-profile-service';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { UserProfile } from '../utils/interfaces';
import Button from '../components/atoms/button';

const Home = ({ navigation: { navigate } }: { navigation: Navigation }) => {
  const { clearSession, user } = useAuth0();
  const [localUser, setLocalUser] = useState<UserProfile>()
  const [dbUser, setDbUser] = useState<UserProfile>();

  useEffect(() => {
    (async function () {
      if (user?.email) {
        setDbUser(await getUser(user?.email))
      } else {
        navigate('LogIn')
      }
    })()
  }, []);

  useEffect(() => {
    (async function () {
      const user = await locallyRetrieveUserProfile()
      if (!user) {
        console.log("Local user not found, storing dbUser locally...")
        await locallyStoreUserProfile(dbUser)
        setLocalUser(dbUser)
      }
      setLocalUser(user)
    })()
  }, [dbUser])

  useEffect(() => {
    if (!user) {
      navigate('LogIn')
    }
  }, [user])

  const onLogout = async () => {
    try {
      await clearSession();
      locallyClearToken();
      locallyClearUserProfile();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 3 }}>
        <Button title='Cerrar sesion' onPress={onLogout} />
        <Button title='Reiniciar creacion de perfil' onPress={() => navigate('ProfileCreation')} />
      </View>
    </ScrollView>
  );
};

export default Home;
