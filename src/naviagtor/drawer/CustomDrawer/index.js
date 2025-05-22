//Lib import
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Local import
import {Colors, Fonts, Images, Metrics} from '../../../theme';
import {ButtonView} from '../../../components';
import {authUserLogout, getUserData} from '../../../ducks/user';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);

  const ParentData = [
    {
      label: 'Kydos profile',
      navigation: 'kidsList',
    },
    {
      label: 'Subscription',
      navigation: 'Subscription',
    },
    {
      label: 'Notification',
      navigation: 'Notification',
    },
    {
      label: 'Matches',
      navigation: 'HelloScreen',
    },
    {
      label: 'Kydos Market',
      navigation: null,
    },
    {
      label: 'Logout',
      navigation: 'SignIn',
    },
  ];

  const handleLogut = async () => {
    Alert.alert('Logout', 'are you sure you want to logout of your account', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          Logout();
        },
      },
    ]);
  };

  const Logout = async () => {
    dispatch({
      type: authUserLogout.type,
    });
    await AsyncStorage.clear();
    props.navigation.closeDrawer();
    props.navigation.reset({
      index: 0,
      routes: [{name: 'SignIn'}],
    });
  };

  return (
    <View>
      <View style={styles.closeicon}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <AntDesign name="close" size={20} color={Colors.White} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        // onPress={() => props.navigation.navigate('Profile')}
        style={{
          marginVertical: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <View style={styles.imageView}>
            <Image
              source={{uri: userData?.profile_picture}}
              resizeMode="cover"
              style={styles.userimage}
            />
          </View>
        </View>
        <Text style={styles.mainHeading}>
          {userData?.first_name + userData?.last_name}
        </Text>
        <Text style={styles.SubHeading}>@{userData?.first_name}</Text>
      </TouchableOpacity>

      {ParentData.map((item, ind) => {
        return (
          <ButtonView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: ind != 5 ? 0.5 : 0,
              paddingBottom: 10,
              paddingLeft: Metrics.ratio(10),
              marginHorizontal: 10,
              paddingVertical: Metrics.ratio(13),
              borderBottomColor: Colors.White,
            }}>
            <View style={{width: '15%'}}>
              {/* <Image
                tintColor={Colors.White}
                resizeMode="contain"
                source={item.image}
                style={{width: 22, height: 22, marginRight: 5}}
              /> */}
            </View>

            <Text
              style={{
                marginLeft: 5,
                color: Colors.White,
                fontSize: Fonts.size.size_14,
                fontFamily: Fonts.type.Medium,
                width: 100,
              }}>
              {item.label}
            </Text>
          </ButtonView>
        );
      })}
      <View
        style={{
          marginTop: Metrics.screenHeight * 0.44,
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuView: {
    flex: 1,
  },
  imagestyles: {
    height: 20,
    width: 20,
    marginLeft: 15,
  },
  Child_1: {
    height: 50,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    borderBottomColor: Colors.White,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    color: Colors.White,
    fontSize: 13,
    textTransform: 'capitalize',
    flex: 1,
    marginLeft: 10,
  },
  userimage: {
    height: Metrics.ratio(70),
    width: Metrics.ratio(70),
    borderRadius: 100,
  },
  imageView: {
    height: Metrics.ratio(85),
    width: Metrics.ratio(85),
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: Colors.Black,
    elevation: 10,
  },
  mainHeading: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: Fonts.size.size_18,
    color: Colors.White,
    marginTop: 5,
    fontFamily: Fonts.type.Bold,
  },
  SubHeading: {
    textTransform: 'capitalize',
    textAlign: 'center',
    fontSize: Fonts.size.size_12,
    color: Colors.White,
    marginTop: -5,
    fontFamily: Fonts.type.Light,
  },
  closeicon: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
});

export default CustomDrawer;
