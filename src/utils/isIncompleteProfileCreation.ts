import { UserProfile } from "./interfaces"

export default function isIncompleteProfileCreation(dbUser: UserProfile) {
    return !dbUser?.birthDate
      || !dbUser?.lenguagePreference
      || !dbUser?.name
}