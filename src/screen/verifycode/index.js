import {SafeAreaView, TextInput, View} from 'react-native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, ScaleText} from '../../common';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {Colors, Fonts, Metrics} from '../../theme';
import {ms} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {useDispatch} from 'react-redux';
import {
  CHANGE_EMAIL_API,
  FORGOT_PASSWORD_API,
  OTP_VERIFICATION_API,
  VARIFY_EMAIL_API,
  VERIFY_EMAIL_API,
} from '../../ducks/auth';
import {styles} from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {TextInputCustom, TextInputNative} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';

const isDarkMode = datahandler.getAppTheme();

const VerifyOtp = ({navigation, route}) => {
  const [formObj, emailprops] = useHookForm(
    ['email'],
    {},
    ValidationSchema.changeEmail,
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'One Time Passcode',
      ),
    );
  }, [navigation, isDarkMode]);

  const {email, id, type} = route?.params || {};
  const dispatch = useDispatch();
  const refRBSheet = useRef();

  const [statedata, setStateData] = useState({
    otpcode: '',
    email: email,
    isLoading: false,
    resandLoading: false,
  });

  const handleVerifyCode = async () => {
    setStateData(prv => ({...prv, isLoading: true}));
    const formData = new FormData();
    formData.append('user_id', id);
    formData.append('otp', statedata.otpcode);
    if (type == 'signup') {
      dispatch(
        VERIFY_EMAIL_API.request({
          payloadApi: formData,
          cb: res => {
            setStateData(prv => ({...prv, isLoading: false}));
            Util.showMessage('OTP verified successfully', 'success');
            NavigationService.navigate(StackNav.Login);
          },
          cberr: res => {
            setStateData(prv => ({...prv, isLoading: false}));
          },
        }),
      );
    } else {
      const formData1 = new FormData();
      formData.append('email', email);
      formData.append('otp', statedata.otpcode);
      dispatch(
        OTP_VERIFICATION_API.request({
          payloadApi: formData,
          cb: res => {
            setStateData(prv => ({...prv, isLoading: false}));
            Util.showMessage('OTP verified successfully', 'success');
            NavigationService.navigate(StackNav.ResetPassword, {
              responce: res,
              email: email,
            });
          },
        }),
      );
    }
  };

  const ResendCode = () => {
    const formData = new FormData();
    formData.append('email', statedata.email);

    dispatch(
      FORGOT_PASSWORD_API.request({
        payloadApi: formData,
        cb: res => {
          Util.showMessage(
            'OTP sent to your email. Please check your inbox',
            'success',
          );
        },
      }),
    );
  };
  const submit = formObj.handleSubmit(values => {
    const formData = new FormData();
    formData.append('old_email', statedata.email);
    formData.append('new_email', values.email);
    dispatch(
      CHANGE_EMAIL_API.request({
        payloadApi: formData,
        cb: res => {
          Util.showMessage(
            'OTP sent to your email. Please check your inbox',
            'success',
          );
          setStateData(prv => ({...prv, email: values.email}));
          refRBSheet.current.close();
        },
      }),
    );
  });

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

        <ScaleText
          TextStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: ms(10),
          }}
          text={`${'Enter the 4-digit code we sent to Email'}`}
        />

        <ScaleText
          fontFamily={Fonts.type.Bold}
          fontSize={ms(15)}
          text={`${statedata.email}`}
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
        onPress={handleVerifyCode}
        title={'Verify'}
      />
      <AppButton
        onPress={() => {
          ResendCode();
        }}
        type={'FORGOT_PASSWORD'}
        ShowLinear={false}
        title={'Resend Code'}
      />
      {type && (
        <AppButton
          onPress={() => refRBSheet.current.open()}
          ShowLinear={false}
          title={'Change Email'}
        />
      )}

      <RBSheet
        ref={refRBSheet}
        height={ms(300)}
        openDuration={300}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          container: {
            borderTopLeftRadius: ms(20),
            borderTopRightRadius: ms(20),
            backgroundColor: Colors.more_black[100],
            padding: ms(20),
          },
          draggableIcon: {
            backgroundColor: Colors.more_black[600],
          },
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.content}>
            <ScaleText
              isDarkMode={isDarkMode}
              color={Colors.Black_18}
              fontFamily={Fonts.type.Mediu}
              fontSize={ms(18)}
              textAlign={'center'}
              text={'Change Email'}
            />
            <TextInputNative
              topSpaceLarge
              title={'Email*'}
              {...emailprops}
              isDarkMode={isDarkMode}
              customPlaceholder={'Enter your new email'}
            />
            <AppButton
              type={'CHANGE_EMAIL'}
              onPress={() => submit()}
              title={'Confirm'}
              style={styles.button}
            />
          </View>
        </SafeAreaView>
      </RBSheet>
    </Background>
  );
};

export default VerifyOtp;
