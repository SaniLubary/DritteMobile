import { Achievements, UserProfile } from "../utils/interfaces"
import getAxiosInstance from "./base-config";

const getAchievements = async (): Promise<Achievements[]> => {
  const axios = await getAxiosInstance()
  return await axios.get(`/achievements`)
  .then((response) => {
    return response.data as Achievements[]
  })
  .catch(err => {
    console.log("Error getting achievements", err)
    throw err;
  })
}

const setAchievementNotified = async (achievementId: string): Promise<boolean> => {
  const axios = await getAxiosInstance()
  return await axios.post(`/achievements/notify`, {achievementId}).then((response) => response.data)
}

export { getAchievements, setAchievementNotified }