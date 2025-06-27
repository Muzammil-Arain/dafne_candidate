//lib
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Linking,
  Alert,
  Platform,
  RefreshControl,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {TextInput} from 'react-native-paper';

//local import
import {NavigationService, Util} from '../../utils';
import datahandler from '../../helper/datahandler';
import {Colors, Fonts, Images} from '../../theme';
import {StackNav} from '../../naviagtor/stackkeys';
import DocumentPicker from 'react-native-document-picker';
import {
  Background,
  ImageIcon,
  PopupModal,
  ScaleText,
  VectorIcon,
} from '../../common';
import {
  ButtonView,
  Loader,
  MoVideoPlayer,
  TextInputCustom,
} from '../../components';
import CustomToggleSwitch from '../../components/CustomToggleSwitch';
import HandleImagePicker from '../../components/HandleImagePicker';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {
  BEHIND_UNIFORM_API,
  CANDIDATE_PROFILE_API,
  DELETE_RESUME_API,
  FAVORITE_HOBBY_API,
  GET_NOTES_API,
  LOGOUT_API,
  PROFESSIONAL_PROFILE_API,
  PROFILE_LOCK_API,
  SAVE_NOTES_API,
  UPDATE_NOTES_API,
  UPLOAD_RESUME_API,
  VIDEO_QUESTION_1_API,
  VIDEO_QUESTION_2__API,
  VIDEO_QUESTION_3_API,
  VIDEO_QUESTION_4_API,
} from '../../ducks/app';
import {
  getUserData,
  loginAccessToken,
  loginAccesToken,
  UPDATE_PROFILE_API,
} from '../../ducks/auth';
import {ActivityIndicator} from 'react-native';
import {BASE_URL} from '../../config/WebService';
import {Icon} from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {LocalStoragekey} from '../../config/AppConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpandableText from './helper';
import FastImageComponent from '../../components/FastImage';

const isDarkMode = datahandler.getAppTheme();
const {width, height} = Dimensions.get('window');

const DummyImage =
  'https://www.inzone.ae/wp-content/uploads/2025/02/dummy-profile-pic.jpg';

