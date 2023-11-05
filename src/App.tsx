import 'react-native-gesture-handler'
import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from 'react-native-config';
import { LogIn } from './screens/log-in';
import { ProfileCreation } from './screens/profile-creation/profile-creation';
import Home from './screens/home';
import { UserProvider } from './context/user-context';
import CustomHeader from './components/organisms/CustomHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateEntry from './screens/create-entry';
import ViewEntry from './screens/view-entry';
import Profile from './screens/profile';


const AUTH0_DOMAIN = Config.AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = Config.AUTH0_CLIENT_ID || '';

export type RootStackParamList = {
  MainScreen: undefined;
  LogIn: undefined;
  ProfileCreation: undefined;
  CreateEntry: undefined;
  ViewEntry: { entryId: number };
  Profile: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export type Navigation = NavigationProp<RootStackParamList>
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} options={{
      headerTitle: () => <CustomHeader />,
      tabBarStyle: { display: 'none' }
    }} />
  </Tab.Navigator>
}

const App = () => {
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="MainScreen" component={HomeTab} />
              <Stack.Screen name="LogIn" component={LogIn} />
              <Stack.Screen name="ProfileCreation" component={ProfileCreation} />
              <Stack.Group screenOptions={{ presentation: 'modal', headerShown: true }}>
                <Tab.Screen name="ViewEntry" options={{ headerTitle: 'Recuerdas esta entrada? nya!' }} component={ViewEntry} />
                <Tab.Screen name="CreateEntry" options={{ headerTitle: 'Nueva entrada nya!' }} component={CreateEntry} />
                <Tab.Screen name="Profile" options={{ headerTitle: 'Actualiza tu perfil!' }} component={Profile} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </Auth0Provider>
      </SafeAreaView>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
