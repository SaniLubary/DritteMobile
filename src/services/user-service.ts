import { UserProfile } from "@app/utils/interfaces"
import getAxiosInstance from "./base-config"
const saveUserProfile = async (userProfile: UserProfile) => {
  const axios = await getAxiosInstance();
  axios.put(`/user/${userProfile.email}`, userProfile)
    .then(response => console.log('User saved: ', JSON.parse(response.data)))
    .catch(err => console.log("Error saving user profile", err))
}

export { saveUserProfile }