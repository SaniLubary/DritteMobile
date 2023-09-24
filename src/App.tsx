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

const Stack = createNativeStackNavigator();

const AUTH0_DOMAIN = Config.AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = Config.AUTH0_CLIENT_ID || '';

type RootStackParamList = {
  Home: undefined;
  LogIn: undefined;
  ProfileCreation: undefined;
};

export type Navigation = NavigationProp<RootStackParamList>

const App = () => {
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="LogIn" component={LogIn} />
              <Stack.Screen name="ProfileCreation" component={ProfileCreation} />
              <Stack.Screen name="Home" component={Home} />
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
