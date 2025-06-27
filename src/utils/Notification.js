import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {LocalStoragekey} from '../config/AppConfig';
import {PermissionsAndroid, Platform} from 'react-native';
import {SEND_NOTIFICATION_API} from '../ducks/app';
import Util from './Util';

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
  try {
    if (Platform.OS === 'android') {
      const androidVersion = parseInt(Platform.Version, 10);

      // ✅ Notification Permission (Android 13+)
      if (androidVersion >= 33) {
        const notificationPermission =
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS ||
          'android.permission.POST_NOTIFICATIONS';

        const hasNotificationPermission = await PermissionsAndroid.check(
          notificationPermission,
        );

        if (!hasNotificationPermission) {
          const granted = await PermissionsAndroid.request(
            notificationPermission,
            {
              title: 'Notification Permission',
              message: 'This app needs access to send you important updates.',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied or blocked');
          }
        } else {
          console.log('Notification permission already granted');
        }
      }

      // ✅ Camera Permission
      const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
      const hasCameraPermission = await PermissionsAndroid.check(
        cameraPermission,
      );
      if (!hasCameraPermission) {
        const granted = await PermissionsAndroid.request(cameraPermission, {
          title: 'Camera Permission',
          message: 'We need camera access to take photos.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission not granted');
        }
      }

      // ✅ Storage / Gallery Permission
      const storagePermission =
        androidVersion >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES ||
            'android.permission.READ_MEDIA_IMAGES'
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const hasStoragePermission = await PermissionsAndroid.check(
        storagePermission,
      );
      if (!hasStoragePermission) {
        const granted = await PermissionsAndroid.request(storagePermission, {
          title: 'Gallery Permission',
          message: 'We need access to your gallery to upload images.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Gallery permission not granted');
        }
      }
    }
  } catch (error) {
    console.error('Permission Error:', error);
  }
};

export const handleSendNotification = (
  dispatch,
  userid,
  title,
  message,
  type,
) => {
  const formData = new FormData();
  formData.append('user_id', userid);
  formData.append('title', title);
  formData.append('message', message);
  // formData.append('data', type);

  const payload = {
    user_id: userid,
    title: title,
    message: message,
    data: type,
  };

  dispatch(
    SEND_NOTIFICATION_API.request({
      payloadApi: formData,
      cb: response => {
        // Util.showMessage(response?.message || '');
        console.log('🚀 ~ handleSendNotification ~ response:', response);
      },
    }),
  );
};

export const NotificationListner = async () => {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification  onNotificationOpenedApp caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(
      '🚀 ~ messaging  setBackgroundMessageHandler~ remoteMessage:',
      remoteMessage,
    );
  });

  // Check whether an initial notification is available
  messaging().onMessage(async remoteMessage => {
    console.log(
      ':rocket: ~ onMessage file: Notification.js:47 ~ messaging ~ remoteMessage:',
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
