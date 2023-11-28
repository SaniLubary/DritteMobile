import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { emotions } from './create-entry';
import Card from '../components/molecules/card';
import { UserContext } from '../context/user-context';
import Banner from '../components/organisms/banner'
import { TextCustom as Text } from '../components/atoms/text';
import { useScreenSize } from '../hooks/useScreenSize';
import { getAchievements } from '../services/achievements';
import { Achievements } from '../utils/interfaces';
import { AchievementUnlockedNotification } from '../components/organisms/achievement-unlocked-notification'
import { getJournals } from '../services/journal-service';

const pills = ['FELIZ', 'TRISTE', 'NEUTRAL']

const Home = () => {
  const { user } = useAuth0();
  const { navigate } = useNavigation<Navigation>();
  const { journals, searchJournals, dbUser, setDbUser, setJournals } = useContext(UserContext);
  const { isMediumScreen } = useScreenSize();
  const [showAlert, setShowAlert] = useState(false)
  const [achievement, setAchievement] = useState<Achievements>()
  const [selectedPill, setSelectedPill] = useState('')
  
  useEffect(() => {
    if (!user) {
      navigate('LogIn')
    }
  }, [user])

  useEffect(() => {
    if (dbUser?.email) {
      getJournals(dbUser.email).then((journals) => {
        journals.reverse()
        switch (selectedPill) {
          case 'FELIZ':
            setJournals(journals.filter(j => j.emotion === 'love' || j.emotion === 'happy'))
            break;
          case 'TRISTE':
            setJournals(journals.filter(j => j.emotion === 'angry' || j.emotion === 'sad'))
            break;
          case 'NEUTRAL':
            setJournals(journals.filter(j => j.emotion === 'neutral'))
            break
          default:
            searchJournals()
            break;
        }
      }).catch((err) => console.log('Journals not found: ', err))
    }
  }, [selectedPill])


  const notify = (achievements: Achievements[]) => {
    setAchievement(achievements[0])
    setShowAlert(true)
  }

  useEffect(() => {
    getAchievements().then(achievements => {
      notify(achievements);
    }).catch(err => undefined)
  }, [journals])

  useEffect(() => {
    searchJournals()
  }, [dbUser]);

  useEffect(() => {
    if (user?.email) {
      getUser(user?.email).then(user => {
        console.log('User found: ', user)
        setDbUser(user)
      }).catch(err => console.log(err))
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
          {pills.map((pill) =>
            <TouchableOpacity
              onPress={() => pill !== selectedPill ? setSelectedPill(pill) : setSelectedPill('')}
              key={pill}
              style={[
                styles.pill,
                selectedPill === pill ? { backgroundColor: '#ffa3c8', borderWidth: 1, borderColor: '#d40000' } : { backgroundColor: 'pink' },
                isMediumScreen() ? styles.pillMedium : styles.pillLarge]}>
              <Text variant='normal'>{pill}</Text>
            </TouchableOpacity>)}
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
    backgroundColor: '#F5649E',
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
