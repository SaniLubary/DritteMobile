import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Auth0Provider } from 'react-native-auth0';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Config from 'react-native-config';
import { LogIn } from './screens/log-in';
import { ProfileCreation } from './screens/profile-creation';
import Home from './screens/home';

const Stack = createNativeStackNavigator();

const AUTH0_DOMAIN = Config.AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = Config.AUTH0_CLIENT_ID || '';

const App = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
