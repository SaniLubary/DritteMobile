import { UserProfile } from "@app/utils/interfaces"
import getAxiosInstance from "./base-config";
import { locallyStoreUserProfile } from "./local-user-profile-service";
import { AxiosError } from "axios";

const saveUserProfile = async (userProfile: UserProfile) => {
  const axios = await getAxiosInstance();
  if (typeof userProfile.lenguagePreference !== 'string') {
    userProfile.lenguagePreference = userProfile.lenguagePreference && userProfile.lenguagePreference[0]
  }
  return await axios.put(`/user/${userProfile.email}`, userProfile)
    .then((response) => {
      console.log('User saved: ', response.data)
      locallyStoreUserProfile(response.data)
      return true
    })
    .catch(err => {
      console.error("Error saving user profile in database", err)
      return false
    })
}

const getUser = async (email: string): Promise<UserProfile> => {
  const axios = await getAxiosInstance();
  console.log(`Trying to get user with email ${email}...`)
  const user = await axios.get(`/user/${email}`)
    .then(response => response.data)
    .catch((err: AxiosError) => {
      throw err
    })

  console.log('Found: ', user)
  if (!user) {
    console.log("User not found or token expired", user)
    return {}
  }

  if (user?.error) {
    throw Error(user.error)
  }
  
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