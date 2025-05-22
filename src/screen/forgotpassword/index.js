import React, {useLayoutEffect, useState} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {View} from 'react-native';
import {TextInputNative} from '../../components';
import {Colors, Fonts} from '../../theme';
import {NavigationService, Util} from '../../utils';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {FORGOT_PASSWORD_API} from '../../ducks/auth';
import {useDispatch} from 'react-redux';

const DummyText = `Please enter your register email or phone 
number, so we will send you verification code.`;

const isDarkMode = datahandler.getAppTheme();

const ForgotPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
  });
  const [formObj, emailProps] = useHookForm(
    ['email'],
    {},
    ValidationSchema.ForgotPassword,
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Forgot Password',
      ),
    );
  }, [navigation, isDarkMode]);

  const handleSubmit = formObj.handleSubmit(values => {
    const {email} = values ?? '';

    const formData = new FormData();
    formData.append('email', email);

    dispatch(
      FORGOT_PASSWORD_API.request({
        payloadApi: formData,
        cb: res => {
          Util.showMessage('OTP sent to your email. Please check your inbox','success')
          NavigationService.navigate(StackNav.VerifyOtp, {
            email: email,
            type: false,
          });
        },
      }),
    );
  });

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
        <AppButton
          type={'API_FORGOT_PASSWORD'}
          isDarkMode={isDarkMode}
          onPress={handleSubmit}
          title={'Submit'}
        />
      </View>
    </Background>
  );
};

export default ForgotPassword;
