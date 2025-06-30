import {StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {AppButton, Background} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {TextInputNative} from '../../components';
import {Colors, Fonts} from '../../theme';
import {NavigationService} from '../../utils';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {StackNav} from '../../naviagtor/stackkeys';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const ResetPassword = ({navigation}) => {
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
        'Reset Password'
      )
    );
  }, [navigation, isDarkMode]);

  // const handleSubmit = formObj.handleSubmit(values => {
   
  //   console.log('🚀 ~ handleSubmit ~ values:', values);
  // });

  const handleSubmit  = () => {
    setStateData(prev => ({...prev, isLoading: true}));
    NavigationService.navigate(StackNav.Login);
    setTimeout(() => {
      setStateData(prev => ({...prev, isLoading: false}));
    }, 1500);
  }

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
        <View style={{marginTop: ms(40)}}>
          <AppButton onPress={() => handleSubmit()} title={'Submit'} />
        </View>
      </View>
    </Background>
  );
};

export default ResetPassword;

const styles = ScaledSheet.create({
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@ms',
  },
  rememberText: {
    marginLeft: '10@ms',
    color: Colors.Yellow,
    fontFamily: Fonts.type.Mediu,
  },
});
