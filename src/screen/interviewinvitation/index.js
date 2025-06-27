import React, {
  useState,
  useCallback,
  memo,
  useLayoutEffect,
  useEffect,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Text,
  View,
} from 'react-native';
import {AppButton, Background, ScaleText} from '../../common';
import {Colors, Metrics} from '../../theme';
import {ButtonView} from '../../components';
import {VectorIcon} from '../../common';
import CalendarPicker from 'react-native-calendar-picker';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {screenOptions} from '../../naviagtor/config';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import moment from 'moment';
import {
  ACCEPT_INVITATIONS_API,
  CREATE_CHATROOM_API,
  INTERVIEW_DECLINE_API,
} from '../../ducks/app';
import {createOrFetchChatroom} from '../interview/helper';
import {FIREBASE_CHAT_KEY} from '../../config/AppConfig';
import {getUserData} from '../../ducks/auth';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Clipboard from '@react-native-clipboard/clipboard';
import {useToast} from 'react-native-toast-notifications';
import {Calendar} from 'react-native-calendars';
import {handleSendNotification} from '../../utils/Notification';

const isDarkMode = datahandler.getAppTheme();
const {width, height} = Dimensions.get('screen');

const meetingOptions = [
  {
    id: 1,
    type: 'Video Call',
    name: 'Ionicons',
    icon: 'videocam',
    background: Colors.Yellow,
  },
  {
    id: 2,
    type: 'Phone Call',
    name: 'FontAwesome',
    icon: 'phone',
    background: Colors.White_F6,
  },
  {
    id: 3,
    type: 'In-person Meeting',
    name: 'Ionicons',
    icon: 'location',
    background: Colors.White_F6,
  },
];

