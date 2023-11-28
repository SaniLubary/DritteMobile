import { Achievements } from "../utils/interfaces"
import getAxiosInstance from "./base-config";

export interface AchievementWithUsersPercantage {
  _id: string;
  name: string;
  description: string;
  image: string;
  usersPercentageWithSameAchievement: number;
}

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

const getAllAchieved = async (): Promise<AchievementWithUsersPercantage[]> => {
  const axios = await getAxiosInstance()
  return await axios.get(`/achievements/all-achieved`)
  .then((response) => {
    return response.data as AchievementWithUsersPercantage[]
  })
  .catch(err => {
    console.log("Error getting achievements", err)
    throw err;
  })
}

const getAllAchievements = async (): Promise<Achievements[]> => {
  const axios = await getAxiosInstance()
  return await axios.get(`/achievements/all`)
  .then((response) => {
    console.log("Achievements => ", response.data)
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

export { getAchievements, setAchievementNotified, getAllAchievements, getAllAchieved }