import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { UserProfile } from '../utils/interfaces';
import { locallyRetrieveUserProfile } from '../services/local-user-profile-service';

export default ({ title, setUserProfile }) => {
  const { t } = useTranslation();

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    (async () => {
      const userProfile: UserProfile = await locallyRetrieveUserProfile()
      if (userProfile) {
        setDate(userProfile.birthDate)
      }
    })()
  }, [])

  useEffect(() => {
    setUserProfile((prevUser) => ({ ...prevUser, birthDate: date }))
  }, [date])

  return (
    <>
      <Button title={t('profileCreation:birthdayInputTitle')} onPress={() => setOpen(true)} />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </>
  )
}