const InterviewInvitations = ({navigation, route}) => {
  const InterViewData = route?.params?.data;
  console.log('🚀 ~ InterviewInvitations ~ InterViewData:', InterViewData);
  const isDisabled = route?.params?.type;

  const [statedata, setStateData] = useState({
    interviewType: 'Video Call',
    interviewTime: null,
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const loginData = useSelector(getUserData);
  const [selectedDate, setSelectedDate] = useState(null);
  const [interviewTime, setInterViewTime] = useState(null);
  const [filteredSlots, setFilteredSlots] = useState([]);

  const [isloading, setIsLoading] = useState(false);
  const [rejectloading, setrejectLoading] = useState(false);

  const jobDetails = [
    {label: 'Industry:', value: InterViewData?.project?.requirement?.industry},
    {label: 'Job Type:', value: InterViewData?.project?.requirement?.job_title},
    {label: 'Location:', value: InterViewData?.project?.requirement?.location},
    {
      label: 'Salary range:',
      value: `$${InterViewData?.project?.academic_requirement?.salary_between}`,
    },
    {
      label: 'Date & Time:',
      value: InterViewData?.project?.requirement?.start_date,
    },
  ];

  useEffect(() => {
    getBookedSlot();
  }, []);

  const getBookedSlot = async () => {
    const bookedSlots = InterViewData?.available_slots.filter(
      item => item.status === 'booked',
    );
    bookedSlots.forEach(slot => {
      const date = slot.start_time.split(' ')[0];
      const startTime = slot.start_time.split(' ')[1];
      const endTime = slot.end_time.split(' ')[1];

      console.log(`📅 Date: ${date}`);
      setSelectedDate(date);
      setInterViewTime(`${startTime} - ${endTime}`);
      console.log(`🕒 Time: ${startTime} - ${endTime}`);
    });
  };

  const availableDates = [
    ...new Set(
      InterViewData?.available_slots?.map(slot =>
        moment(slot.start_time).format('YYYY-MM-DD'),
      ),
    ),
  ];

  // const isDateDisabled = date => {
  //   const formatted = moment(date).format('YYYY-MM-DD');
  //   return !availableDates.includes(formatted);
  // };

  // const customDatesStyles = availableDates.map(date => ({
  //   date: moment(date, 'YYYY-MM-DD'),
  //   style: {backgroundColor: Colors.Yellow},
  //   textStyle: {color: Colors.White},
  // }));

  // Memoized callbacks to prevent unnecessary re-renders
  // const handleMeetingTypeChange = useCallback(
  //   type => setStateData(prev => ({...prev, interviewType: type})),
  //   [],
  // );

  // const handleTimeSelection = useCallback(
  //   time => setStateData(prev => ({...prev, interviewTime: time})),
  //   [],
  // );

  // const handleDateChange = date => {
  //   const formatted = moment(date).format('YYYY-MM-DD');
  //   setSelectedDate(formatted);

  //   const slots = InterViewData.available_slots.filter(
  //     slot => moment(slot.start_time).format('YYYY-MM-DD') === formatted,
  //   );

  //   setFilteredSlots(slots);
  // };

  const handleDayPress = day => {
    const date = day.dateString;
    setSelectedDate(date);

    const slots = InterViewData.available_slots.filter(
      slot => moment(slot.start_time).format('YYYY-MM-DD') === date,
    );

    setFilteredSlots(slots);
  };

  const handleTimeSelection = useCallback(
    time => setStateData(prev => ({...prev, interviewTime: time})),
    [],
  );

  const markedDates = {};

  availableDates.forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: 'orange',
      selected: selectedDate === date,
      selectedColor: '#f7c000',
      selectedTextColor: '#ffffff',
      disabled: false,
      disableTouchEvent: false,
    };
  });

  // Optional: Disable all other dates in the visible range (next 60 days)
  for (let i = 0; i < 60; i++) {
    const date = moment().add(i, 'days').format('YYYY-MM-DD');
    if (!availableDates.includes(date)) {
      markedDates[date] = {
        disabled: true,
        disableTouchEvent: true,
      };
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Interview Invitations',
      ),
    );
  }, [navigation, statedata, isDarkMode]);

  const formatSlotTime = (start, end) => {
    return `${moment(start).format('hh:mm A')} - ${moment(end).format(
      'hh:mm A',
    )}`;
  };

  const handleCreateChatRoom = async () => {
    try {
      const values = {
        user_id: InterViewData?.client?.id,
      };
      setIsLoading(true);
      dispatch(
        CREATE_CHATROOM_API.request({
          payloadApi: values,
          cb: async data => {
            const roomId = await createOrFetchChatroom(
              loginData.id,
              InterViewData?.client?.id,
              InterViewData?.project?.name,
            );
            if (!roomId) return;

            const messagesRef = firestore()
              .collection(FIREBASE_CHAT_KEY)
              .doc(roomId);
            setIsLoading(false);
            NavigationService.navigate(StackNav.GiftChat, {
              data: InterViewData?.client,
              chatroom_id: roomId,
              projectName: InterViewData?.project?.name,
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

  function formattedId(id) {
    if (id < 10) return `00${id}`;
    if (id < 100) return `0${id}`;
    return `${id}`;
  }

  const handleAccept = () => {
    if (!statedata?.interviewTime?.id) {
      Util.showMessage('Time slot is required');
      return;
    }
    const formData = new FormData();
    formData.append('interview_invitation_id', InterViewData?.interview?.id);
    formData.append(
      'contractor_project_id',
      InterViewData.project?.contractor_project_id,
    );
    formData.append(
      'interview_available_slot_id',
      statedata?.interviewTime?.id,
    );
    formData.append('client_user_id', InterViewData.client?.id);
    formData.append('candidate_user_id', loginData?.id);
    dispatch(
      ACCEPT_INVITATIONS_API.request({
        payloadApi: formData,
        cb: async data => {
          await handleSendNotification(
            dispatch,
            InterViewData?.client?.id,
            'Success!',
            `Candidate${formattedId(loginData?.id)} Accepted Your Invitation`,
          );
          NavigationService.navigate(StackNav.Projects);
        },
      }),
    );
  };

  const handleReject = async () => {
    setrejectLoading(true);
    const formData = new FormData();
    formData.append('interview_invitation_id', InterViewData?.interview?.id);
    dispatch(
      INTERVIEW_DECLINE_API.request({
        payloadApi: formData,
        cb: data => {
          setrejectLoading(false);
          NavigationService.navigate(StackNav.Projects);
        },
      }),
    );
  };

  const onLongPress = msg => {
    Clipboard.setString(msg);
    toast.show('Message copied to clipboard');
  };

  return (
    <Background isDarkMode={isDarkMode}>
      <Animated.View style={styles.sectionMenu}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={ms(15)}
          color={Colors.Black}
          text={InterViewData?.interview?.interview_name}
        />
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={ms(13)}
          color={Colors.Black_4A}
          text={InterViewData?.project?.requirement?.industry}
        />
        <FlatList
          data={jobDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.flexView}>
              <ScaleText
                fontSize={ms(13)}
                color={Colors.Black_8b}
                text={item.label}
              />
              <ScaleText
                fontSize={ms(13)}
                color={Colors.Black_8b}
                text={item.value}
              />
            </View>
          )}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.sectionMenu,
          {
            backgroundColor: isDarkMode
              ? Colors.more_black[800]
              : Colors.White_F6,
          },
        ]}>
        <View style={{marginBottom: ms(10)}}>
          <ScaleText
            isDarkMode={isDarkMode}
            fontSize={ms(15)}
            color={Colors.Black}
            text={'Job Description'}
          />
        </View>
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={ms(13)}
          color={Colors.Black_4A}
          text={InterViewData?.project?.description}
        />
      </Animated.View>

      <View style={styles.meetingOptionsContainer}>
        <ButtonView>
          <View
            style={[
              styles.meetingOption,
              {
                backgroundColor:
                  InterViewData?.interview?.meeting_type === 'video_call'
                    ? Colors.Yellow
                    : isDarkMode
                    ? Colors.more_black[900]
                    : Colors.White,
              },
            ]}>
            <VectorIcon
              type={'Ionicons'}
              name={'videocam'}
              color={
                InterViewData?.interview?.meeting_type === 'video_call'
                  ? Colors.White
                  : isDarkMode
                  ? Colors.Whiite_B1
                  : Colors.Black
              }
              size={ms(22)}
            />
            <Text
              style={[
                styles.meetingOptionText,
                {
                  color:
                    InterViewData?.interview?.meeting_type === 'video_call'
                      ? Colors.White
                      : isDarkMode
                      ? Colors.Whiite_B1
                      : Colors.Black_4A,
                },
              ]}>
              {'Video Call'}
            </Text>
          </View>
        </ButtonView>
        <ButtonView>
          <View
            style={[
              styles.meetingOption,
              {
                backgroundColor:
                  InterViewData?.interview?.meeting_type === 'phone_call'
                    ? Colors.Yellow
                    : isDarkMode
                    ? Colors.more_black[900]
                    : Colors.White,
              },
            ]}>
            <VectorIcon
              type={'FontAwesome'}
              name={'phone'}
              color={
                InterViewData?.interview?.meeting_type === 'phone_call'
                  ? Colors.White
                  : isDarkMode
                  ? Colors.Whiite_B1
                  : Colors.Black
              }
              size={ms(22)}
            />
            <Text
              style={[
                styles.meetingOptionText,
                {
                  color:
                    InterViewData?.interview?.meeting_type === 'phone_call'
                      ? Colors.White
                      : isDarkMode
                      ? Colors.Whiite_B1
                      : Colors.Black_4A,
                },
              ]}>
              {'Phone Call'}
            </Text>
          </View>
        </ButtonView>
        <ButtonView>
          <View
            style={[
              styles.meetingOption,
              {
                backgroundColor:
                  InterViewData?.interview?.meeting_type === 'in_person'
                    ? Colors.Yellow
                    : isDarkMode
                    ? Colors.more_black[900]
                    : Colors.White,
              },
            ]}>
            <VectorIcon
              type={'Ionicons'}
              name={'location'}
              color={
                InterViewData?.interview?.meeting_type === 'in_person'
                  ? Colors.White
                  : isDarkMode
                  ? Colors.Whiite_B1
                  : Colors.Black
              }
              size={ms(22)}
            />
            <Text
              style={[
                styles.meetingOptionText,
                {
                  color:
                    InterViewData?.interview?.meeting_type === 'in_person'
                      ? Colors.White
                      : isDarkMode
                      ? Colors.Whiite_B1
                      : Colors.Black_4A,
                },
              ]}>
              {'In-person Meeting'}
            </Text>
          </View>
        </ButtonView>
      </View>

      <View
        style={{
          backgroundColor: Colors.App_Background,
          flex: 1,
          height: 70,
          borderWidth: 1,
          borderColor: Colors.Border,
          borderRadius: 8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: ms(10),
        }}>
        <ScaleText
          text={
            InterViewData?.interview?.meeting_type === 'phone_call'
              ? InterViewData?.client?.phone
              : InterViewData?.interview?.meeting_mode
          }
        />
        <ButtonView
          onPress={() => {
            onLongPress(
              InterViewData?.interview?.meeting_type === 'phone_call'
                ? InterViewData?.client?.phone
                : InterViewData?.interview?.meeting_mode,
            );
          }}>
          <VectorIcon size={ms(18)} name={'paperclip'} type={'Fontisto'} />
        </ButtonView>
      </View>

      <View style={styles.durationContainer}>
        <View style={{marginBottom: ms(5)}}>
          <ScaleText
            isDarkMode={isDarkMode}
            fontSize={ms(15)}
            color={Colors.Black}
            text={'Duration'}
          />
        </View>
        <View style={styles.durationContent}>
          <VectorIcon
            type="Octicons"
            name="clock"
            color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_61}
            size={ms(18)}
          />
          <ScaleText
            fontSize={ms(14)}
            color={isDarkMode ? Colors.White : Colors.Black}
            text={`${InterViewData?.interview?.duration} min`}
          />
        </View>
      </View>

      <View style={styles.calendarContainer}>
        {/* <CalendarPicker
          // onDateChange={handleDateChange}
          disabledDates={isDateDisabled}
          yearTitleStyle={styles.calendarTitle}
          monthTitleStyle={styles.calendarTitle}
          textStyle={styles.calendarTextStyle}
          // previousTitleStyle={styles.calendarArrow}
          // nextTitleStyle={styles.calendarArrow}
          width={Metrics.scaleHorizontal(330)}
          selectedDayColor={Colors.DarkYellow}
          selectedDayTextColor={Colors.White}
          previousTitle=""
          nextTitle=""
          todayBackgroundColor={Colors.Yellow}
        /> */}
        {/* <CalendarPicker
          onDateChange={handleDateChange}
          disabledDates={isDateDisabled}
          yearTitleStyle={styles.calendarTitle}
          monthTitleStyle={styles.calendarTitle}
          textStyle={styles.calendarTextStyle}
          width={Metrics.scaleHorizontal(330)}
          selectedDayColor={Colors.DarkYellow}
          selectedDayTextColor={Colors.White}
          previousTitle=""
          nextTitle=""
          todayBackgroundColor={Colors.Yellow}
        /> */}
        <Calendar
          current={moment().format('YYYY-MM-DD')}
          minDate={moment().format('YYYY-MM-DD')}
          onDayPress={handleDayPress}
          markedDates={markedDates}
          markingType={'multi-dot'}
          hideExtraDays
          disableAllTouchEventsForDisabledDays={true}
          disableMonthChange={true}
          hideArrows={true}
          theme={{
            selectedDayBackgroundColor: '#f7c000',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#000000',
            textSectionTitleColor: '#000000',

            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayTextColor: '#ffffff',
            dayTextColor: '#2d4150',
          }}
        />
      </View>

      <View style={styles.datePickerContainer}>
        <ScaleText
          fontSize={ms(15)}
          color={isDarkMode ? Colors.White : Colors.Black}
          text={'Time Zone'}
        />
        <View style={styles.timeZoneRow}>
          <View style={{marginRight: ms(5)}}>
            <VectorIcon
              type="MaterialIcons"
              name="public"
              color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_61}
              size={ms(18)}
            />
          </View>
          <ScaleText
            fontSize={ms(14)}
            color={isDarkMode ? Colors.Whiite_C1 : Colors.Black_61}
            text={InterViewData?.interview?.timezone}
          />
        </View>
      </View>

      <View>
        <ScaleText
          fontSize={ms(15)}
          color={isDarkMode ? Colors.White : Colors.Black}
          text={!isDisabled ? 'Your Time' : 'Please Select Your Time'}
        />
      </View>

      <View style={styles.timeSelectionContainer}>
        {filteredSlots.length > 0 ? (
          <View style={styles.slotsContainer}>
            <FlatList
              data={filteredSlots}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 20,
              }}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={({item, index}) => {
                const isSelected = statedata.interviewTime?.id === item.id;
                const bgColor = isSelected
                  ? isDarkMode
                    ? Colors.more_black[900]
                    : Colors.Yellow
                  : isDarkMode
                  ? Colors.Back_70
                  : Colors.White;

                const textColor = isSelected ? Colors.White : Colors.Yellow;

                return (
                  <ButtonView
                    onPress={() => handleTimeSelection(item)}
                    key={index}>
                    <View
                      style={[styles.timeButton, {backgroundColor: bgColor}]}>
                      <Text style={[styles.timeText, {color: textColor}]}>
                        {formatSlotTime(item.start_time, item.end_time)}
                      </Text>
                    </View>
                  </ButtonView>
                );
              }}
            />
          </View>
        ) : !selectedDate ? (
          <ScaleText
            text={'Please select a date to see available time slots.'}
          />
        ) : null}
      </View>

      {!isDisabled &&<View
        style={[
          styles.timeButton,
          {backgroundColor: Colors.DarkYellow,alignSelf:'center',width:ms(200)},
        ]}>
        <Text style={[styles.timeText, {color: Colors.White}]}>
          {interviewTime}
        </Text>
      </View>}

      {isDisabled && (
        <AppButton
          disabled={!statedata?.interviewTime?.id}
          type={'ACCEPT_INVITATIONS'}
          onPress={() => handleAccept()}
          BackgroundColor={isDarkMode ? Colors.more_black[800] : Colors.Black}
          title={'Submit'}
        />
      )}
      <View style={styles.actionButtons}>
        {isDisabled && (
          <ButtonView onPress={() => handleReject()}>
            <View style={[styles.submitButton, {width: width * 0.3}]}>
              {rejectloading ? (
                <ActivityIndicator size={'small'} color={Colors.DarkYellow} />
              ) : (
                <ScaleText
                  isDarkMode={isDarkMode}
                  color={Colors.Black}
                  text={'Decline'}
                />
              )}
            </View>
          </ButtonView>
        )}
        <ButtonView onPress={() => handleCreateChatRoom()}>
          <View
            style={[
              styles.submitButton,
              {width: !isDisabled ? ms(350) : width * 0.5},
            ]}>
            {isloading ? (
              <ActivityIndicator size={'small'} color={Colors.DarkYellow} />
            ) : (
              <ScaleText
                isDarkMode={isDarkMode}
                color={Colors.Black}
                text={'Chat with Recruiter'}
              />
            )}
          </View>
        </ButtonView>
      </View>
    </Background>
  );
};

