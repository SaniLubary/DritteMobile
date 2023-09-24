import { UserProfile } from "@app/utils/interfaces"
import getAxiosInstance from "./base-config";

const saveUserProfile = async (userProfile: UserProfile) => {
  const axios = await getAxiosInstance();
  console.log('Saving User:', userProfile)
  userProfile.lenguagePreference = userProfile.lenguagePreference && userProfile.lenguagePreference[0]
  await axios.put(`/user/${userProfile.email}`, userProfile)
    .then(response => console.log('User saved: ', response.data))
    .catch(err => console.log("Error saving user profile", err))
}

const getUser = async (email: string): Promise<UserProfile> => {
  const axios = await getAxiosInstance();
  console.log("Trying to get user...")
  const user = await axios.get(`/user/${email}`)
    .then(response => response.data)
    .catch(err => console.log("Error retrieving user", err))

  console.log('Found: ', user)
  return user
}

const createBaseUser = async (user: UserProfile): Promise<boolean> => {
  const axios = await getAxiosInstance();
  console.log('Creating base user with user: ', user)
  return await axios.post(`/user`, user)
    .then(response => response.data)
    .catch(err => console.log("Error creating user", err));
}

export { saveUserProfile, getUser, createBaseUser }