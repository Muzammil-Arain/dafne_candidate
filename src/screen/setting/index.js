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
import {LocalStoragekey} from '../../config/AppConfig';

const isDarkMode = datahandler.getAppTheme();

const Setting = ({navigation}) => {
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
        'Setting',
        false,
      ),
    );
  }, [navigation, isDarkMode]);

  const handlepress = item => {
    return;
    if (item.text == options[4].text) {
      setState(prev => ({...prev, logoutModal: true}));
    }
  };

  const handleLogOut = async () => {
    setState(prev => ({...prev, logoutModal: false}));

    // Dispatch token removal action
    dispatch({
      type: loginAccesToken.type,
      payload: {
        token: false,
      },
    });

    // Clear all AsyncStorage except LOGIN_USER
    const keysToKeep = [LocalStoragekey.LOGIN_USER]; // Keep LOGIN_USER
    const allKeys = await AsyncStorage.getAllKeys();
    const keysToRemove = allKeys.filter(key => !keysToKeep.includes(key));
    console.log('🚀 ~ handleLogOut ~ keysToRemove:', keysToRemove);

    await AsyncStorage.multiRemove(keysToRemove);

    dispatch({
      type: LOGOUT_API.type,
    });

    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    datahandler.setisNewProject(null);
    // Close the drawer and reset navigation again
    return;
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
        <View style={styles.optionContainer}>
          <ButtonView
            onPress={() => NavigationService.navigate(StackNav.ChangePassword)}>
            <ScaleText
              isDarkMode={isDarkMode}
              color={Colors.Black}
              fontSize={ms(15)}
              text={'Change Password'}
            />
          </ButtonView>
        </View>
        <View style={styles.optionContainer}>
          <ButtonView
            onPress={() => setState(prev => ({...prev, logoutModal: true}))}>
            <ScaleText
              isDarkMode={isDarkMode}
              color={Colors.Black}
              fontSize={ms(15)}
              text={'Logout'}
            />
          </ButtonView>
        </View>
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

export default Setting;

const styles = ScaledSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20@ms',
    borderBottomWidth: 0.5,
    paddingBottom: '10@ms',
    borderBottomColor: Colors.Back_c8,
  },
  icon: {
    width: '40@ms',
    height: '40@ms',
    marginRight: '20@ms',
  },
});