const Profile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const getToken = useSelector(loginAccessToken);
  const userData = useSelector(getUserData);
  const focused = useIsFocused();
  const refRBSheet = useRef();
  const [numOfLinesMap, setNumOfLinesMap] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [statedata, setStateData] = useState({
    expandedIndex: null,
    selectData: false,
    showProfile: true,
    deleteModal: false,
    showgalleryModal: false,
    galleryPhoto: null,
    getnotes: '',
    setnotes: '',
    profileImageLoading: false,
    notesLoading: false,
    userProfileData: null,
    candidateResume: [
      {
        name: userData?.resume_link
          ? 'Your resume is uploaded '
          : 'Upload Your CV',
      },
    ],
    ResumeLoading: false,
    ResumeDeleteLoading: false,
    Resumedownload: false,
    userNotes: '',
    setVideoUrl: false,
  });
  console.log('🚀 ~ Profile ~ statedata:', statedata?.userProfileData);
  const flatListRef = useRef();

  const [state, setState] = useState({
    logoutModal: false,
    logoutLoading: false,
  });

  const ProfileDataArray = [
    // {
    //   name: 'Interview Invitations',
    //   icon: Images.icon.book,
    //   subItems: [
    //     'Why & when you decided to become a corporate pilot',
    //     'What good manners and etiquette mean to you',
    //   ],
    // },
    {
      name: 'My Documents',
      icon: Images.icon.document,
      subItems: ['Upload your CV'],
    },
    {
      name: 'Your Pictures and Videos',
      icon: Images.icon.gallery,
      subItems: [
        {
          id: PROFESSIONAL_PROFILE_API,
          key: 'professional_profile',
          title: statedata?.userProfileData?.candidate_photos[0]?.question,
          photo: statedata?.userProfileData?.candidate_photos[0]?.answer,
        },
        {
          id: BEHIND_UNIFORM_API,
          key: 'behind_the_uniform',

          title: statedata?.userProfileData?.candidate_photos[1]?.question,
          photo: statedata?.userProfileData?.candidate_photos[1]?.answer,
        },
        {
          id: FAVORITE_HOBBY_API,
          key: 'favorite_hobby',

          title: statedata?.userProfileData?.candidate_photos[2]?.question,
          photo: statedata?.userProfileData?.candidate_photos[2]?.answer,
        },
        {
          isVideo: true,
          id: VIDEO_QUESTION_1_API,
          key: 'media_aspects_of_job',
          title: statedata?.userProfileData?.candidate_videos[0]?.question,
          photo: statedata?.userProfileData?.candidate_videos[0]?.answer,
        },
        {
          isVideo: true,
          id: VIDEO_QUESTION_2__API,
          key: 'career_achievement_media',
          title: statedata?.userProfileData?.candidate_videos[1]?.question,
          photo: statedata?.userProfileData?.candidate_videos[1]?.answer,
        },
        {
          isVideo: true,
          id: VIDEO_QUESTION_3_API,
          key: 'hobby_or_interest_media',
          title: statedata?.userProfileData?.candidate_videos[2]?.question,
          photo: statedata?.userProfileData?.candidate_videos[2]?.answer,
        },
        {
          isVideo: true,
          id: VIDEO_QUESTION_4_API,
          key: 'fun_fact_about_you_media',
          title: statedata?.userProfileData?.candidate_videos[3]?.question,
          photo: statedata?.userProfileData?.candidate_videos[3]?.answer,
        },
      ],
    },
    // {name: 'Availability', icon: Images.icon.availability, subItems: []},
    {name: 'My Background', icon: Images.icon.book, subItems: []},
    // {name: 'Manage your project(s)', icon: Images.icon.job, subItems: []},
    {name: 'Note', icon: Images.icon.book, subItems: []},
  ];

  // useEffect(() => {
  //   handleGetAPISData();
  //   dispatch({
  //     type: loginAccesToken.type,
  //     payload: {
  //       token: getToken,
  //     },
  //   });
  // }, [focused]);

  useFocusEffect(
    useCallback(() => {
      handleGetAPISData();
      dispatch({
        type: loginAccesToken.type,
        payload: {
          token: getToken,
        },
      });
    }, []),
  );


  const handleGetAPISData = () => {
    const apiRequests = [
      // {
      //   action: GET_NOTES_API,
      //   key: 'getNotesData',
      //   transform: val => ({...val}),
      // },
      {
        action: CANDIDATE_PROFILE_API,
        key: 'getProfileData',
        transform: val => ({...val}),
      },
      // {
      //   action: GET_EMPLOYMENT_API,
      //   key: 'getEmployment',
      //   transform: val => ({...val, name: val.employment_type}),
      // },
      // {
      //   action: GET_JOB_API,
      //   key: 'getJob',
      //   transform: val => ({...val, name: val.job_title}),
      // },
      // {
      //   action: GET_EXPERIENCE_API,
      //   key: 'getexperience',
      // },
    ];

    const fetchAndUpdateState = ({action, key, transform}) => {
      setRefreshing(true);
      return new Promise(resolve => {
        dispatch(
          action.request({
            payloadApi: {},
            cb: res => {
              console.log('🚀 ~ fetchAndUpdateState ~ res:', res);
              setStateData(prev => ({
                ...prev,
                userProfileData: res?.data?.user,
                userNotes:
                  res?.data?.user?.notes?.[res?.data?.user?.notes.length - 1]
                    ?.note,
                showProfile:
                  res?.data?.user?.is_profile_locked == 0 ? true : false,
              }));
              setRefreshing(false);
              // setStateData(prev => ({
              //   ...prev,
              //   userProfileData: res?.notes[0]?.note?.data?.user,
              // }));
              // console.log(`🚀 ~ ${key} API Response:`, res);
              resolve();
            },
          }),
        );
      });
    };

    Promise.all(apiRequests.map(fetchAndUpdateState));
  };

  const handleSetNotes = () => {
    if (!statedata.userNotes?.trim()) {
      Util.showMessage('Note cannot be empty', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('note', statedata.userNotes.trim());
    setStateData(prev => ({
      ...prev,
      notesLoading: true,
    }));
    const actionType = statedata?.getnotes?.length
      ? UPDATE_NOTES_API
      : SAVE_NOTES_API;

    dispatch(
      actionType.request({
        payloadApi: formData,
        cb: () => {
          setStateData(prev => ({
            ...prev,
            notesLoading: false,
          }));
          Keyboard.dismiss();
          Util.showMessage('Notes saved successfully', 'success');
        },
      }),
    );
  };

  const handleDeleteResume = () => {
    setStateData(prev => ({
      ...prev,
      ResumeDeleteLoading: true,
    }));
    dispatch(
      DELETE_RESUME_API.request({
        payloadApi: null,
        cb: () => {
          setStateData(prev => ({
            ...prev,
            deleteModal: false,
            ResumeDeleteLoading: false,
          }));
          handleGetAPISData();
          Util.showMessage('Resmue delete successfully', 'success');
        },
      }),
    );
  };

  const handlePickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (!res || res.length === 0) return;

      const formData = new FormData();
      formData.append('resume', {
        uri: res[0]?.uri,
        name: res[0]?.name,
        type: res[0]?.type,
      });
      setStateData(prev => ({
        ...prev,
        candidateResume: res,
        ResumeLoading: true,
      }));
      dispatch(
        UPLOAD_RESUME_API.request({
          payloadApi: formData,
          cb: response => {
            setStateData(prev => ({
              ...prev,
              ResumeLoading: false,
            }));
            handleGetAPISData();
            Util.showMessage('Resume uploaded successfully!', 'success');
          },
        }),
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error: ', err);
        Util.showMessage('An error occurred while picking the document.');
      }
    }
  };

  const downloadFile = async (url, fileName = 'abcdef') => {
    console.log('🚀 ~ downloadFile ~ url:', url);
    try {
      setStateData(prev => ({
        ...prev,
        Resumedownload: true,
      }));
      const {config, fs} = RNFetchBlob;
      const downloadDir =
        Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
      const filePath = `${downloadDir}/${fileName}`;

      // Start downloading the file
      const res = await config({
        fileCache: true,
        appendExt: 'pdf',
        path: filePath,
      }).fetch('GET', url);

      console.log('File downloaded to:', res.path());

      alert('Download Successful', `File downloaded to ${res.path()}`);
      setStateData(prev => ({
        ...prev,
        Resumedownload: false,
      }));
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Download Failed', 'Failed to download file');
    }
  };

  const handleToggle = index => {
    const {expandedIndex, userProfileData} = statedata;

    if (index === 2) {
      NavigationService.navigate(StackNav.MyBackground, {
        data: userProfileData,
      });
      return;
    }

    setStateData(prev => ({
      ...prev,
      expandedIndex: expandedIndex === index ? null : index,
    }));
  };

  const handleProfileToggle = newState => {
    dispatch(
      PROFILE_LOCK_API.request({
        payloadApi: null,
        cb: res => {
          Util.showMessage(res.message, 'success');
          setStateData(prev => ({...prev, showProfile: newState}));
          console.log(res);
        },
      }),
    );
  };

  const onImagePicked = image => {
    if (!image) return;

    const formData = new FormData();
    formData.append('first_name', userData?.first_name);
    formData.append('last_name', userData?.last_name);
    formData.append('email', userData?.email);
    formData.append('phone', userData?.phone);
    formData.append('profile_picture', image);
    console.log('🚀 ~ Profile ~ formData:', formData);
    setStateData(prev => ({
      ...prev,
      galleryPhoto: image,
      showgalleryModal: false,
      profileImageLoading: true,
    }));
    dispatch(
      UPDATE_PROFILE_API.request({
        payloadApi: formData,
        cb: res => {
          console.log('🚀 ~ Profile ~ res:', res.user);
          Util.showMessage('Profile image updated successfully!', 'success');
          setStateData(prev => ({
            ...prev,
            profileImageLoading: false,
          }));
        },
      }),
    );
  };

  const openDialer = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'Dialer Not Supported',
            'Phone calling is not supported on this device.',
          );
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('Error opening dialer:', err));
  };

  const handleLogOut = async () => {
    setState(prev => ({...prev, logoutModal: false}));

    // Dispatch token removal action
    dispatch({
      type: loginAccesToken.type,
      payload: {
        token: false,
      },
    });

    // Clear all AsyncStorage except LOGIN_USER
    const keysToKeep = [LocalStoragekey.LOGIN_USER, LocalStoragekey.FCM_TOKEN]; // Keep LOGIN_USER
    const allKeys = await AsyncStorage.getAllKeys();
    const keysToRemove = allKeys.filter(key => !keysToKeep.includes(key));
    await AsyncStorage.multiRemove(keysToRemove);

    dispatch({
      type: LOGOUT_API.type,
    });

    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    datahandler.setisNewProject(null);
    // Close the drawer and reset navigation again
    return;
    navigation.closeDrawer();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const toggleNumberOfLines = index => {
    setNumOfLinesMap(prev => ({
      ...prev,
      [index]: prev[index] === 0 ? 1 : 0, // 0 means unlimited lines (expanded)
    }));
  };
  const renderItem = ({item, index}) => (
    <View style={!statedata.showProfile && {opacity: 0.5}} key={index}>
      <TouchableOpacity
        style={styles.actionItem}
        disabled={!statedata.showProfile}
        onPress={() => handleToggle(index)}>
        <View style={styles.profileArrayFlexView}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={styles.iconStyle}
          />
          <Text style={styles.actionText}>{item.name}</Text>
        </View>
        <Image
          resizeMode="contain"
          source={
            statedata.expandedIndex === index
              ? Images.icon.remove
              : Images.icon.plus
          }
          style={styles.plusIconStyle}
        />
      </TouchableOpacity>
      {statedata.expandedIndex === index && index == 0 && (
        <View style={styles.submenuContainer}>
          <View style={styles.interviewFlexView}>
            <ButtonView
              onPress={() => {
                if (statedata?.userProfileData?.resume_link) {
                  NavigationService.navigate(StackNav.WebViewScreen, {
                    title: 'My Resume',
                    url: statedata?.userProfileData?.resume_link,
                    type: 'cv',
                  });
                }
              }}>
              <ScaleText
                numberOfLines={1}
                TextStyle={{
                  width: ms(200),
                  textDecorationLine: 'underline',
                }}
                isDarkMode={isDarkMode}
                color={Colors.Black}
                text={
                  statedata?.userProfileData?.resume_link
                    ? 'Your resume is uploaded'
                    : 'Upload your resume'
                }
              />
            </ButtonView>
            <View style={styles.flexView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handlePickDocument();
                }}>
                {statedata.ResumeLoading ? (
                  <ActivityIndicator size={'small'} color={Colors.White} />
                ) : (
                  <Icon name="cloud-upload" size={ms(18)} color="white" />
                )}
                {/* <Text style={styles.text}>Upload</Text> */}
              </TouchableOpacity>

              {/* Download Button */}
              <TouchableOpacity
                disabled={!statedata?.userProfileData?.resume_link}
                style={[
                  styles.button,
                  {
                    backgroundColor: statedata?.userProfileData?.resume_link
                      ? '#4CAF50'
                      : '#BDBDBD',
                    opacity: statedata?.userProfileData?.resume_link ? 1 : 0.6,
                  },
                ]}
                onPress={() => {
                  downloadFile(statedata?.userProfileData?.resume_link);
                }}>
                {statedata.Resumedownload ? (
                  <ActivityIndicator size={'small'} color={Colors.White} />
                ) : (
                  <Icon name="cloud-download" size={ms(18)} color="white" />
                )}
                {/* <Text style={styles.text}>Download</Text> */}
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                disabled={!statedata?.userProfileData?.resume_link}
                style={[
                  styles.button,
                  styles.deleteButton,
                  {
                    backgroundColor: statedata?.userProfileData?.resume_link
                      ? '#f44336'
                      : '#E0E0E0',
                    opacity: statedata?.userProfileData?.resume_link ? 1 : 0.6,
                  },
                ]}
                onPress={() => {
                  setStateData(prev => ({...prev, deleteModal: true}));
                }}>
                {statedata.ResumeDeleteLoading ? (
                  <ActivityIndicator size={'small'} color={Colors.White} />
                ) : (
                  <Icon
                    name="delete"
                    size={ms(18)}
                    color={
                      statedata?.userProfileData?.resume_link
                        ? 'white'
                        : '#9E9E9E'
                    }
                  />
                )}
                {/* <Text style={styles.text}>Delete</Text> */}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {statedata.expandedIndex === index && index == 1 && (
        <View style={[styles.submenuContainer]}>
          {item.subItems.map((val, subIndex) => {
            const isExpanded = numOfLinesMap[subIndex] === 0;
            return (
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  NavigationService.navigate(StackNav.WebViewScreen, {
                    title: val.title,
                    url: val.photo,
                    id: val.id,
                    key: val.key,
                    type: val.isVideo ? 'video' : 'photo',
                  });
                }}>
                <View
                  key={subIndex}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: ms(20),
                    backgroundColor: Colors.App_Background,
                    height: ms(80),
                    borderRadius: ms(14),
                    marginBottom: ms(10),
                  }}>
                  <ScaleText
                    TextStyle={{
                      textTransform: 'capitalize',
                      width: ms(180),
                    }}
                    fontSize={ms(13)}
                    fontFamily={Fonts.type.Mediu}
                    text={val.title}
                    numberOfLines={isExpanded ? 0 : 1}
                  />
                  <TouchableOpacity
                    onPress={() => toggleNumberOfLines(subIndex)}>
                    <ScaleText
                      fontSize={ms(18)}
                      fontFamily={Fonts.type.Bold}
                      text={isExpanded ? '-' : '+'}
                    />
                  </TouchableOpacity>

                  {val.isVideo ? (
                    <View
                      style={{
                        marginRight: ms(10),
                      }}>
                      <ButtonView
                        onPress={() => {
                          setStateData(prev => ({
                            ...prev,
                            setVideoUrl: val.answer,
                          }));
                        }}>
                        <VectorIcon
                          color={Colors.DarkYellow}
                          size={ms(40)}
                          name={'video-collection'}
                          type={'MaterialIcons'}
                        />
                      </ButtonView>
                    </View>
                  ) : (
                    // <FastImageComponent
                    //   uri={val.photo ?? ''}
                    //   style={{
                    //     width: ms(60),
                    //     height: ms(60),
                    //     borderRadius: ms(4),
                    //     borderWidth: 1,
                    //     borderColor: Colors.more_black[900],
                    //     marginBottom: ms(5),
                    //   }}
                    //   resizeMode="cover"
                    //   fallbackImage={Images.images.Imagenotfound}
                    // />
                    <Image
                      source={
                        val.photo
                          ? {uri: val.photo}
                          : Images.images.Imagenotfound
                      }
                      resizeMode="cover"
                      style={{
                        width: ms(60),
                        height: ms(60),
                        borderRadius: ms(4),
                        borderWidth: 2,
                        borderColor: Colors.more_black[900],
                        marginBottom: ms(5),
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {statedata.expandedIndex === index && index == 3 && (
        <View style={styles.submenuContainer}>
          <View
            style={{
              marginTop: ms(-15),
            }}>
            <TextInput
              onFocus={() => {
                flatListRef.current?.scrollToIndex({
                  index,
                  animated: true,
                  viewPosition: 0.1,
                });
              }}
              blurOnSubmit={true}
              returnKeyType="done"
              value={statedata.userNotes}
              multiline={true}
              textAlignVertical="top"
              label="Personal Notes"
              placeholder="Type Here"
              mode="outlined"
              onChangeText={e => {
                setStateData(prev => ({
                  ...prev,
                  userNotes: e,
                }));
              }}
              placeholderTextColor={'#ccc'}
              style={[
                styles.cuntomStyle,
                {
                  backgroundColor: isDarkMode
                    ? Colors.more_black[900]
                    : Colors.Whiite_FC,
                  fontSize: ms(12),
                  color: 'red',
                },
              ]}
              outlineStyle={{
                borderWidth: 1,
              }}
              outlineColor={Colors.Border}
              activeOutlineColor={Colors.Yellow}
            />
          </View>
          <ButtonView onPress={handleSetNotes}>
            {statedata.notesLoading ? (
              <View style={{position: 'absolute', top: ms(10), right: ms(10)}}>
                <ActivityIndicator size={'small'} color={Colors.DarkYellow} />
              </View>
            ) : (
              <ScaleText
                fontSize={ms(15)}
                TextStyle={styles.saveButtonStyle}
                textAlign={'right'}
                text={'save'}
              />
            )}
          </ButtonView>
        </View>
      )}
    </View>
  );

  // Render Header Content
  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={[styles.header, !statedata.showProfile && {opacity: 0.5}]}>
        <ButtonView
          disabled={!statedata.showProfile}
          onPress={() => setState(prev => ({...prev, logoutModal: true}))}>
          <ImageIcon
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/7175/7175236.png',
            }}
            width={ms(25)}
            height={ms(25)}
          />
        </ButtonView>
        <ScaleText
          isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Mediu}
          fontSize={ms(22)}
          text="Profile"
        />
        <ButtonView
          onPress={() => openDialer(userData?.phone)}
          disabled={!statedata.showProfile}>
          <VectorIcon
            type="FontAwesome"
            name="phone"
            color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_21}
            size={ms(22)}
          />
        </ButtonView>
      </View>

      {/* Profile Picture and Edit Button */}
      <View
        style={[
          styles.profileSection,
          !statedata.showProfile && {opacity: 0.5},
        ]}>
        <View>
          {/* <Image
            source={{
              uri:
                statedata.galleryPhoto?.uri ??
                statedata?.userProfileData?.profile ??
                DummyImage,
            }}
            resizeMode="cover"
            style={styles.profileImage}
          /> */}
          <FastImageComponent
            uri={
              statedata.galleryPhoto?.uri ??
              statedata?.userProfileData?.profile ??
              ''
            }
            style={styles.profileImage}
            resizeMode="cover"
            fallbackImage={Images.images.dummyprofile}
          />
          {statedata.profileImageLoading && (
            <View
              style={{
                position: 'absolute',
                bottom: ms(9),
                left: ms(8),
                backgroundColor: 'black',
                opacity: 0.5,
                width: ms(115),
                height: ms(115),
                borderRadius: 100,
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={'large'} color={Colors.DarkYellow} />
            </View>
          )}
        </View>
        <ButtonView
          disabled={!statedata.showProfile}
          onPress={() =>
            setStateData(prev => ({...prev, showgalleryModal: true}))
          }
          style={styles.profileEditButton}>
          <VectorIcon
            name="edit"
            type="MaterialIcons"
            color={isDarkMode ? Colors.White : Colors.Black}
            size={ms(19)}
          />
        </ButtonView>
      </View>

      {/* User Info */}
      <View style={[styles.userInfo, !statedata.showProfile && {opacity: 0.5}]}>
        <ScaleText
          isDarkMode={isDarkMode}
          color={Colors.Black_02}
          fontSize={ms(21)}
          TextStyle={styles.userName}
          fontFamily={Fonts.type.Mediu}
          text={`${userData?.first_name} ${userData?.last_name}`}
        />
        <ScaleText
          isDarkMode={isDarkMode}
          color={Colors.Black_02}
          text={userData?.role ?? 'Corporate Pilot'}
        />
        <View style={styles.spacer} />
        <View style={styles.flexView}>
          <VectorIcon
            type="FontAwesome"
            name="phone"
            color={isDarkMode ? Colors.Whiite_B8 : Colors.DarkBlue}
            size={ms(15)}
          />
          <ScaleText
            isDarkMode={isDarkMode}
            fontSize={ms(14)}
            TextStyle={styles.contactText}
            text={userData?.phone}
          />
        </View>
        <View style={styles.flexView}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name="email"
            color={isDarkMode ? Colors.Whiite_B8 : Colors.DarkBlue}
            size={ms(15)}
          />
          <ScaleText
            isDarkMode={isDarkMode}
            TextStyle={styles.contactText}
            text={userData?.email}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: ms(50),
          justifyContent: 'space-evenly',
          marginBottom: ms(15),
        }}>
        <ButtonView
          // disabled={!statedata.showProfile ?true : false }
          onPress={() => NavigationService.navigate(StackNav.EditProfile)}
          style={styles.ProfilEdituttonStyle}>
          <VectorIcon
            color={Colors.White}
            size={ms(17)}
            name={'edit'}
            type={'MaterialIcons'}
          />
          <ScaleText
            TextStyle={{marginLeft: ms(5)}}
            color={Colors.White}
            fontSize={ms(14)}
            text={'Edit Profile'}
          />
        </ButtonView>
        <ButtonView
          // onPress={() => NavigationService.navigate(StackNav.Projects)}
          style={styles.ProfilEdituttonStyle}>
          <VectorIcon
            color={Colors.White}
            size={ms(17)}
            name={'bookmark'}
            type={'Ionicons'}
          />
          <ScaleText
            TextStyle={{marginLeft: ms(5)}}
            color={Colors.White}
            fontSize={ms(14)}
            text={'Save Profile'}
          />
        </ButtonView>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: ms(30),
        }}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Roman}
          TextStyle={{
            marginBottom: ms(10),
            fontSize: ms(13),
            fontWeight: '500',
          }}
          text={'Hide your profile?'}
        />
        <CustomToggleSwitch
          isOn={statedata.showProfile}
          onToggle={handleProfileToggle}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={
          isDarkMode ? Colors.more_black[900] : Colors.App_Background
        }
      />
      <Background maincontentContainer={{padding: 0}} isDarkMode={isDarkMode}>
        <Loader type={'CANDIDATE_PROFILE_API'} />
        <FlatList
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          nestedScrollEnabled
          data={ProfileDataArray}
          ListHeaderComponent={renderHeader}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleGetAPISData}
            />
          }
        />
      </Background>
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}></RBSheet>
      <PopupModal
        isModalVisible={statedata.deleteModal}
        GifEnable={true}
        GifSource={Images.icon.warning}
        GifStyle={{width: ms(100), height: ms(100)}}
        title={'Delete'}
        showButtons={true}
        ButtonTitleOne={'Yes'}
        ButtonTitleTwo={'No'}
        ButtonTwoPress={() => {
          setStateData(prev => ({...prev, deleteModal: false}));
        }}
        ButtonOnePress={() => {
          handleDeleteResume();
        }}
        content={'are you shure you want to delete this'}
      />
      <PopupModal
        isModalVisible={state.logoutModal}
        showButtons={true}
        ButtonTitleOne={'Yes'}
        ButtonTitleTwo={'No'}
        ButtonOneLoading={state.logoutLoading}
        ButtonOnePress={() => handleLogOut()}
        ButtonTwoPress={() => {
          setState(prev => ({...prev, logoutModal: false}));
        }}
        title={'Logout Confirmation'}
        description={
          'Are you sure you want to log out? This will end your current session.'
        }
      />
      <HandleImagePicker
        modalVisible={statedata.showgalleryModal}
        onClose={() =>
          setStateData(prev => ({...prev, showgalleryModal: false}))
        }
        onImagePicked={onImagePicked}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
  },
  header: {
    flexDirection: 'row',
    paddingTop: height * 0.05,
    justifyContent: 'space-between',
    height: height * 0.2,
    backgroundColor: isDarkMode
      ? Colors.more_black[900]
      : Colors.App_Background,
    paddingHorizontal: width * 0.05,
  },
  headerTitleStyle: {
    fontWeight: '400',
  },
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * -0.1,
  },
  profileImage: {
    width: '130@ms',
    height: '130@ms',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Colors.White,
  },
  profileEditButton: {
    backgroundColor: Colors.DarkYellow,
    width: width * 0.09,
    height: width * 0.09,
    borderRadius: (width * 0.09) / 2,
    position: 'absolute',
    top: 0,
    right: (width * 0.7) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    marginTop: height * 0.01,
    marginBottom: height * 0.005,
  },
  spacer: {
    // height: height * 0.01,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contactText: {
    fontSize: '12@ms',
    marginLeft: width * 0.02,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.OffYellow,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: 8,
    marginBottom: height * 0.02,
    marginHorizontal: '20@ms',
  },
  actionText: {
    fontSize: '14@ms',
    color: Colors.Black_02,
    fontFamily: Fonts.type.Mediu,
  },
  profileArrayFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: '20@ms',
    height: '20@ms',
    marginRight: '10@ms',
  },
  plusIconStyle: {
    width: '20@ms',
    height: '20@ms',
  },
  submenuContainer: {
    paddingHorizontal: '20@ms',
    marginBottom: '20@ms',
  },
  submenuText: {
    fontSize: '14@ms',
    color: Colors.Black_02,
    marginBottom: height * 0.01,
  },
  buttonStyle: {
    backgroundColor: Colors.DarkYellow,
    width: '50@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  ProfilEdituttonStyle: {
    backgroundColor: Colors.Yellow,
    marginTop: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
    height: '40@ms',
    width: '120@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  interviewFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  interviewBorder: {
    height: 1.5,
    backgroundColor: Colors.Black_B2,
  },
  interViewContainer: {
    marginBottom: '10@ms',
    height: '60@ms',
  },
  calenderViewStyle: {
    backgroundColor: Colors.White,
    flex: 1,
    padding: '10@ms',
    borderRadius: 14,
    shadowColor: Colors.Black,
    elevation: 10,
    marginTop: '5@ms',
  },
  cuntomStyle: {
    marginTop: '10@ms',
    flex: 1,
    width: '330@ms',
    minHeight: '100@ms',
  },
  saveButtonStyle: {
    textDecorationLine: 'underline',
    color: Colors.DarkYellow,
    textTransform: 'uppercase',
    fontFamily: Fonts.type.LightItalic,
    marginRight: '10@ms',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    marginRight: '5@ms',
    padding: '2@ms',
    borderRadius: '4@ms',
    width: '25@ms',
    height: '25@ms',
  },
  deleteButton: {
    backgroundColor: '#dc3545', // Red color for delete
  },
  text: {
    color: 'white',
    fontSize: '10@ms',
  },
  avoidingView: {
    flex: 1,
  },
  textStyle: {
    width: '200@ms',
  },
});
