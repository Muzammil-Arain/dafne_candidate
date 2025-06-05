import {Image, View, FlatList, RefreshControl, StatusBar} from 'react-native';
import React, {useState, useLayoutEffect, useEffect} from 'react';
import {ScaleText} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {ButtonView, Loader} from '../../components';
import {Colors, Fonts, Images} from '../../theme';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {GET_NOTIFICATION_API} from '../../ducks/app';
import {useDispatch} from 'react-redux';
import moment from 'moment';

const isDarkMode = datahandler.getAppTheme();

const ProjectNotifications = ({navigation, route}) => {
  const {id} = route?.params;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Notifications',
        false,
      ),
    );
  }, [navigation, isDarkMode]);

  useEffect(() => {
    getNotificationData();
  }, [navigation]);

  const getNotificationData = async () => {
    dispatch(
      GET_NOTIFICATION_API.request({
        payloadApi: {},
        cb: async res => {
          setNotifications(res);
        },
      }),
    );
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getNotificationData();
    setRefreshing(false);
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
            color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_02}
            text={item?.data?.message}
          />
          <ScaleText
            fontSize={ms(12)}
            color={isDarkMode ? Colors.Whiite_CC : Colors.Back_70}
            text={moment(item.updated_at).startOf('hour').fromNow()}
          />
        </View>
      </View>
    </ButtonView>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.White} />
      <Loader type={'GET_NOTIFICATION'} />
      {!notifications.length ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScaleText
            fontSize={ms(17)}
            color={Colors.Black}
            text={'No Notification Found'}
          />
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

export default ProjectNotifications;

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
