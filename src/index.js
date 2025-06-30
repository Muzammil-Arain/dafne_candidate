import configureStore from './store';
import {Provider} from 'react-redux';
import React, {useEffect, useState} from 'react';
import FlashMessage from 'react-native-flash-message';

// Local import
import {} from './screen';
import AppNavigator from './naviagtor';
import {GalleryPicker} from './components';
import NetworkInfo from './utils/NetworkInfo';
import {Appearance} from 'react-native';
import datahandler from './helper/datahandler';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [storeState, setStore] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(null);
  console.log(isDarkMode,'isDarkMode isDarkMode');
  

  const onStoreConfigure = store => {
    datahandler.setStore(store);
    NetworkInfo.addNetInfoListener();

    setTimeout(() => {
      setStore(store);
    }, 3000);
  };

  useEffect(() => {
    // Configure the store
    configureStore(onStoreConfigure);
  
    // Set initial theme immediately
    const initialColorScheme = Appearance.getColorScheme();
    const darkMode = initialColorScheme === 'dark';
    console.log('Initial color scheme:', darkMode);
    setIsDarkMode(darkMode);
    datahandler.setAppTheme(darkMode);
  
    // Listen for theme changes
    const unsubscribeAppearance = Appearance.addChangeListener(({colorScheme}) => {
      const isDark = colorScheme === 'dark';
      console.log('Theme changed to:', isDark ? 'Dark' : 'Light');
      setIsDarkMode(isDark);
      datahandler.setAppTheme(isDark);
    });
  
    // Listen for network changes
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      console.log('Network state changed:', state);
    });
  
    // Cleanup on unmount
    return () => {
      unsubscribeAppearance();
      unsubscribeNetInfo();
    };
  }, []);
  

  if (storeState === null) {
    return null;
  }

  return (
    <Provider store={storeState}>
      <AppNavigator />
      <GalleryPicker ref={ref => datahandler.setGalleryModalRef(ref)} />
      <FlashMessage position="bottom" />
    </Provider>
  );
};

export default App;
