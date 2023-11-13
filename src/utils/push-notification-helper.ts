import { Navigation } from './../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export async function getFcmToken() {
    let fcmToken = await AsyncStorage.getItem('fcmtoken') || await messaging().getToken()

    await AsyncStorage.setItem('fcmtoken', fcmToken)
    return fcmToken
}

export const notificationListener = (navigate: Navigation['navigate']) => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log("On notification Opened, should be navigating to ->", remoteMessage?.data?.screenToOpen, remoteMessage?.data?.entryToSee, remoteMessage?.data)
        if (remoteMessage?.data?.screenToOpen && remoteMessage?.data?.entryToSee) {
          navigate(remoteMessage.data.screenToOpen as 'ViewEntry', {entryId: remoteMessage.data.entryToSee as string})
        }
      });
      
      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
      console.log("Initial notification, should navigate to ->", remoteMessage?.data?.screenToOpen, remoteMessage?.data?.entryToSee, remoteMessage?.data)
      if (remoteMessage?.data?.screenToOpen && remoteMessage?.data?.entryToSee) {
        navigate(remoteMessage.data.screenToOpen as 'ViewEntry', {entryId: remoteMessage.data.entryToSee as string})
      }
    });

    messaging().onMessage(async remoteMessage => {
        console.log('notification in foregraound state .... ', remoteMessage)
    })
    
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
}