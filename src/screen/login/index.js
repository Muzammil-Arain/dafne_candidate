import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {StackNav} from '../../naviagtor/stackkeys';
import {Colors, Fonts, Images} from '../../theme';
import {NavigationService, Util} from '../../utils';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {AppCheckBox, ButtonView, TextInputNative} from '../../components';
import {AppButton, ImageIcon, ScaleText} from '../../common';
import {ms} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {useDispatch} from 'react-redux';
import {LOGIN_API} from '../../ducks/auth';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LocalStoragekey} from '../../config/AppConfig';
import {RequestUserPermission} from '../../utils/Notification';
import {useIsFocused} from '@react-navigation/native';
import {Storage} from '../../utils/storageHelper';
import AccountReviewModal from './popup';

const isDarkMode = datahandler.getAppTheme();
const screenHeight = Dimensions.get('window').height;

const USER_PROFILE_PIC =
  'https://med.gov.bz/wp-content/uploads/2020/08/dummy-profile-pic.jpg';

const Login = ({navigation}) => {
  const [statedata, setStateData] = useState({
    isChecked: false,
    isLoading: false,
    themeModal: false,
    rememberModal: false,
    items: [],
  });
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const isfocues = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);

  const calculateHeight = () => {
    const itemHeight = ms(100);
    const maxSheetHeight = screenHeight * 0.8;
    const contentHeight = statedata.items.length * itemHeight + ms(300);
    return Math.min(contentHeight, maxSheetHeight);
  };

  useEffect(() => {
    handleGetFCM();
  }, [isfocues]);

  useEffect(() => {
    checkUserData();
  }, []);

  const checkUserData = async () => {
    try {
      const storedUserData = await Storage.get(LocalStoragekey.LOGIN_USER);
      if (storedUserData) {
        calculateHeight();
        // await Storage.remove(LocalStoragekey.LOGIN_USER);
        setTimeout(() => {
          refRBSheet.current?.open();
        }, 1000);
        setStateData(prev => ({...prev, items: storedUserData?.reverse()}));
      }
    } catch (error) {
      console.log('Error reading userData from AsyncStorage:', error);
    }
  };

  const handleGetFCM = async () => {
    let oldfcmToken = await AsyncStorage.getItem(LocalStoragekey.FCM_TOKEN);
    if (!oldfcmToken) {
      RequestUserPermission();
    }
  };

  const [formObj, emailProps, passwordProps, termProps] = useHookForm(
    ['email', 'password', 'term'],
    {term: false},
    ValidationSchema.logIn,
  );

  const submit = formObj.handleSubmit(async values => {
    let oldfcmToken = await AsyncStorage.getItem(LocalStoragekey.FCM_TOKEN);
    const formData = new FormData();
    formData.append('role', 'candidate');
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('fcm_token', oldfcmToken);

    dispatch(
      LOGIN_API.request({
        payloadApi: formData,
        cb: async res => {
          console.log('🚀 ~ Login ~ res:', res?.data?.user);
          if (values.term) {
            await Storage.addUniqueToArray(LocalStoragekey.LOGIN_USER, {
              name: `${res?.data?.user?.first_name} ${res?.data?.user?.last_name}`,
              photo: res?.data?.user?.profile,
              id: res?.data?.user.id,
              email: values.email,
              password: values.password,
            });
          }
          if (res.status == 'unverified') {
            Util.showMessage(res?.message, 'success');
            NavigationService.navigate(StackNav.VerifyOtp, {
              email: values.email,
              id: res.user_id,
              type: 'signup',
            });
            return;
          }
          const {percentage} = res?.data?.user || {};

          if (!percentage) {
            NavigationService.navigate(StackNav.AuthProfile);
            setStateData(prev => ({...prev, isLoading: false}));
            return;
          }

          const parts = percentage.split(' / ');
          const screen = parts[0];
          const key = parts[1];
          const id = parts[2];

          if (percentage === 'AppStack') {
            await AsyncStorage.setItem('LOGIN', 'AppStack');
            NavigationService.navigate('AppStack', {key: true});
          } else if (screen) {
            NavigationService.navigate(screen, {
              key: key,
              perID: id,
            });
          } else {
            NavigationService.navigate(percentage);
          }

          setStateData(prev => ({...prev, isLoading: false}));
        },
        cberr: async error => {
          if (error.message == 'Your account is in review') {
            setModalVisible(true);
          } else {
            Util.showMessage(error?.message);
          }
        },
      }),
    );
  });

  const handleLogin = async item => {
    setStateData(prev => ({...prev, isLoading: true}));
    let oldfcmToken = await AsyncStorage.getItem(LocalStoragekey.FCM_TOKEN);
    const formData = new FormData();
    formData.append('role', 'candidate');
    formData.append('email', item.email);
    formData.append('password', item.password);
    formData.append('fcm_token', oldfcmToken);

    dispatch(
      LOGIN_API.request({
        payloadApi: formData,
        cb: async res => {
          refRBSheet.current.close();
          const {percentage} = res?.data?.user || {};
          // NavigationService.navigate(StackNav.AuthProfile);
          // return
          if (!percentage) {
            NavigationService.navigate(StackNav.AuthProfile);
            setStateData(prev => ({...prev, isLoading: false}));
            return;
          }

          const parts = percentage.split(' / ');
          const screen = parts[0];
          const key = parts[1];
          const id = parts[2];

          if (percentage === 'AppStack') {
            await AsyncStorage.setItem('LOGIN', 'AppStack');
            NavigationService.navigate('AppStack', {key: true});
          } else if (screen) {
            NavigationService.navigate(screen, {
              key: key,
              perID: id,
            });
          } else {
            NavigationService.navigate(percentage);
          }
          setStateData(prev => ({...prev, isLoading: false}));
        },
        cberr: async error => {
          refRBSheet.current.close();
          setStateData(prev => ({...prev, isLoading: false}));
        },
      }),
    );
  };

  const handleSetTheme = async value => {
    setStateData(prev => ({...prev, themeModal: false}));
    datahandler.setAppTheme(value === 'dark');
    await AsyncStorage.setItem(LocalStoragekey.THEME_COLOUR, value);
  };

  const handleDetleLocaluser = async item => {
    await Storage.removeFromArray(LocalStoragekey.LOGIN_USER, item.email);
    checkUserData();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={
            isDarkMode ? Colors.more_black[800] : Colors.White_F8
          }
        />

        <AccountReviewModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollView}
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
                    <AppCheckBox
                      isDarkMode={isDarkMode}
                      {...termProps}
                      text={'Remember me?'}
                    />
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
                    submit();
                    // NavigationService.navigate(StackNav.AuthProfile);
                  }}
                  title={'Sign in'}
                  type={'LOGIN'}
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
                {statedata.items.length > 0 && (
                  <View
                    style={{
                      marginTop: ms(20),
                    }}>
                    <ButtonView
                      onPress={() => {
                        if (statedata.items.length > 0)
                          refRBSheet.current?.open();
                      }}>
                      <ScaleText
                        text={'Access your existing account'}
                        TextStyle={[
                          styles.text,
                          {
                            fontStyle: 'italic',
                          },
                        ]}
                        fontFamily={Fonts.type.Mediu}
                        fontSize={ms(15)}
                        color={Colors.Yellow}
                      />
                    </ButtonView>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* <PopupModal
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
        ButtonOnePress={() => handleSetTheme('dark')}z
        ButonTwoPress={() => handleSetTheme('light')}
        GifSource={require('../../assets/lottie/theme.gif')}
      /> */}
        <RBSheet
          ref={refRBSheet}
          height={calculateHeight()}
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
              padding: ms(15),
            },
            draggableIcon: {
              backgroundColor: Colors.more_black[600],
            },
          }}>
          <SafeAreaView style={{flex: 1}}>
            <ScaleText
              isDarkMode={isDarkMode}
              color={Colors.Black_18}
              fontFamily={Fonts.type.Mediu}
              fontSize={ms(18)}
              TextStyle={[
                styles.descriptionText,
                {
                  marginVertical: ms(10),
                },
              ]}
              text={'Continue with an Account'}
            />
            {statedata.isLoading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={Colors.DarkYellow} />
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={statedata.items}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{flexGrow: 1}}
                ListFooterComponentStyle={{
                  justifyContent: 'flex-end',
                  marginTop: 'auto',
                }}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        handleLogin(item);
                      }}>
                      <View style={styles.Modalcontainer}>
                        <Image
                          source={{
                            uri:
                              item?.photo ?? Images.iconsource.dummyuserimage,
                          }}
                          resizeMode="contain"
                          style={styles.image}
                        />
                        <View style={styles.textContainer}>
                          <ScaleText
                            numberOfLines={1}
                            text={item.name || 'Default Name'}
                            fontSize={ms(13)}
                            fontFamily={Fonts.type.Roman}
                          />
                          <View style={styles.emailContainer}>
                            <ScaleText
                              numberOfLines={1}
                              text={item.email || 'default@example.com'}
                              fontSize={ms(11)}
                              color={Colors.more_black[900]}
                              fontFamily={Fonts.type.Light}
                            />
                          </View>
                        </View>
                        <ButtonView onPress={() => handleDetleLocaluser(item)}>
                          <ImageIcon
                            width={ms(25)}
                            height={ms(25)}
                            source={{
                              uri: 'https://cdn-icons-png.flaticon.com/128/9790/9790368.png',
                            }}
                          />
                        </ButtonView>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListFooterComponent={() => (
                  <View style={styles.buttonContainer}>
                    <AppButton
                      onPress={() => refRBSheet.current.close()}
                      title={'Use another account'}
                    />
                  </View>
                )}
              />
            )}
          </SafeAreaView>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default Login;