export default InterviewInvitations;

const styles = ScaledSheet.create({
  sectionMenu: {
    marginVertical: width * 0.02,
    padding: '20@ms',
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: height * 0.23,
  },
  flexView: {flexDirection: 'row'},
  meetingOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.05,
  },
  meetingOption: {
    alignItems: 'center',
    padding: '10@ms',
    borderRadius: 10,
    width: '95@ms',
    height: '90@ms',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.White_EB,
  },
  meetingOptionText: {
    marginLeft: '10@ms',
    marginTop: '10@ms',
    textAlign: 'center',
    fontSize: '12@ms',
  },
  durationContainer: {
    marginTop: width * 0.02,
    marginBottom: width * 0.04,
  },
  durationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60@ms',
  },
  calendarContainer: {
    paddingVertical: height * 0.02,
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    marginBottom: '15@ms',
  },
  calendarTitle: {
    color: isDarkMode ? Colors.White : Colors.Black,
    fontSize: '17@ms',
    fontWeight: 'bold',
  },
  calendarTextStyle: {
    fontSize: '12@ms',
    color: isDarkMode ? Colors.Whiite_B1 : Colors.Black,
  },
  calendarArrow: {
    fontSize: '20@ms',
    color: isDarkMode ? Colors.Whiite_B1 : Colors.Black,
  },
  datePickerContainer: {paddingVertical: height * 0.01},
  timeZoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10@ms',
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: width * 0.05,
  },
  timeButton: {
    maxWidth: '250@ms',
    height: '35@ms',
    padding: '5@ms',
    // paddingVertical: width * 0.025,
    // paddingHorizontal: width * 0.03,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.Yellow,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '10@ms',
  },
  timeText: {
    fontSize: '12@ms',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.02,
  },
  submitButton: {
    borderColor: isDarkMode ? Colors.White : Colors.Black,
    borderWidth: 1,
    padding: width * 0.03,
    borderRadius: 26,
    alignItems: 'center',
  },
});
