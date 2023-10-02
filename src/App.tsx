import 'react-native-gesture-handler'
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from 'react-native-config';
import { LogIn } from './screens/log-in';
import { ProfileCreation } from './screens/profile-creation/profile-creation';
import Home from './screens/home';
import { UserProvider } from './context/user-context';
import CustomHeader from './components/CustomHeader';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateEntry from './screens/create-entry';

const Stack = createNativeStackNavigator();

const AUTH0_DOMAIN = Config.AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = Config.AUTH0_CLIENT_ID || '';

type RootStackParamList = {
  MainScreen: undefined;
  LogIn: undefined;
  ProfileCreation: undefined;
  CreateEntry: undefined;
};

export type Navigation = NavigationProp<RootStackParamList>
const Tab = createBottomTabNavigator();

const HomeTab = () => {
  return <Tab.Navigator>
    <Tab.Screen name="Home" component={Home} options={{
      headerTitle: () => <CustomHeader />,
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
              <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Tab.Screen name="CreateEntry" component={CreateEntry} />
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
