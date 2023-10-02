import { UserProfile } from "./interfaces"

export default function isIncompleteProfileCreation(dbUser: UserProfile) {
  try {
    return !dbUser.birthDate
      || !dbUser.lenguagePreference
      || !dbUser.name
      || dbUser?.musicGenres?.length === 0
  } catch (error) {
    console.log("Error", error)
    return false
  }
}