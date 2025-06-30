import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {LocalStoragekey} from '../config/AppConfig';
import {PermissionsAndroid, Platform} from 'react-native';

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

export const NotificationListner = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  // Check whether an initial notification is available
  messaging().onMessage(async remoteMessage => {
    console.log(
      ':rocket: ~ file: Notification.js:47 ~ messaging ~ remoteMessage:',
      remoteMessage,
    );

    const notificaiton = remoteMessage?.notification;
    console.log(
      '🚀 ~ file: Notification.js:53 ~ messaging ~ notificaiton:',
      notificaiton,
    );
    const title = notificaiton?.title;
    const body = notificaiton?.body;

    PushNotification.createChannel(
      {
        channelId: 'channel-id-talenton', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => {},
    ); // (optional) callback returns whether the channel was created, false means it already existed.
    PushNotification.localNotification({
      channelId: 'channel-id-talenton',
      title: title ? title : 'talenton', // (optional)
      message: body ? body : '',
    });
    //PushNotification.cancelAllLocalNotifications()
    //handle()
  });
};

const requestNotificationPermission = async () => {
  if (Platform.OS === 'android') {
    // Check Android version
    const androidVersion = parseInt(Platform.Version, 10);
    if (androidVersion >= 33) {
      // Android 13 and above
      try {
        const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
        // Check if permission is already granted
        const permissionStatus = await PermissionsAndroid.check(permission);
        if (!permissionStatus) {
          // Request permission
          const granted = await PermissionsAndroid.request(permission, {
            title: 'Notification Permission',
            message:
              'This app needs access to your notifications to provide updates.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          });
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
            // Permission granted, proceed with sending notifications
          } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Notification permission denied');
            // Permission denied, handle accordingly
          } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Notification permission denied permanently');
          }
        } else {
          console.log('Notification permission already granted');
          // Permission already granted, proceed with sending notifications
        }
      } catch (err) {
        console.error('Notification Permission Error:', err);
      }
    } else {
      console.log(
        'Android version is below 13, no need to request POST_NOTIFICATIONS permission.',
      );
      // Handle notification logic for Android versions below 13 if needed
    }
  }
};
