import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { locallyClearToken } from '../services/local-auth-service';
import { locallyClearUserProfile } from '../services/local-user-profile-service';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { UserProfile } from '../utils/interfaces';
import { useNavigation } from '@react-navigation/native';
import { TextCustom as Text } from '../components/atoms/text';
import { Button } from '../components/atoms/button';
import { UserContext } from '../context/user-context';
import EmojisChart from '../components/molecules/emojis-chart';
import { AchievementWithUsersPercantage, getAllAchieved, getAllAchievements } from '../services/achievements';
import BrittaNice from '../assets/britta-2-full-bodie'
import { useScreenSize } from '../hooks/useScreenSize';
import Spinner from '../components/atoms/spinner';

const Profile = () => {
  const { clearSession, user } = useAuth0();
  const [dbUser, setDbUser] = useState<UserProfile>();
  const { navigate } = useNavigation<Navigation>();
  const { journals } = useContext(UserContext);
  const [achievements, setAchievements] = useState<AchievementWithUsersPercantage[]>()
  const { screenSize } = useScreenSize()
  const [totalAchievements, setTotalAchievements] = useState<number>(0)

  useEffect(() => {
    getAllAchievements().then((achievements) => {
      setTotalAchievements(achievements.length)
    })

    getAllAchieved().then(achievements => {
      setAchievements(achievements.reverse())
    }).catch(err => console.log(err))
  }, [])

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
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {user?.picture && <Image source={{ uri: user?.picture }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text variant='normal' style={{ fontSize: 24 }}>{user?.name ? user?.name : ''}</Text>
          <Text variant='normal' style={{ fontSize: 14 }}>{user?.email ? user?.email : ''}</Text>
          <View style={{ width: 200, marginTop: 16 }}>
            <Button title='Cerrar Sesion' textVariant='normal' onPress={onLogout} />
          </View>
        </View>
      </View>

      <View style={{ margin: 16 }}>
        <Text variant='medium'>{`Tienes ${achievements?.length}/${totalAchievements} Logros!`}</Text>
        <ScrollView horizontal={true}>
          <View style={{ alignItems: 'center' }}>
            {!achievements && <Spinner />}
          </View>
          {achievements?.map((achievement, i) => (
            <View key={achievement._id} style={[styles.achievement]}>
              <View style={{ alignSelf: 'center' }}>
                <View style={styles.pill}><Text variant='normal' style={{ color: 'white' }}>{`${i + 1}/${achievements.length}`}</Text></View>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: screenSize.width / 1.5 }}>
                  <Text style={{ textAlign: 'center' }} variant='normalBold'>{achievement.name}</Text>
                  <Text style={{ textAlign: 'center', width: '80%' }} variant='normal'>{achievement.description}</Text>
                </View>
                <BrittaNice width={100} height={150} style={{ alignSelf: 'center' }} />
                <Text variant='normal' style={{ color: 'green', alignSelf: 'center' }}>{`El ${Math.floor(achievement.usersPercentageWithSameAchievement)}% obtuvieron este logro!`}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={{ margin: 16 }}>
        {journals.length > 0 && <EmojisChart journals={journals} />}

        <View style={{ marginTop: 24 }}>
          <Button title='Volver' variant='secondary' textVariant='title' onPress={() => navigate('MainScreen')} />
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    elevation: 5,
    flexDirection: 'row'
  },
  input: {
    padding: 8,
    fontSize: 16,
    marginTop: 4,
    elevation: 3
  },
  achievement: {
    padding: 24,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 50,
    width: 300
  },
  pill: {
    backgroundColor: '#F2AEC0',
    width: 40,
    alignItems: 'center',
    borderRadius: 20,
  }
});

export default Profile;
