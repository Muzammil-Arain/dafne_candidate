import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Animated,
  Image,
  ActivityIndicator,
  AppState,
} from 'react-native';
import {screenOptions} from '../../naviagtor/config';
import {Background, ScaleText} from '../../common';
import {ButtonView, Loader} from '../../components';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {getUserData} from '../../ducks/auth';
import {useDispatch, useSelector} from 'react-redux';
import {createOrFetchChatroom} from './helper';
import {FIREBASE_CHAT_KEY, NOTIFICATION_KEYS} from '../../config/AppConfig';
import {
  CREATE_CHATROOM_API,
  GET_INVITATIONS_API,
  INTERVIEW_ACCEPT_API,
  INTERVIEW_DECLINE_API,
  INTERVIEW_HISTORY_API,
} from '../../ducks/app';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {handleSendNotification} from '../../utils/Notification';
import {
  onNotification,
  removeNotificationListener,
} from '../../utils/NotificationListner';

const isDarkMode = datahandler.getAppTheme();
const Invitations = 'Invitations';
const History = 'History';

const Interview = ({navigation, route}) => {
  // const InterViewData = route?.params?.data;
  const Projectid = route?.params?.id;
  const appState = useRef(AppState.currentState);

  const isfoucsed = useIsFocused();
  const loginData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [chatroomid, setChatRoomid] = useState(null);
  const [InterViewData, setInterViewData] = useState([]);
  const [historydata, setHistoryData] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [fullscreenloading, setFullScreenLoading] = useState(true);
  const [interviewInterest, setInterviewInterest] = useState({});
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [statedata, setStateData] = useState({
    intersted: true,
    selectedType: Invitations,
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [navigation, statedata.intersted]);

  useEffect(() => {
    handleGetData();
  }, []);

  const handleGetData = () => {
    const formData = new FormData();
    formData.append('candidate_preferable_industry_id', Projectid);
    dispatch(
      GET_INVITATIONS_API.request({
        payloadApi: formData,
        cb: res => {
          setInterViewData(res?.invitations?.reverse());
        },
      }),
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        statedata.selectedType === Invitations
          ? 'Interview Invitations'
          : 'Interview History',
      ),
    );
  }, [navigation, statedata, isDarkMode]);

  const handleToggle = value => {
    setStateData(prev => ({...prev, selectedType: value}));
  };

  const handleInterestChange = (interviewId, type, value) => {
    setInterviewInterest(prev => ({
      ...prev,
      [interviewId]: type,
    }));

    if (type === 'interested') {
      const formData = new FormData();
      formData.append('interview_invitation_id', interviewId);

      dispatch(
        INTERVIEW_ACCEPT_API.request({
          payloadApi: formData,
          cb: async data => {
            setFullScreenLoading(false);
            await handleSendNotification(
              dispatch,
              InterViewData?.client?.id,
              'Good News!',
              `You Have a New Interested Candidate`,
            );
            NavigationService.navigate(StackNav.Projects);
          },
        }),
      );
      // NavigationService.navigate(StackNav.InterviewInvitations, {
      //   data: value,
      // });
    }
  };

  const handleReject = async interviewId => {
    setFullScreenLoading(true);
    const formData = new FormData();
    formData.append('interview_invitation_id', interviewId);

    dispatch(
      INTERVIEW_DECLINE_API.request({
        payloadApi: formData,
        cb: data => {
          setFullScreenLoading(false);
          NavigationService.navigate(StackNav.Projects);
        },
      }),
    );
  };

  useEffect(() => {
    const handleNotification = async remoteMessage => {
      if (
        remoteMessage?.notification?.title ==
        NOTIFICATION_KEYS.Interviewscheduled
      ) {
        await getHistroyApiData();
      }
    };
    onNotification(handleNotification);

    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('📲 App resumed from background');
          await getHistroyApiData();
        }

        appState.current = nextAppState;
      },
    );

    return () => {
      removeNotificationListener(handleNotification);
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    getHistroyApiData();
    // handleCreateChatRoom();
  }, [isfoucsed]);

  const getHistroyApiData = () => {
    const formData = new FormData();
    formData.append('candidate_preferable_industry_id', Projectid);

    dispatch(
      INTERVIEW_HISTORY_API.request({
        payloadApi: formData,
        cb: res => {
          setHistoryData(res?.invitation?.reverse());
        },
      }),
    );
  };

  const handleCreateChatRoom = async val => {
    const userData = val.client;
    try {
      const values = {
        user_id: userData?.id,
      };
      // setIsLoading(true);
      dispatch(
        CREATE_CHATROOM_API.request({
          payloadApi: values,
          cb: async data => {
            const roomId = await createOrFetchChatroom(
              loginData.id,
              userData?.id,
              val?.project?.name,
            );
            if (!roomId) return;

            setChatRoomid(roomId);

            const messagesRef = firestore()
              .collection(FIREBASE_CHAT_KEY)
              .doc(roomId);
            setIsLoading(false);
            NavigationService.navigate(StackNav.GiftChat, {
              data: userData,
              chatroom_id: roomId,
              projectName: val?.project?.name,
            });
            const unsubscribe = messagesRef.onSnapshot(snapshot => {
              // Real-time listener for messages (add logic here if needed)
              // Example:
              // const loadedMessages = snapshot.data()?.messages ?? [];
              // setMessages(loadedMessages);
            });

            // Optional: store unsubscribe in ref/state if you need to clean it later
            // unsubscribeRef.current = unsubscribe;
          },
        }),
      );
    } catch (error) {
      setIsLoading(false);
      console.error('Error in handleCreateChatRoom:', error);
    }
  };

  // ToggleButton Component
  const ToggleButton = ({label, isSelected, onPress}) => (
    <ButtonView onPress={onPress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor:
              isSelected && isDarkMode
                ? Colors.more_black[800]
                : isSelected && !isDarkMode
                ? Colors.Black_21
                : Colors.White,
            borderColor: isSelected ? Colors.Black_21 : Colors.Back_70,
          },
        ]}>
        <ScaleText
          text={label}
          fontFamily={Fonts.type.Mediu}
          fontSize={ms(15)}
          color={isSelected ? Colors.White : Colors.Back_70}
        />
      </View>
    </ButtonView>
  );

  // JobItem Component
  const JobItem = ({animationValue, statedata, setStateData}) => {
    // const slideIn = {
    //   transform: [
    //     {
    //       translateY: animatedValue.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [30, 0],
    //       }),
    //     },
    //   ],
    //   opacity: animatedValue,
    // };
    return (
      <Animated.View>
        {/* Job Details */}
        {InterViewData?.length > 0 ? (
          InterViewData?.map(value => {
            console.log(value, 'valuevaluevaluevaluevaluevaluevaluevalue');

            const interviewId = value?.interview?.id;
            const selected = interviewInterest[interviewId];
            return (
              <View style={[styles.sectionMenu]}>
                <View style={styles.flexView}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontFamily={Fonts.type.Mediu}
                    TextStyle={{marginRight: ms(8)}}
                    fontSize={ms(14)}
                    color={Colors.Black_21}
                    text={'Job Name:'}
                  />
                  <ScaleText
                    fontFamily={Fonts.type.Mediu}
                    fontSize={ms(14)}
                    color={Colors.DarkYellow}
                    text={value?.project?.name}
                  />
                </View>
                <View style={styles.flexView}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontFamily={Fonts.type.Mediu}
                    TextStyle={{marginRight: ms(8)}}
                    fontSize={ms(14)}
                    color={Colors.Black_21}
                    text={'Industry:'}
                  />
                  <ScaleText
                    fontFamily={Fonts.type.Mediu}
                    fontSize={ms(14)}
                    color={Colors.DarkYellow}
                    text={value?.project?.requirement?.industry}
                  />
                </View>
                <View style={styles.flexView}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontFamily={Fonts.type.Mediu}
                    TextStyle={{marginRight: ms(8)}}
                    fontSize={ms(14)}
                    color={Colors.Black_21}
                    text={'Position:'}
                  />
                  <ScaleText
                    fontFamily={Fonts.type.Mediu}
                    fontSize={ms(14)}
                    color={Colors.DarkYellow}
                    text={value?.project?.requirement?.job_title}
                  />
                </View>
                {/* Interested and Not Interested Buttons */}
                <View style={styles.interestedContainer}>
                  <ButtonView
                    onPress={() =>
                      // handleInterestChange(interviewId, 'interested', value)
                      NavigationService.navigate(
                        StackNav.InterviewInvitations,
                        {
                          data: value,
                          type: true,
                        },
                      )
                    }
                    style={[
                      styles.buttonStyle,
                      {
                        backgroundColor:
                          selected === 'interested'
                            ? Colors.Yellow
                            : Colors.White_F8,
                      },
                    ]}>
                    <ScaleText
                      color={
                        selected === 'interested'
                          ? Colors.White
                          : Colors.Black_02
                      }
                      textAlign={'center'}
                      text={'Interested'}
                    />
                  </ButtonView>
                  <ButtonView
                    onPress={() => handleReject(value?.interview?.id)}
                    style={[
                      styles.buttonStyle,
                      {
                        backgroundColor:
                          selected === 'not_interested'
                            ? Colors.Yellow
                            : Colors.White_F8,
                      },
                    ]}>
                    <ScaleText
                      color={
                        selected === 'not_interested'
                          ? Colors.White
                          : Colors.Black_02
                      }
                      textAlign={'center'}
                      text={'Not Interested'}
                    />
                  </ButtonView>
                </View>

                {/* View Job Description Button */}
                <ButtonView
                  onPress={() =>
                    NavigationService.navigate(StackNav.JobDescription, {
                      data: value,
                    })
                  }>
                  <View style={styles.jobDescriptionViewStyle}>
                    <ScaleText
                      isDarkMode={isDarkMode}
                      color={Colors.Black}
                      text={'View Job Description'}
                    />
                  </View>
                </ButtonView>
              </View>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: ms(40),
            }}>
            <ScaleText fontSize={ms(17)} text={'No Invitation Found... !'} />
          </View>
        )}
      </Animated.View>
    );
  };

  const JobHistory = ({animationValue, statedata, setStateData}) => {
    // const slideIn = {
    //   transform: [
    //     {
    //       translateY: animationValue.interpolate({
    //         inputRange: [0, 1],
    //         outputRange: [30, 0],
    //       }),
    //     },
    //   ],
    //   opacity: animationValue,
    // };

    return (
      <Animated.View>
        {statedata && statedata.length > 0 ? (
          statedata.map((val, i) => {
            console.log('🚀 ~ statedata.map ~ val:', val);

            const {
              industry = val.project.requirement.industry,
              jobType = val.project.requirement.job_title,
              location = val.project.requirement.location,
              datetime = val.project.requirement.start_date,
              meeting_type = val.interview.meeting_type,
              meeting_mode = val.interview.meeting_type === 'phone_call'
                ? val?.client?.phone
                : val?.interview?.meeting_mode,
            } = val;

            const details = [
              {label: 'Industry:', value: industry},
              {label: 'Job Type:', value: jobType},
              {label: 'Location:', value: location},
              {
                label: 'Salary range:',
                value: `$${val.project.academic_requirement.salary_between} - $${val.project.academic_requirement.salary_and}`,
              },
              {label: 'Start-Date:', value: datetime},
              meeting_type && {label: 'Meeting Type:', value: meeting_type},
              meeting_mode && {label: 'Meeting Mode:', value: meeting_mode}, // fixed condition
            ].filter(Boolean); // removes any `false` or `undefined` entries

            return (
              <View
                style={[
                  styles.sectionMenu,
                  // slideIn,
                  {
                    height: ms(meeting_type ? 250 : 210),
                  },
                ]}
                key={i}>
                {details.map(({label, value}, index) => (
                  <View key={index} style={styles.flexView}>
                    <ScaleText
                      TextStyle={{marginRight: ms(8)}}
                      fontSize={ms(14)}
                      color={Colors.Black_8b}
                      text={label}
                    />
                    <ScaleText
                      fontSize={ms(14)}
                      color={Colors.Black_8b}
                      text={value}
                    />
                  </View>
                ))}

                {/* View Job Description Button */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: ms(30),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (val.interview.status == 'interview_scheduled') {
                        NavigationService.navigate(
                          StackNav.InterviewInvitations,
                          {
                            data: val,
                            type: false,
                          },
                        );
                      }
                    }}
                    // disabled={
                    //   val.interview.status !== 'detail_send' ? true : false
                    // }
                    style={[
                      styles.jobHistoryViewStyle,
                      {
                        backgroundColor:
                          val.interview.status !== 'detail_send'
                            ? Colors.more_black[800]
                            : Colors.Black,
                      },
                    ]}>
                    <ScaleText
                      color={Colors.White}
                      text={
                        {
                          invite_rejected: 'Not Interested',
                          invite_accepted: 'Invite Accepted',
                          interview_scheduled: 'Scheduled',
                        }[val.interview.status] || 'Schedule'
                      }
                    />
                  </TouchableOpacity>

                  {val.interview.status !== 'invite_rejected' && (
                    <ButtonView onPress={() => handleCreateChatRoom(val)}>
                      {isloading ? (
                        <ActivityIndicator
                          size={'small'}
                          color={Colors.DarkYellow}
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          source={Images.icon.chat_icon}
                          style={{width: ms(30), height: ms(30)}}
                        />
                      )}
                    </ButtonView>
                  )}
                </View>
              </View>
            );
          })
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: ms(40),
            }}>
            <ScaleText fontSize={ms(17)} text={'No History Found... !'} />
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <Background isDarkMode={isDarkMode}>
      {/* Toggle Button Row */}
      <Loader type={'GET_INVITATIONS'} />
      <View style={styles.toggleContainer}>
        <ToggleButton
          label={Invitations}
          isSelected={statedata.selectedType === Invitations}
          onPress={() => handleToggle(Invitations)}
        />
        <ToggleButton
          label={History}
          isSelected={statedata.selectedType === History}
          onPress={() => handleToggle(History)}
        />
      </View>
      {/* Animated View for Job List */}
      {/* <FlatList
        data={[1]}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => {
          return statedata.selectedType === Invitations ? (
            <JobItem statedata={statedata} setStateData={setStateData} />
          ) : (
            <JobHistory statedata={historydata} setStateData={setStateData} />
          );
        }}
        contentContainerStyle={styles.listContentContainer}
      /> */}

      {statedata.selectedType === Invitations ? (
        <JobItem
          statedata={statedata}
          setStateData={setStateData}
          interviewInterest={interviewInterest}
          handleInterestChange={handleInterestChange}
        />
      ) : (
        <JobHistory statedata={historydata} setStateData={setStateData} />
      )}
      <Loader type={'CREATE_CHATROOM'} />
      <Loader type={'INTERVIEW_DECLINE'} />
      <Loader type={'INTERVIEW_ACCEPT'} />
    </Background>
  );
};

export default Interview;
