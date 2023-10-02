import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { locallyClearToken } from '../services/local-auth-service';
import { locallyClearUserProfile, locallyRetrieveUserProfile, locallyStoreUserProfile } from '../services/local-user-profile-service';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { UserProfile } from '../utils/interfaces';
import Button from '../components/atoms/button';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const { clearSession, user } = useAuth0();
  const [dbUser, setDbUser] = useState<UserProfile>();
  const { navigate } = useNavigation<Navigation>();

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
        <Button title='Create Entry' onPress={() => navigate('CreateEntry')} />
      </View>
    </ScrollView>
  );
};

export default Home;
