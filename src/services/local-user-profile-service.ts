import { UserProfile } from '@app/utils/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const locallyStoreUserProfile = async (userProfile: UserProfile) => {
  try {
    console.log("Saving user profile locally", userProfile)
    await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
  } catch (error) {
    console.log('Error saving user profile', error)
    // Handle errors (e.g., storage quota exceeded)
  }
};

const locallyRetrieveUserProfile = async (): Promise<UserProfile | undefined> => {
  try {
    const userProfile = await AsyncStorage.getItem('userProfile');
    return userProfile && JSON.parse(userProfile);
  } catch (error) {
    // Handle errors (e.g., data not found)
  }
};

const locallyClearUserProfile = async () => {
  try {
    await AsyncStorage.removeItem('userProfile');
  } catch (error) {
    // Handle errors
  }
};

export {locallyStoreUserProfile, locallyRetrieveUserProfile, locallyClearUserProfile}