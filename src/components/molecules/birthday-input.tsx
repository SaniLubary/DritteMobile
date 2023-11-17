import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Button, Text } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { UserProfile } from '../../utils/interfaces';
import { locallyRetrieveUserProfile } from '../../services/local-user-profile-service';
import { ProfileCreationContext } from '../../context/profile-creation-context';

export default ({ title }: { title: string }) => {
  const { t } = useTranslation();
  const { answered, setLocalUser, localUser } = useContext(ProfileCreationContext)

  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    console.log('Local user in birthday input is: ', localUser)
  }, [localUser])

  useEffect(() => {
    (async () => {
      const localUser: UserProfile = await locallyRetrieveUserProfile() || {}
      if (localUser && localUser.birthDate) {
        setDate(new Date(localUser.birthDate))
      }
    })()
  }, [])

  useEffect(() => {
    setLocalUser((prevUser) => {
      console.log('Prev user in birthday input is:', prevUser)
      return { ...prevUser, birthDate: date }
    })
    answered(title)
  }, [date])

  return (
    <>
      <Button title={t('profileCreation:birthdayInputTitle')} onPress={() => setOpen(true)} />
      <Text style={{ color: 'black' }}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
      <DatePicker
        modal
        open={open}
        mode='date'
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