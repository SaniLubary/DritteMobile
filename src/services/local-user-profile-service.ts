import { UserProfile } from '@app/utils/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';

const locallyStoreUserProfile = async (userProfile: UserProfile) => {
  try {
    if (userProfile.name) {
      console.log("Saving user profile locally", userProfile)
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  } catch (error) {
    console.log('Error saving user profile in local storage', error)
  }
}

const locallyRetrieveUserProfile = async (): Promise<UserProfile | undefined> => {
  try {
    const userProfile = await AsyncStorage.getItem('userProfile');
    return userProfile && JSON.parse(userProfile);
  } catch (error) {
    console.error('Error getting local user', error);
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