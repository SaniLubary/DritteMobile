import { UserProfile } from "@app/utils/interfaces"
import Config from "react-native-config"

const saveUserProfile = (userProfile: UserProfile) => {
  fetch(`${Config.BACK_URI}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userProfile)
  })
}

export { saveUserProfile }