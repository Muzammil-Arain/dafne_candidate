import {Provider} from 'react-redux';
import React, {useEffect, useState} from 'react';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation';
import {ToastProvider} from 'react-native-toast-notifications';
import {Alert, Appearance, LogBox, Platform, StatusBar} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import InternetConnectionAlert from 'react-native-internet-connection-alert';

// Local import
import {} from './screen';
import {Colors} from './theme';
import configureStore from './store';
import AppNavigator from './naviagtor';
import geoCode from '../src/utils/geoCode';
import {GalleryPicker} from './components';
import NetworkInfo from './utils/NetworkInfo';
import datahandler from './helper/datahandler';
import {requestNotificationPermission, RequestUserPermission} from './utils/Notification';
import { startNotificationListener } from './utils/NotificationListner';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  const [storeState, setStore] = useState(null);

  const onStoreConfigure = store => {
    datahandler.setStore(store);
    NetworkInfo.addNetInfoListener();

    setTimeout(() => {
      setStore(store);
    }, 3000);
  };

  useEffect(() => {
    configureStore(onStoreConfigure);
    startNotificationListener();
    requestNotificationPermission();
    const initialColorScheme = Appearance.getColorScheme();
    const darkMode = initialColorScheme === 'dark';
    console.log('Initial color scheme:', darkMode);
    // datahandler.setAppTheme(darkMode);

    const unsubscribeAppearance = Appearance.addChangeListener(
      ({colorScheme}) => {
        const isDark = colorScheme === 'dark';
        console.log('Theme changed to:', isDark ? 'Dark' : 'Light');
        // datahandler.setAppTheme(isDark);

        // checkAndRequestPermission();
      },
    );

    // checkAndRequestPermission();
    RequestUserPermission();
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      console.log('Network state changed:', state);
    });

    return () => {
      // unsubscribeAppearance();
      unsubscribeNetInfo();
    };
  }, []);

  const checkAndRequestPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await check(permission);

      if (result === RESULTS.GRANTED) {
        await getCurrentLocation();
      } else if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        if (requestResult === RESULTS.GRANTED) {
          await getCurrentLocation();
        } else {
          datahandler.setCurrentLocation('Permission Blocked');
          Alert.alert(
            'Permission Denied',
            'Location permission is required to fetch your location.',
          );
        }
      } else if (result === RESULTS.BLOCKED) {
        datahandler.setCurrentLocation('Permission Blocked');
        Alert.alert(
          'Permission Blocked',
          'Location permission has been blocked. Please enable it in your settings.',
        );
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        try {
          const result = await new Promise(resolve =>
            geoCode.getAddressObject({latitude, longitude}, resolve),
          );
          datahandler.setCurrentLocation(result);
        } catch (error) {
          console.error('Geocoding error:', error);
          Alert.alert('Error', 'Failed to fetch location address.');
        } finally {
        }
      },
      error => {
        Alert.alert('Error', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  if (storeState === null) {
    return null;
  }

  return (
    <Provider store={storeState}>
      <StatusBar backgroundColor={Colors.Whiite_CC} barStyle="dark-content" />
      <InternetConnectionAlert
        onChange={connectionState => {
          console.log('Connection State: ', connectionState);
        }}>
        <ToastProvider>
          <AppNavigator />
        </ToastProvider>
        <GalleryPicker ref={ref => datahandler.setGalleryModalRef(ref)} />
        <FlashMessage position="bottom" />
      </InternetConnectionAlert>
    </Provider>
  );
};

export default App;
