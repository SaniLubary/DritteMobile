import { JournalEntry } from "@app/utils/interfaces"
import getAxiosInstance from "./base-config";

const saveJournalEntry = async (journal: JournalEntry): Promise<JournalEntry> => {
  const axios = await getAxiosInstance()
  console.log("saving journal entry...")
  return await axios.post(`/journal`, journal)
    .then((response) => {
      console.log('Journal saved: ', response.data)
      return response.data as JournalEntry
    })
    .catch(err => {
      console.error("Error saving journal in database", err)
      throw new Error('Error saving journal in database')
    })
}

const getJournal = async (id:string): Promise<JournalEntry> => {
  const axios = await getAxiosInstance()
  return await axios.get(`/journal/${id}`)
  .then((response) => {
    console.log('Journal found: ', response.data)
    return response.data
  })
  .catch(err => {
    console.log("Error getting journal", err)
    return null
  })
}

const getJournals = async (email:string): Promise<JournalEntry[]> => {
  const axios = await getAxiosInstance()
  return await axios.get(`/journal/all/${email}`)
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


export { saveJournalEntry, getJournal, getJournals, getJournalEmotionFeedback }