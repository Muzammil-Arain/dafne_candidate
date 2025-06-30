import React, {useState, useCallback, memo, useLayoutEffect} from 'react';
import {
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
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {screenOptions} from '../../naviagtor/config';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme()
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

const jobDetails = [
  {label: 'Industry:', value: 'Corporate'},
  {label: 'Job Type:', value: 'Design'},
  {label: 'Location:', value: 'NY 1011.Street 13 New York'},
  {label: 'Salary range:', value: '$10,000'},
  {label: 'Date & Time:', value: 'Aug, 15 2024 - 10:00 am'},
];

const InterviewInvitations = ({navigation}) => {
  const [statedata, setStateData] = useState({
    interviewType: 'Video Call',
    interviewTime: null,
  });

  // Memoized callbacks to prevent unnecessary re-renders
  const handleMeetingTypeChange = useCallback(
    type => setStateData(prev => ({...prev, interviewType: type})),
    [],
  );

  const handleTimeSelection = useCallback(
    time => setStateData(prev => ({...prev, interviewTime: time})),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Interview Invitations',
      )
    );
  }, [navigation,statedata, isDarkMode]);

  return (
    <Background isDarkMode={isDarkMode}>
      <Animated.View style={styles.sectionMenu}>
        <ScaleText
        isDarkMode={isDarkMode}
          fontSize={ms(15)}
          color={Colors.Black}
          text={'Managing Director'}
        />
        <ScaleText
        isDarkMode={isDarkMode}
          fontSize={ms(13)}
          color={Colors.Black_4A}
          text={'Ingenious Solution (Private Limited)'}
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
        style={[styles.sectionMenu, {backgroundColor: isDarkMode ? Colors.more_black[800] : Colors.White_F6}]}>
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
          text={
            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout...'
          }
        />
      </Animated.View>

      <View style={styles.meetingOptionsContainer}>
        {meetingOptions.map(option => (
          <ButtonView
            onPress={() => handleMeetingTypeChange(option.type)}
            key={option.id}>
            <View
              style={[
                styles.meetingOption,
                {
                  backgroundColor:
                    statedata.interviewType === option.type
                      ? Colors.Yellow
                      : isDarkMode ? Colors.more_black[900] : Colors.White,
                },
              ]}>
              <VectorIcon
                type={option.name}
                name={option.icon}
                color={
                  statedata.interviewType === option.type
                    ? Colors.White
                    : isDarkMode ? Colors.Whiite_B1 : Colors.Black
                }
                size={ms(22)}
              />
              <Text
                style={[
                  styles.meetingOptionText,
                  {
                    color:
                      statedata.interviewType === option.type
                        ? Colors.White
                        : isDarkMode ? Colors.Whiite_B1 : Colors.Black_4A,
                  },
                ]}>
                {option.type}
              </Text>
            </View>
          </ButtonView>
        ))}
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
            color={isDarkMode ? Colors.Whiite_B1 :Colors.Black_61}
            size={ms(18)}
          />
          <ScaleText
            fontSize={ms(14)}
            color={isDarkMode ? Colors.White : Colors.Black}
            text={'30 min'}
          />
        </View>
      </View>

      <View style={styles.calendarContainer}>
        <CalendarPicker
          yearTitleStyle={styles.calendarTitle}
          monthTitleStyle={styles.calendarTitle}
          textStyle={styles.calendarTextStyle}
          previousTitleStyle={styles.calendarArrow}
          nextTitleStyle={styles.calendarArrow}
          width={Metrics.scaleHorizontal(330)}
          selectedDayColor={Colors.DarkYellow}
          selectedDayTextColor={Colors.White}
          previousTitle="<"
          nextTitle=">"
          todayBackgroundColor={Colors.Yellow}
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
              color={isDarkMode ? Colors.Whiite_B8:  Colors.Black_61}
              size={ms(18)}
            />
          </View>
          <ScaleText
            fontSize={ms(14)}
            color={isDarkMode ? Colors.Whiite_C1 : Colors.Black_61}
            text={'Pacific Time - US & Canada (7:55 pm)'}
          />
        </View>
      </View>

      <View>
        <ScaleText
          fontSize={ms(15)}
          color={isDarkMode ?Colors.White : Colors.Black}
          text={'Please Select Your Time'}
        />
      </View>

      <View style={styles.timeSelectionContainer}>
        {[
          '09:00 am',
          '12:00 pm',
          '03:00 pm',
          '08:00 pm',
          '19:00 pm',
          '11:00 pm',
        ].map(time => (
          <ButtonView onPress={() => handleTimeSelection(time)} key={time}>
            <View
              style={[
                styles.timeButton,
                {
                  backgroundColor:
                    statedata.interviewTime === time && isDarkMode ? Colors.more_black[900] : statedata.interviewTime === time 
                      ? Colors.Yellow
                      : isDarkMode ? Colors.Back_70 : Colors.White,
                },
              ]}>
              <Text
                style={[
                  styles.timeText,
                  {
                    color:
                      statedata.interviewTime === time
                        ? Colors.White
                        : Colors.Yellow,
                  },
                ]}>
                {time}
              </Text>
            </View>
          </ButtonView>
        ))}
      </View>

      <AppButton
        onPress={() => NavigationService.navigate(StackNav.Interview)}
        BackgroundColor={isDarkMode ? Colors.more_black[800] : Colors.Black}
        title={'Submit'}
      />
      <View style={styles.actionButtons}>
        <ButtonView onPress={() => NavigationService.goBack()}>
          <View style={[styles.submitButton, {width: width * 0.3}]}>
            <ScaleText isDarkMode={isDarkMode} color={Colors.Black} text={'Decline'} />
          </View>
        </ButtonView>
        <ButtonView
          onPress={() => NavigationService.navigate(StackNav.Message)}>
          <View style={[styles.submitButton, {width: width * 0.5}]}>
            <ScaleText isDarkMode={isDarkMode} color={Colors.Black} text={'Chat with Recruiter'} />
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
  calendarTextStyle: {fontSize: '12@ms', color: isDarkMode ? Colors.Whiite_B1 : Colors.Black},
  calendarArrow: {fontSize: '20@ms', color: isDarkMode ? Colors.Whiite_B1 : Colors.Black},
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
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.07,
    borderRadius: 26,
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
