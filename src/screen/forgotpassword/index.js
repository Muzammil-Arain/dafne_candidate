import React, {useLayoutEffect, useState} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {View} from 'react-native';
import {AppCheckBox, TextInputNative} from '../../components';
import {Colors, Fonts} from '../../theme';
import {NavigationService} from '../../utils';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {StackNav} from '../../naviagtor/stackkeys';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const DummyText = `Please enter your register email or phone 
number, so we will send you verification code.`;

const isDarkMode = datahandler.getAppTheme();

const ForgotPassword = ({navigation}) => {
  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
  });
  const [formObj, emailProps] = useHookForm(
    ['email'],
    {},
    ValidationSchema.ForgotPassword,
  );

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     ...screenOptions,
  //     isDarkMode:true,
  //     headerTitle: `${'Forgot Password'}`,
  //   });
  // }, [navigation]);
  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Forgot Password'
      )
    );
  }, [navigation, isDarkMode]);

  // const handleSubmit = formObj.handleSubmit(values => {
  
  //   console.log('🚀 ~ handleSubmit ~ values:', values);
  // });

  const handleSubmit = () => {
    // setStateData(prev => ({...prev, isLoading: true}));
    // setStateData(prev => ({...prev, isLoading: false}));
      NavigationService.navigate(StackNav.VerifyOtp, {
        email: 'dummy@gmail.com',
        type: false,
      });
  }

  return (
    <Background isDarkMode={isDarkMode}>
      <View style={{marginBottom: ms(20)}}>
        <ScaleText
        isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Roman}
          text={DummyText}
          fontSize={ms(14)}
          color={Colors.Black_02}
          textAlign={'center'}
        />
      </View>
      <TextInputNative
      isDarkMode={isDarkMode}
        topSpaceLarge
        {...emailProps}
        title={'User name/Email*'}
        customPlaceholder={'Enter Your Email'}
      />
      <View style={{marginTop: ms(10)}}>
        <AppButton isDarkMode={isDarkMode} onPress={() => handleSubmit()} title={'Submit'} />
      </View>
    </Background>
  );
};

export default ForgotPassword;

const styles = ScaledSheet.create({
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@ms',
  },
  rememberText: {
    marginLeft: '10@ms',
    color: Colors.Yellow,
  },
});
