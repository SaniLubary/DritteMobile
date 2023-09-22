import AsyncStorage from '@react-native-async-storage/async-storage';
import { Credentials } from 'react-native-auth0';

const storeToken = async (token: Credentials | undefined) => {
  try {
    await AsyncStorage.setItem('jwtToken', JSON.stringify(token));
  } catch (error) {
    // Handle errors (e.g., storage quota exceeded)
  }
};

const retrieveToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    return token && JSON.parse(token);
  } catch (error) {
    // Handle errors (e.g., data not found)
  }
};

const clearToken = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    // Handle errors
  }
};

export {storeToken, retrieveToken, clearToken}