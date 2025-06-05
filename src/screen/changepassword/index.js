import {View, Image} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {AppButton, Background, PopupModal, ScaleText} from '../../common';
import {Colors, Images} from '../../theme';
import {ButtonView, TextInputNative} from '../../components';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {screenOptions} from '../../naviagtor/config';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {useDispatch} from 'react-redux';
import {CHANGE_PASSWORD_API, LOGOUT_API} from '../../ducks/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {loginAccesToken} from '../../ducks/auth';
import {LocalStoragekey} from '../../config/AppConfig';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';

const isDarkMode = datahandler.getAppTheme();

const ChangePassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    logoutModal: false,
    logoutLoading: false,
  });
  const [formObj, oldpasswordProps, passwordProps, confirmPasswordProps] =
    useHookForm(
      ['oldpassword', 'password', 'confirmPassword'],
      {},
      ValidationSchema.ResetPassword,
    );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Change Password',
        false,
      ),
    );
  }, [navigation, isDarkMode]);

  const handleSubmit1 = formObj.handleSubmit(values => {
    const {oldpassword, confirmPassword, password} = values ?? '';
    const formdata = {
      old_password: oldpassword,
      new_password: password,
      confirm_password: confirmPassword,
    };

    dispatch(
      CHANGE_PASSWORD_API.request({
        payloadApi: formdata,
        cb: res => {
        console.log("🚀 ~ ChangePassword ~ res:", res)
          NavigationService.goBack();
          Util.showMessage('Password changed successfully.','success')
        },
      }),
    );
  });

  return (
    <Background isDarkMode={isDarkMode}>
      <View
        style={{
          marginTop: ms(20),
        }}>
        <TextInputNative
          isDarkMode={isDarkMode}
          topSpaceLarge
          secureTextEntry
          {...oldpasswordProps}
          title={'Old Password*'}
          customPlaceholder={'Enter Your New Password'}
        />
        <TextInputNative
          isDarkMode={isDarkMode}
          topSpaceLarge
          secureTextEntry
          {...passwordProps}
          title={'New Password*'}
          customPlaceholder={'Enter Your New Password'}
        />
        <TextInputNative
          isDarkMode={isDarkMode}
          topSpaceLarge
          secureTextEntry
          {...confirmPasswordProps}
          title={'Confirm Password*'}
          customPlaceholder={'Enter Your Confirm Password'}
        />
        <View style={{marginTop: ms(40)}}>
          <AppButton
            type={'CHANGE_PASSWORD'}
            onPress={() => handleSubmit1()}
            title={'save'}
          />
        </View>
      </View>
    </Background>
  );
};

export default ChangePassword;

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
