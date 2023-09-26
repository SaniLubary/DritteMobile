import React, { useEffect, useState } from 'react';
import { Image, ScrollView } from 'react-native';
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
      user?.email && setDbUser(await getUser(user?.email))
    })()
  }, []);

  useEffect(() => {
    (async function () {
      const user = await locallyRetrieveUserProfile()
      if (!user) {
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
      <Text variant="title">User Auth0</Text>
      <Text variant="normal">{JSON.stringify(user)}</Text>

      <Text variant="title">User Local</Text>
      <Text variant="normal">{JSON.stringify(localUser)}</Text>

      <Text variant="title">User Base de datos</Text>
      <Text variant="normal">{JSON.stringify(dbUser)}</Text>

      {user?.picture && <Image source={{ uri: user?.picture }} style={{ width: 100, height: 100 }} />}
      <Button title='Cerrar sesion' onPress={onLogout} />
      <Button title='Reiniciar creacion de perfil' onPress={() => navigate('ProfileCreation')} />
    </ScrollView>
  );
};

export default Home;
