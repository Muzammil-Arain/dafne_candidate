import {
  Image,
  View,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {ScaleText} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {ButtonView} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const Notifications = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    'You received a new notification for Project 1 - SERVER',
    'You received a new notification for Project 2 - DATABASE',
    'You received a new notification for Project 3 - UI Update',
    'You received a new notification for Project 4 - SERVER Maintenance',
    // Add more notifications as needed
  ]);


  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Notifications',
      )
    );
  }, [navigation, isDarkMode]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setNotifications(prevNotifications => [
        'New notification added after refresh',
        ...prevNotifications,
      ]);
      setRefreshing(false);
    }, 2000);
  };

  const renderNotificationItem = ({item}) => (
    <ButtonView>
      <View style={styles.notificationContainer}>
        <Image
          source={Images.icon.bell}
          resizeMode="contain"
          style={styles.notificationIcon}
        />
        <View style={styles.notificationTextContainer}>
          <ScaleText
            fontFamily={Fonts.type.Mediu}
            fontSize={ms(14)}
            color={isDarkMode ? Colors.Whiite_B1 :Colors.Black_02}
            text={item}
          />
          <ScaleText
            fontSize={ms(12)}
            color={isDarkMode ? Colors.Whiite_CC : Colors.Back_70}
            text={'01 day ago'}
          />
        </View>
      </View>
    </ButtonView>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.White} />
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Notifications;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
  },
  notificationContainer: {
    flexDirection: 'row',
    marginBottom: '10@ms',
    height: '70@ms',
    borderBottomWidth: 1,
    borderBottomColor: Colors.Back_c8,
  },
  notificationIcon: {
    width: '40@ms',
    height: '40@ms',
  },
  notificationTextContainer: {
    width: '300@ms',
    marginLeft: '10@ms',
  },
});
