import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import {StackNav} from '../../naviagtor/stackkeys';
import {Colors, Fonts, Images} from '../../theme';
import {NavigationService, Util} from '../../utils';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {
  AppCheckBox,
  ButtonView,
  TextInputNative,
  PhoneInputComponent,
} from '../../components';
import {AppButton, InputError, ScaleText, VectorIcon} from '../../common';
import {ms, ScaledSheet} from 'react-native-size-matters';
import DocumentPicker from 'react-native-document-picker';
import datahandler from '../../helper/datahandler';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import {REGISTER_STEP_1_API, REGISTER_STEP_2_API} from '../../ducks/auth';
import RNFS from 'react-native-fs';
import { saveFileToFirestore } from './helper';

const isDarkMode = datahandler.getAppTheme();

const SignUp = () => {
  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
    themeModal: false,
    nextStep: false,
    selectedFile: null,
    setupOneResponce: {},
    CVerror: false,
  });

  console.log('====================================');
  console.log('statedata.setupOneResponce', statedata);
  console.log('====================================');

  const dispatch = useDispatch();

  const [formObj, firstnameProps, lastnameProps, emailProps, phoneProps] =
    useHookForm(
      ['firstname', 'lastname', 'email', 'phone'],
      {},
      ValidationSchema.SignUpOne,
    );

  const [formObjTwo, passwordProps, confirmPasswordProps, termProps] =
    useHookForm(
      ['password', 'confirmPassword', 'term'],
      {term: true},
      ValidationSchema.SignUpTwo,
    );

  const submit = formObj.handleSubmit(values => {
    if (statedata.isLoading) {
      return;
    }
    const formData = new FormData();
    formData.append('role', 'candidate');
    formData.append('first_name', values.firstname);
    formData.append('last_name', values.lastname);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('country_id', '2');

    setStateData(prev => ({...prev, isLoading: 'SIGNUP_STEP_1'}));
    dispatch(
      REGISTER_STEP_1_API.request({
        payloadApi: formData,
        cb: data => {
          datahandler.setRegistorRes(data);
          setStateData(prev => ({
            ...prev,
            isLoading: false,
            nextStep: true,
            setupOneResponce: data,
          }));
        },
        cbErr: Error => {
          setStateData(prev => ({
            ...prev,
            isLoading: false,
          }));
        },
      }),
    );
  });

  const officialSubmit = formObjTwo.handleSubmit(async values => {
    if (statedata.isLoading) return;

    // if (!statedata.selectedFile) {
    //   setStateData(prev => ({...prev, CVerror: 'Please upload your CV'}));
    //   return;
    // }

    console.log('Form Values:', values);
    const RegisterOneRes = await datahandler.getRegistorRes();
    const formData = new FormData();
    formData.append('user_id', RegisterOneRes.data.id);
    formData.append('password', values.password);
    formData.append('confirm_password', values.confirmPassword);
    formData.append('resume', statedata.selectedFile);
    setStateData(prev => ({...prev, isLoading: 'SIGNUP_STEP_2'}));

    dispatch(
      REGISTER_STEP_2_API.request({
        payloadApi: formData,
        cb: data => {
          setStateData(prev => ({...prev, isLoading: false}));

          if (statedata.nextStep) {
            NavigationService.navigate(StackNav.VerifyOtp, {
              email: statedata.setupOneResponce.data.email,
              id: statedata.setupOneResponce.data.id,
              type: 'signup',
            });
          }
        },
      }),
    );
  });

  const handleDocumentPick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.allFiles,
      });
      await saveFileToFirestore(statedata.setupOneResponce.data.email, file);
      // const fileUri = file.uri;
      // const fileType = file.type || 'application/pdf';
      try {
        // const base64Data = await RNFS.readFile(fileUri, 'base64');
        // setStateData(prev => ({
        //   ...prev,
        //   selectedFile: `data:${fileType};base64,${base64Data}`,
        // }));
        setStateData(prev => ({
          ...prev,
          selectedFile: file,
          CVerror: false,
        }));
      } catch (error) {
        console.log('Error converting file to base64:', error);
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User cancelled document picker');
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={isDarkMode ? Colors.more_black[800] : Colors.White_F8}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              source={Images.images.app_logo}
              resizeMode="contain"
              style={styles.logo}
            />

            <View style={styles.contentContainer}>
              <ScaleText
                isDarkMode={isDarkMode}
                text="Sign Up"
                color={Colors.Black_18}
                fontSize={ms(22)}
                fontFamily={Fonts.type.Mediu}
                TextStyle={styles.descriptionText}
              />
              {statedata.nextStep ? (
                <NextStepForm
                  handleDocumentPick={() => handleDocumentPick()}
                  passwordProps={passwordProps}
                  confirmPasswordProps={confirmPasswordProps}
                  termProps={termProps}
                  isDarkMode={isDarkMode}
                  statedata={statedata}
                  setStateData={setStateData}
                />
              ) : (
                <InitialForm
                  firstnameProps={firstnameProps}
                  lastnameProps={lastnameProps}
                  emailProps={emailProps}
                  phoneProps={phoneProps}
                  isDarkMode={isDarkMode}
                />
              )}
              <View style={styles.buttonContainer}>
                <AppButton
                  // disabled={!statedata.isLoading ? true : false}
                  onPress={() =>
                    statedata.nextStep ? officialSubmit() : submit()
                  }
                  title={statedata.nextStep ? 'Register' : 'Next'}
                  type={statedata.isLoading}
                />
              </View>
              <View style={styles.signUpContainer}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  fontFamily={Fonts.type.Roman}
                  TextStyle={styles.signUpText}
                  text="Already have an account?"
                />
                <ButtonView
                  onPress={() => NavigationService.navigate(StackNav.Login)}>
                  <ScaleText
                    text="Login"
                    fontFamily={Fonts.type.Mediu}
                    TextStyle={styles.text}
                    fontSize={ms(15)}
                    color={Colors.Yellow}
                  />
                </ButtonView>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const InitialForm = ({
  firstnameProps,
  lastnameProps,
  emailProps,
  phoneProps,
  isDarkMode,
}) => (
  <View style={styles.inputContainer}>
    <TextInputNative
      topSpaceLarge
      {...firstnameProps}
      title="First Name*"
      isDarkMode={isDarkMode}
      nextFocusRef={lastnameProps.forwardRef}
      customPlaceholder="Enter Your First Name"
    />
    <TextInputNative
      topSpaceLarge
      title="Last Name*"
      {...lastnameProps}
      isDarkMode={isDarkMode}
      nextFocusRef={emailProps.forwardRef}
      customPlaceholder="Enter Your Last Name"
    />
    <TextInputNative
      topSpaceLarge
      title="Email*"
      {...emailProps}
      isDarkMode={isDarkMode}
      // nextFocusRef={phoneProps.forwardRef}
      customPlaceholder="Enter Your Email"
    />
    <PhoneInputComponent isDarkMode={isDarkMode} {...phoneProps} />
    {/* <TextInputNative
      topSpaceLarge
      title="Phone*"
      {...phoneProps}
      isDarkMode={isDarkMode}
      customPlaceholder="Enter Your Phone Number"
    /> */}
  </View>
);

const NextStepForm = ({
  passwordProps,
  confirmPasswordProps,
  termProps,
  isDarkMode,
  statedata,
  setStateData,
  handleDocumentPick,
}) => (
  <View>
    <TextInputNative
      topSpaceLarge
      title="Password*"
      secureTextEntry
      {...passwordProps}
      isDarkMode={isDarkMode}
      customPlaceholder="Enter Your Password"
    />
    <TextInputNative
      secureTextEntry
      topSpaceLarge
      title="Confirm Password*"
      {...confirmPasswordProps}
      isDarkMode={isDarkMode}
      customPlaceholder="Confirm Your Password"
    />
    <ButtonView onPress={handleDocumentPick} style={styles.cvViewButtonStyle}>
      <VectorIcon
        size={ms(17)}
        type="FontAwesome"
        name="upload"
        color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_02}
      />
      <ScaleText
        TextStyle={{width: ms(120)}}
        numberOfLines={1}
        fontFamily={Fonts.type.Roman}
        fontSize={ms(13)}
        text={
          statedata.selectedFile
            ? statedata.selectedFile?.name
            : 'Upload your CV'
        }
      />
    </ButtonView>
    <InputError
      styleErr={{marginTop: 0, marginBottom: 10}}
      error={statedata.CVerror}
    />
    <View style={styles.rememberInnerContainer}>
      <AppCheckBox
        onPress={() =>
          NavigationService.navigate(StackNav.Terms, {
            email: 'values.password',
            type: 'signup',
          })
        }
        CheckBoxTextStyle={{
          color: Colors.DarkYellow,
          fontFamily: Fonts.type.Mediu,
          textDecorationLine: 'underline',
        }}
        {...termProps}
        text="Accept Terms & Conditions *"
      />
    </View>
  </View>
);

export default SignUp;
