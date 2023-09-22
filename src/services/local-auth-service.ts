import AsyncStorage from '@react-native-async-storage/async-storage';
import { Credentials } from 'react-native-auth0';

const locallyStoreToken = async (token: Credentials | undefined) => {
  try {
    await AsyncStorage.setItem('jwtToken', JSON.stringify(token));
  } catch (error) {
    // Handle errors (e.g., storage quota exceeded)
  }
};

const locallyRetrieveToken = async (): Promise<Credentials | undefined> => {
  try {
    const token = await AsyncStorage.getItem('jwtToken');
    return token && JSON.parse(token);
  } catch (error) {
    // Handle errors (e.g., data not found)
  }
};

const locallyClearToken = async () => {
  try {
    await AsyncStorage.removeItem('jwtToken');
  } catch (error) {
    // Handle errors
  }
};

export { locallyStoreToken, locallyRetrieveToken, locallyClearToken }