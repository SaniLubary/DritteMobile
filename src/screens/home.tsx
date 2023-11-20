import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { useNavigation } from '@react-navigation/native';
import { emotions } from './create-entry';
import Card from '../components/molecules/card';
import { UserContext } from '../context/user-context';
import Banner from '../components/organisms/banner'
import { TextCustom as Text } from '../components/atoms/text';
import { useScreenSize } from '../hooks/useScreenSize';
import { getAchievements } from '../services/achievements';
import { Achievements } from '../utils/interfaces';
import { AchievementUnlockedNotification } from '../components/organisms/achievement-unlocked-notification'

const pills = ['FELIZ', 'TRISTE', 'NEUTRAL', 'NUEVOS', 'VIEJOS']

const Home = () => {
  const { user } = useAuth0();
  const { navigate } = useNavigation<Navigation>();
  const { journals, searchJournals, dbUser, setDbUser } = useContext(UserContext);
  const { isMediumScreen } = useScreenSize();
  const [showAlert, setShowAlert] = useState(false)
  const [achievement, setAchievement] = useState<Achievements>()

  const notify = (achievements: Achievements[]) => {
    setAchievement(achievements[0])
    setShowAlert(true)
  }

  useEffect(() => {
    getAchievements().then(achievements => {
      notify(achievements);
    })
  }, [journals])

  useEffect(() => {
    searchJournals()
  }, [dbUser]);

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

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (refreshing) {
      searchJournals()
    }
  }, [refreshing])

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {showAlert && achievement && <AchievementUnlockedNotification achievement={achievement} setShowAlert={setShowAlert} />}
      <Banner />

      <View style={styles.pillsContainer}>
        <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }} >
          {pills.map((pill) => <TouchableOpacity key={pill} style={[styles.pill, isMediumScreen() ? styles.pillMedium : styles.pillLarge]}><Text variant='normal'>{pill}</Text></TouchableOpacity>)}
        </ScrollView>
      </View>

      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.entriesContainer}>
        {journals.map((journal, index) => (
          <Card key={journal._id} emotions={emotions} journal={journal} index={index} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  entriesContainer: {
    paddingHorizontal: 20,
    height: '30%'
  },
  entryHeading: {
    marginLeft: 20
  },
  pillsContainer: {
    height: 50,
    alignItems: 'center',
  },
  pill: {
    backgroundColor: 'pink',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pillMedium: {
    height: 30,
    marginHorizontal: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
  },
  pillLarge: {
    height: 50,
    marginHorizontal: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 60,
  },
});

export default Home;
