import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {StackNav} from '../../naviagtor/stackkeys';
import {Colors, Fonts, Images} from '../../theme';
import {LocalStoragekey} from '../../config/Constants';
import {NavigationService} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {
  AppCheckBox,
  ButtonView,
  TextInputNative,
  PhoneInputComponent,
} from '../../components';
import {AppButton, ScaleText, VectorIcon} from '../../common';
import {ms, ScaledSheet} from 'react-native-size-matters';
import DocumentPicker from 'react-native-document-picker';
import datahandler from '../../helper/datahandler';

const isDarkMode =  datahandler.getAppTheme();

const SignUp = () => {
  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
    themeModal: false,
    nextStep: false,
    selectedFile: null,
  });

  const [formObj, firstnameProps, lastnameProps, emailProps, phoneProps] =
    useHookForm(
      ['firstname', 'lastname', 'email', 'phone'],
      {},
      ValidationSchema.SignUpOne,
    );

  const [formObjTwo, passwordProps, confirmPasswordProps, termProps] =
    useHookForm(
      ['password', 'confirmPassword', 'term'],
      {term: false},
      ValidationSchema.SignUpTwo,
    );

  // const submit = formObj.handleSubmit(values => {
  //   setStateData(prev => ({...prev, isLoading: false, nextStep: true}));
  //   // setTimeout(() => {
  //   //   setStateData(prev => ({ ...prev, isLoading: false, nextStep: true }));
  //   // }, 1500);
  // });

  const submit = () => {
    setStateData(prev => ({...prev, isLoading: false, nextStep: true}));
  };

  // const officialSubmit = formObjTwo.handleSubmit(values => {
  //   setStateData(prev => ({...prev, isLoading: true}));
  //   if (statedata.nextStep) {
  //     NavigationService.navigate(StackNav.VerifyOtp, {
  //       email: values.password,
  //       type: 'signup',
  //     });
  //   }
  //   setTimeout(() => {
  //     setStateData(prev => ({...prev, isLoading: false, nextStep: true}));
  //   }, 1500);
  // });

  const officialSubmit = () => {
    setStateData(prev => ({...prev, isLoading: true}));
    if (statedata.nextStep) {
      NavigationService.navigate(StackNav.Terms, {
        email: 'values.password',
        type: 'signup',
      });
    }
    setTimeout(() => {
      setStateData(prev => ({...prev, isLoading: false, nextStep: true}));
    }, 1500);
  };


  const handleDocumentPick = async () => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.allFiles,
      });
      setStateData(prev => ({...prev, selectedFile: file}));
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
        <View style={styles.container}>
          <Image
            source={Images.images.app_logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}>
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
                  onPress={() =>
                    statedata.nextStep ? officialSubmit() : submit()
                  }
                  title={statedata.nextStep ? 'Register' : 'Next'}
                  isloading={statedata.isLoading}
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
          </ScrollView>
        </View>
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
      nextFocusRef={phoneProps.forwardRef}
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
        color={isDarkMode ? Colors.Whiite_B8 :Colors.Black_02}
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
    <View style={styles.rememberInnerContainer}>
      <AppCheckBox
        onPress={() => NavigationService.navigate(StackNav.Terms,{
          email: 'values.password',
           type: 'signup',
        })}
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

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White_F8,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  logo: {
    alignSelf: 'center',
    marginTop: '10@s', // Scaled vertical margin
    width: '200@s', // Scaled width
    height: '200@s', // Scaled height, instead of Metrics.scaleVertical
  },
  contentContainer: {
    marginTop: '5@s', // Scaled margin
    paddingVertical: '30@s', // Scaled vertical padding
    paddingHorizontal: '20@s', // Scaled horizontal padding
    borderTopLeftRadius: '24@s', // Scaled radius
    borderTopRightRadius: '24@s', // Scaled radius
    shadowColor: Colors.Black,
    flex: 1,
    elevation: 2,
    backgroundColor:isDarkMode ? Colors.Black_21 : Colors.White,
  },
  descriptionText: {
    marginBottom: '20@s', // Scaled margin
  },
  inputContainer: {
    marginBottom: '15@s', // Scaled margin
  },
  buttonContainer: {
    marginVertical: '10@s', // Scaled vertical margin
  },
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 0,
  },
  rememberText: {
    marginHorizontal: '10@s', // Scaled margin
    color: Colors.Yellow,
    fontWeight: '500',
  },
  cvViewButtonStyle: {
    width: '160@s', // Scaled width
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '10@s', // Scaled padding
    height: '45@s', // Scaled height
    marginTop: '15@ms',
    marginBottom: '20@ms',
    borderRadius: '5@s', // Scaled border radius
    borderWidth: 1,
    borderColor: Colors.Border,
    backgroundColor: Colors.Whiite_FA, // Fixed typo in color
    shadowRadius: 2,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: '10@s', // Scaled margin
  },
  signUpText: {},
  text: {
    marginLeft: '3@s', // Scaled margin
    textDecorationLine: 'underline',
  },
});
