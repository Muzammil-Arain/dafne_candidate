import messaging from '@react-native-firebase/messaging';
import EventEmitter from 'eventemitter3';

const notificationEmitter = new EventEmitter();
export const startNotificationListener = () => {
  messaging().onMessage(async remoteMessage => {
    notificationEmitter.emit('notification', remoteMessage);
  });
  messaging().onNotificationOpenedApp(async remoteMessage => {
    notificationEmitter.emit('notification', remoteMessage);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        notificationEmitter.emit('notification', remoteMessage);
      }
    });
};
export const onNotification = callback => {
  notificationEmitter.on('notification', callback);
};
export const removeNotificationListener = callback => {
  notificationEmitter.off('notification', callback);
};
