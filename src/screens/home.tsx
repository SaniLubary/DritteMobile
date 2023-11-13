import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { UserProfile } from '../utils/interfaces';
import { Button } from '../components/atoms/button';
import { useNavigation } from '@react-navigation/native';
import { getJournals } from '../services/journal-service';
import { Emotion, emotions } from './create-entry';
import Card from '../components/molecules/card';
import EmojisChart from '../components/molecules/emojis-chart';
import { UserContext } from '../context/user-context';

const Home = () => {
  const { user } = useAuth0();
  const [dbUser, setDbUser] = useState<UserProfile>();
  const { navigate } = useNavigation<Navigation>();
  const {journals, setJournals} = useContext(UserContext);

  const searchJournals = () => {
    if (dbUser?.email) {
      getJournals(dbUser.email).then((journals) => {
        console.log('Journals found: ', journals)
        journals.reverse()
        setJournals(journals)
      })
    }
  }

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
    }, 2000);
  }, []);

  useEffect(() => {
    if (refreshing) {
      searchJournals()
    }
  }, [refreshing])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <EmojisChart journals={journals} />
      </View>
      <Text style={styles.entryHeading}>Tu diario</Text>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={styles.entriesContainer}>
        {journals.map((journal, index) => (
          <Card key={journal._id} emotions={emotions} journal={journal} index={index} />
        ))}
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginVertical: 20 }}>
        <Button title='Create Entry' variant='primary' textVariant='title' onPress={() => navigate('CreateEntry')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  entriesContainer: {
    paddingHorizontal: 20,
    height: '30%'
  },
  entryHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
    marginLeft: 20
  },
});

export default Home;
