import {View, Image} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {Background, PopupModal, ScaleText} from '../../common';
import {Colors, Images} from '../../theme';
import {ButtonView} from '../../components';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {screenOptions} from '../../naviagtor/config';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {useDispatch} from 'react-redux';
import {LOGOUT_API} from '../../ducks/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginAccesToken} from '../../ducks/auth';

const isDarkMode = datahandler.getAppTheme();

const options = [
  {text: 'Telentoneed Assistance', icon: Images.icon.more_icon},
  {text: 'Terms and Conditions', icon: Images.icon.more_icon},
  {text: 'Setting', icon: Images.icon.more_icon},
  // {text: 'Bill Payments', icon: Images.icon.more_icon},
  // { text: 'Logout', icon: Images.icon.more_icon },
];

const More = ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    logoutModal: false,
    logoutLoading: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'More',
        false,
        false,
      ),
    );
  }, [navigation, isDarkMode]);

  const handlepress = item => {
    console.log('🚀 ~ More ~ item:', item);
    if (item.text == options[2].text) {
      NavigationService.navigate(StackNav.Setting);
    } else if (item.text == options[1].text) {
      NavigationService.navigate(StackNav.TermsandConditionScreen);
    }
    return;
    if (item.text == options[4].text) {
      setState(prev => ({...prev, logoutModal: true}));
    }
  };

  const handleLogOut = async () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    dispatch({
      type: loginAccesToken.type,
      payload: {
        token: false,
      },
    });
    await AsyncStorage.clear();
    return;
    dispatch({
      type: LOGOUT_API.type,
    });
    await AsyncStorage.clear();
    navigation.closeDrawer();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <Background isDarkMode={isDarkMode}>
      <View
        style={{
          marginTop: ms(20),
        }}>
        {options?.map((item, index) => (
          <ButtonView onPress={() => handlepress(item)} key={index}>
            <View style={styles.optionContainer}>
              <Image
                source={item.icon}
                resizeMode="contain"
                style={styles.icon}
              />
              <ScaleText
                isDarkMode={isDarkMode}
                color={Colors.Black}
                fontSize={ms(15)}
                text={item.text}
              />
            </View>
          </ButtonView>
        ))}
      </View>
      <PopupModal
        isModalVisible={state.logoutModal}
        showButtons={true}
        ButtonTitleOne={'Yes'}
        ButtonTitleTwo={'No'}
        ButtonOneLoading={state.logoutLoading}
        ButtonOnePress={() => handleLogOut()}
        ButtonTwoPress={() => {
          setState(prev => ({...prev, logoutModal: false}));
        }}
        title={'Logout Confirmation'}
        description={
          'Are you sure you want to log out? This will end your current session.'
        }
      />
    </Background>
  );
};

export default More;

const styles = ScaledSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20@ms',
  },
  icon: {
    width: '40@ms',
    height: '40@ms',
    marginRight: '20@ms',
  },
});
