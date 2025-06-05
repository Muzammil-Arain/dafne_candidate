import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {LocalStoragekey} from '../config/AppConfig';
import {PermissionsAndroid, Platform} from 'react-native';
import {SEND_NOTIFICATION_API} from '../ducks/app';

export async function RequestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

const getFCMToken = async () => {
  let oldfcmToken = await AsyncStorage.getItem(LocalStoragekey.FCM_TOKEN);
  console.log(oldfcmToken, 'the old token');

  if (!oldfcmToken) {
    try {
      const NewfcmToken = await messaging().getToken();
      if (NewfcmToken) {
        console.log(NewfcmToken, 'the new genrated token');
        await AsyncStorage.setItem(LocalStoragekey.FCM_TOKEN, NewfcmToken);
      }
    } catch (error) {
      console.log(error, 'Err');
    }
  }
};


export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    const androidVersion = parseInt(Platform.Version, 10);

    if (androidVersion >= 33) {
      try {
        const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;

        if (!permission) {
          console.warn('POST_NOTIFICATIONS permission is not defined on this Android version.');
          return;
        }

        const permissionStatus = await PermissionsAndroid.check(permission);

        if (!permissionStatus) {
          const granted = await PermissionsAndroid.request(permission, {
            title: 'Notification Permission',
            message: 'This app needs access to your notifications to provide updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          });

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Notification permission denied');
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Notification permission denied permanently');
          }
        } else {
          console.log('Notification permission already granted');
        }
      } catch (err) {
        console.error('Notification Permission Error:', err);
      }
    } else {
      console.log('Android version is below 13, no need to request notification permission.');
    }
  }
};

export const handleSendNotification = (dispatch, userid, title, message) => {
  const formData = new FormData();
  formData.append('user_id', userid);
  formData.append('title', title);
  formData.append('message', message);

  dispatch(
    SEND_NOTIFICATION_API.request({
      payloadApi: formData,
      cb: response => {
        console.log('🚀 ~ handleSendNotification ~ response:', response);
      },
    }),
  );
};
