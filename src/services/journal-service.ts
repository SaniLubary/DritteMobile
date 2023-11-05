import { JournalEntry } from "@app/utils/interfaces"
import getAxiosInstance from "./base-config";

const saveJournalEntry = async (journal: JournalEntry) => {
  const axios = await getAxiosInstance()
  return await axios.post(`/journal`, journal)
    .then((response) => {
      console.log('Journal saved: ', response.data)
      return true
    })
    .catch(err => {
      console.error("Error saving journal in database", err)
      return false
    })
}

const getJournals = async (email:string): Promise<JournalEntry[]> => {
  const axios = await getAxiosInstance()
  return await axios.get(`/journal/${email}`)
  .then((response) => {
    console.log('Journals found: ', response.data)
    return response.data
  })
  .catch(err => {
    console.log("Error getting journals", err)
    return []
  })
}

const getJournalEmotionFeedback = async (description: string): Promise<{emotion: string}> => {
  const axios = await getAxiosInstance()
  return await axios.post('/journal/feedback', { description })
    .then((response) => {
      return response.data
    })
    .catch(err => {
      console.log("Error getting journal feedback", err)
      return ''
    })
}


export { saveJournalEntry, getJournals, getJournalEmotionFeedback }