import React, {useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import {StackNav} from '../../naviagtor/stackkeys';
import {Colors, Fonts, Images} from '../../theme';
import {NavigationService} from '../../utils';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {AppCheckBox, ButtonView, TextInputNative} from '../../components';
import {AppButton, PopupModal, ScaleText} from '../../common';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const Login = () => {
  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
    themeModal: false,
  });

  const [formObj, emailProps, passwordProps, termProps] = useHookForm(
    ['email', 'password', 'term'],
    {term: false},
    ValidationSchema.logIn,
  );

  const submit = formObj.handleSubmit(values => {
    setStateData(prev => ({...prev, isLoading: true}));
    const handlepayload = {
      email: values.email,
      password: values.password,
    };

    setTimeout(() => {
      setStateData(prev => ({...prev, isLoading: false}));
      NavigationService.navigate(StackNav.ProjectType);
    }, 1500);

    console.log('🚀 ~ submit ~ handlepayload:', handlepayload);
  });

  const handleSetTheme = async value => {
    setStateData(prev => ({...prev, themeModal: false}));
    datahandler.setAppTheme(value === 'dark');
    await AsyncStorage.setItem(LocalStoragekey.THEME_COLOUR, value);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={isDarkMode ? Colors.more_black[800] : Colors.White_F8}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <Image
            source={Images.images.app_logo}
            resizeMode="contain"
            style={styles.logo}
          />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}>
            <View style={styles.contentContainer}>
              <ScaleText
              isDarkMode={isDarkMode}
                text={'Sign In'}
                color={Colors.Black_18}
                fontFamily={Fonts.type.Mediu}
                fontSize={ms(22)}
                TextStyle={styles.descriptionText}
              />
              <View style={styles.inputContainer}>
                <TextInputNative
                  topSpaceLarge
                  {...emailProps}
                  title={'User name/Email*'}
                  isDarkMode={isDarkMode}
                  nextFocusRef={passwordProps.forwardRef}
                  customPlaceholder={'Enter Your Email'}
                />
                <TextInputNative
                  topSpaceLarge
                  secureTextEntry
                  title={'Password*'}
                  {...passwordProps}
                  isDarkMode={isDarkMode}
                  customPlaceholder={'Enter Your Password'}
                />
              </View>
              <View style={styles.rememberContainer}>
                <View style={styles.rememberInnerContainer}>
                  <AppCheckBox isDarkMode={isDarkMode} {...termProps} text={'Remember me?'} />
                </View>
                <ButtonView
                  onPress={() =>
                    NavigationService.navigate(StackNav.ForgotPassword)
                  }>
                  <ScaleText
                    color={Colors.Black_42}
                    isDarkMode={isDarkMode}
                    TextStyle={styles.text}
                    fontSize={ms(15)}
                    fontFamily={Fonts.type.Roman}
                    text={'Forgot Password?'}
                  />
                </ButtonView>
              </View>
              <AppButton
                onPress={() => {
                  setStateData(prev => ({...prev, isLoading: true}));
                  setTimeout(() => {
                    setStateData(prev => ({...prev, isLoading: false}));
                    NavigationService.navigate(StackNav.AuthProfile);
                  }, 1500);
                }}
                title={'Sign in'}
                isloading={statedata.isLoading}
              />
              <View style={styles.signUpContainer}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  TextStyle={styles.signUpText}
                  fontFamily={Fonts.type.Roman}
                  text={'Dont have an account?'}
                />
                <ButtonView
                  onPress={() => NavigationService.navigate(StackNav.SignUp)}>
                  <ScaleText
                    text={'Signup'}
                    TextStyle={styles.text}
                    fontFamily={Fonts.type.Mediu}
                    fontSize={ms(15)}
                    color={Colors.Yellow}
                  />
                </ButtonView>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <PopupModal
        GifEnable={true}
        showButtons={true}
        title="Select Your Preferred Theme"
        description={
          'Choose a theme to customize the look and feel of the app.'
        }
        ButtonTitleOne={'Dark Mode'}
        ButtonTitleTwo={'Light Mode'}
        GifStyle={styles.gifStyle}
        isModalVisible={statedata.themeModal}
        ButtonOnePress={() => handleSetTheme('dark')}
        ButonTwoPress={() => handleSetTheme('light')}
        GifSource={require('../../assets/lottie/theme.gif')}
      />
    </View>
  );
};

export default Login;

const styles = ScaledSheet.create({
  flex: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White_F8,
  },
  logo: {
    alignSelf: 'center',
    marginTop: 10,
    width: '200@s',
    height: '200@s',
  },
  contentContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: '20@s',
    paddingVertical: '30@vs',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    elevation: 2,
    backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
  },
  descriptionText: {
    marginBottom: '20@s', // Scaled margin
  },
  inputContainer: {
    marginBottom: '15@s', // Scaled margin
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '50@vs', // Scaled height for vertical dimension
  },
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: '10@s', // Scaled margin
    fontFamily: Fonts.type.Regular,
  },
  text: {
    textDecorationLine: 'underline',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10@s', // Scaled margin
  },
  signUpText: {
    marginRight: '5@s', // Scaled margin
    fontFamily: Fonts.type.Regular,
  },
  gifStyle: {
    width: '100@s', // Scaled width
    height: '100@vs', // Scaled height
    marginBottom: '20@s',
  },
});
