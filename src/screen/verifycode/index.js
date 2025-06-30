import {View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, ScaleText} from '../../common';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {Colors, Fonts, Metrics} from '../../theme';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();


const VerifyOtp = ({navigation, route}) => {

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'One Time Passcode'
      )
    );
  }, [navigation, isDarkMode]);

  const usertype = route?.params || {};
  const [statedata, setStateData] = useState({
    otpcode: '',
    isLoading: false,
    resandLoading: false,
  });

  const handleVerifyCode = async () => {
    setStateData(prv => ({...prv, isLoading: true}));
    setTimeout(() => {
      setStateData(prv => ({...prv, isLoading: false}));
      if (usertype.type == 'signup') {
        NavigationService.navigate(StackNav.Login);
      } else {
        NavigationService.navigate(StackNav.ResetPassword);
      }
    }, 1500);
  };

  return (
    <Background isDarkMode={isDarkMode}>
      <View style={{marginTop: Metrics.scaleVertical(50)}}>
        <ScaleText
        isDarkMode={isDarkMode}
          TextStyle={{marginLeft: ms(5)}}
          color={Colors.Black_02}
          fontFamily={Fonts.type.Mediu}
          text={'Verify Code'}
          fontSize={ms(17)}
        />
        <OTPInputView
          style={styles.otpInputView}
          pinCount={4}
          code={statedata.otpcode}
          onCodeChanged={code =>
            setStateData(prev => ({...prev, otpcode: code || ''}))
          }
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
      </View>

      <AppButton
        isloading={statedata.isLoading}
        disabled={statedata.otpcode.length >= 4 ? false : true}
        onPress={() => {
          handleVerifyCode();
        }}
        title={'Verify'}
      />
      <AppButton
        onPress={() => {
          setStateData(prv => ({...prv, resandLoading: true}));
          setTimeout(() => {
            setStateData(prv => ({...prv, resandLoading: false}));
          }, 1500);
        }}
        isloading={statedata.resandLoading}
        ShowLinear={false}
        title={'Resend Code'}
      />
      <AppButton
        onPress={() => NavigationService.goBack()}
        ShowLinear={false}
        title={'Change Email'}
      />
    </Background>
  );
};

export default VerifyOtp;


const styles = ScaledSheet.create({
  otpCodeContainer: {
    marginTop: '-30@ms',
  },
  descriptionText: {
    marginBottom: '20@ms',
  },
  otpInputView: {
    alignSelf: 'center',
    height: '100@ms',  // Scaled height
    paddingLeft: '20@ms', // Scaled padding
    marginBottom: '30@ms',  // Scaled margin
    color: Colors.Black_02,
    fontFamily: Fonts.type.Roman,
  },
  underlineStyleBase: {
    width: '70@ms',  // Scaled width
    height: '70@ms',  // Scaled height
    borderWidth: 2,
    borderRadius: 5,
    color: Colors.Black,
    fontSize: '25@ms', // Scaled font size
    backgroundColor: Colors.Whiite_FA,
    borderWidth: 1,
    borderColor: 'rgba(2, 2, 2, 0.15)',
  },
  underlineStyleHighLighted: {
    borderColor: Colors.Yellow,
  },
  resendContainer: {
    alignSelf: 'flex-end',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: '10@ms',  // Scaled margin
    width: '150@ms',  // Scaled width
  },
  signUpText: {
    marginLeft: '10@ms', // Scaled margin
    fontFamily: Fonts.type.Regular,
  },
  resendText: {
    textDecorationLine: 'underline',
  },
});

