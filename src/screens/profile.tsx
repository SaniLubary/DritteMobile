import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { locallyClearToken } from '../services/local-auth-service';
import { locallyClearUserProfile } from '../services/local-user-profile-service';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { UserProfile } from '../utils/interfaces';
import { useNavigation } from '@react-navigation/native';
import {TextCustom as Text} from '../components/atoms/text';
import {Button} from '../components/atoms/button';
import { UserContext } from '../context/user-context';
import EmojisChart from '../components/molecules/emojis-chart';

const Profile = () => {
  const { clearSession, user } = useAuth0();
  const [dbUser, setDbUser] = useState<UserProfile>();
  const { navigate } = useNavigation<Navigation>();
  const {journals} = useContext(UserContext);

  useEffect(() => {
    if (user?.email) {
      getUser(user?.email).then(user => {
        console.log('User found: ', user)
        setDbUser(user)
      })
    } else {
      navigate('LogIn')
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('LogIn')
    }
  }, [user])

  const onLogout = async () => {
    try {
      locallyClearUserProfile();
      locallyClearToken();
      clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigate('Profile')}>
          {user?.picture && <Image source={{ uri: user?.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 8 }}>
          <Text variant='normal' style={{ fontSize: 24 }}>{user?.name ? user?.name : ''}</Text>
          <Text variant='normal' style={{ fontSize: 14 }}>{user?.email ? user?.email : ''}</Text>
        </View>
      </View>
      
      <View style={{ width: 200, marginHorizontal: 20 }}>
        <Button title='Cerrar Sesion' textVariant='normal' onPress={onLogout} />
      </View> 


      <View style={{ flex: 1, marginHorizontal: 20, marginBottom: 20, justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          {journals.length > 0 && <EmojisChart journals={journals} />}
        </View>
        <Button title='Volver' variant='secondary' textVariant='normal' onPress={() => navigate('MainScreen')} />
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    elevation: 5,
    flexDirection: 'row'
  },
  input: {
    padding: 8,
    fontSize: 16,
    marginTop: 4,
    elevation: 3
  },
});

export default Profile;
