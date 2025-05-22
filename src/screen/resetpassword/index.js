import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { AppButton, Background } from '../../common';
import { screenOptions } from '../../naviagtor/config';
import { TextInputNative } from '../../components';
import { Colors, Fonts } from '../../theme';
import { NavigationService } from '../../utils';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { StackNav } from '../../naviagtor/stackkeys';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import { useDispatch } from 'react-redux';
import { RESET_PASSWORD_API } from '../../ducks/auth';

const isDarkMode = datahandler.getAppTheme();

const ResetPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const ResponceData = route?.params || {};
  console.log(ResponceData, 'ResponceData');

  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
  });
  const [formObj, passwordProps, confirmPasswordProps] = useHookForm(
    ['password', 'confirmPassword'],
    {},
    ValidationSchema.ResetPassword,
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Reset Password',
      ),
    );
  }, [navigation, isDarkMode]);

  const handleSubmit1 = formObj.handleSubmit(values => {
    const { confirmPassword, password } = values ?? '';
    const formdata = {
      reset_token: ResponceData.responce.reset_token,
      email: ResponceData.email,
      password: password,
      confirm_password: confirmPassword,
    };
    console.log(formdata, 'formdata');

    dispatch(
      RESET_PASSWORD_API.request({
        payloadApi: formdata,
        cb: res => {
          NavigationService.navigate(StackNav.Login);
        },
      }),
    );
  });

  // const handleSubmit = () => {
  //   setStateData(prev => ({...prev, isLoading: true}));
  //   NavigationService.navigate(StackNav.Login);
  //   setTimeout(() => {
  //     setStateData(prev => ({...prev, isLoading: false}));
  //   }, 1500);
  // };

  return (
    <Background isDarkMode={isDarkMode}>
      <View
        style={{
          marginTop: ms(40),
        }}>
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
        <View style={{ marginTop: ms(40) }}>
          <AppButton
            type={'RESET_PASSWORD'}
            onPress={() => handleSubmit1()}
            title={'Submit'}
          />
        </View>
      </View>
    </Background>
  );
};

export default ResetPassword;
