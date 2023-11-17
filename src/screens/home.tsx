import React, { useContext, useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Navigation } from '../App';
import { getUser } from '../services/user-service';
import { useNavigation } from '@react-navigation/native';
import { emotions } from './create-entry';
import Card from '../components/molecules/card';
import { UserContext } from '../context/user-context';
import Banner from '../components/organisms/Banner'
import { TextCustom as Text } from '../components/atoms/text';

const pills = ['FELIZ', 'TRISTE', 'NEUTRAL', 'NUEVOS', 'VIEJOS']

const Home = () => {
  const { user } = useAuth0();
  const { navigate } = useNavigation<Navigation>();
  const { journals, searchJournals, dbUser, setDbUser } = useContext(UserContext);

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
      <Banner />

      <View style={styles.pillsContainer}>
        <ScrollView horizontal={true} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center',}} >
          {pills.map((pill) => <TouchableOpacity style={styles.pill}><Text variant='normal'>{pill}</Text></TouchableOpacity>)}
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
    height: 50
  },
  pill: {
    height: 30,
    marginHorizontal: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'pink',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;
