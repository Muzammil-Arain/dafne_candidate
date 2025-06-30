import React, {useLayoutEffect, useState, useRef, useEffect} from 'react';
import {StyleSheet, View, FlatList, Animated, Image} from 'react-native';
import {screenOptions} from '../../naviagtor/config';
import {Background, ScaleText} from '../../common';
import {ButtonView} from '../../components';
import {Colors, Fonts, Images, Metrics} from '../../theme';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const Invitations = 'Invitations';
const History = 'History';
const Interview = ({navigation}) => {
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

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        statedata.selectedType === Invitations
        ? 'Interview Invitations'
        : 'Interview History',
      )
    );
  }, [navigation,statedata, isDarkMode]);

  const handleToggle = value => {
    setStateData(prev => ({...prev, selectedType: value}));
  };

  // ToggleButton Component
  const ToggleButton = ({label, isSelected, onPress}) => (
    <ButtonView onPress={onPress}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: isSelected && isDarkMode ? Colors.more_black[800] : isSelected && !isDarkMode ? Colors.Black_21 : Colors.White,
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
    const slideIn = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
      opacity: animatedValue,
    };
    return (
      <Animated.View style={[styles.sectionMenu, slideIn]}>
        {/* Job Details */}
        {[
          { label: 'Job Name:', value: 'Server 12354' },
          { label: 'Industry:', value: 'Aviation' },
          { label: 'Position:', value: 'Director Maintenance' },
          { label: 'Company Name:', value: 'Zurajet' },
        ].map(({label, value}, index) => (
          <View key={index} style={styles.flexView}>
            <ScaleText
            isDarkMode={isDarkMode}
              fontFamily={Fonts.type.Mediu}
              TextStyle={{marginRight: ms(8)}}
              fontSize={ms(14)}
              color={Colors.Black_21}
              text={label}
            />
            <ScaleText
              fontFamily={Fonts.type.Mediu}
              fontSize={ms(14)}
              color={Colors.DarkYellow}
              text={value}
            />
          </View>
        ))}

        {/* Interested and Not Interested Buttons */}
        <View style={styles.interestedContainer}>
          <ButtonView
            onPress={() => {
              NavigationService.navigate(StackNav.InterviewInvitations);
              // setStateData(prev => ({...prev, intersted: true}))
            }}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: statedata.intersted
                  ? Colors.Yellow
                  : Colors.White_F8,
              },
            ]}>
            <ScaleText
              color={statedata.intersted ? Colors.White : Colors.Black_02}
              textAlign={'center'}
              text={'Interested'}
            />
          </ButtonView>
          <ButtonView
            onPress={() => setStateData(prev => ({...prev, intersted: false}))}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: !statedata.intersted
                  ? Colors.Yellow
                  : Colors.White_F8,
              },
            ]}>
            <ScaleText
              color={!statedata.intersted ? Colors.White : Colors.Black_02}
              textAlign={'center'}
              text={'Not Interested'}
            />
          </ButtonView>
        </View>

        {/* View Job Description Button */}
        <ButtonView
          onPress={() => NavigationService.navigate(StackNav.JobDescription)}>
          <View style={styles.jobDescriptionViewStyle}>
            <ScaleText isDarkMode={isDarkMode} color={Colors.Black} text={'View Job Description'} />
          </View>
        </ButtonView>
      </Animated.View>
    );
  };

  const JobHistory = ({animationValue, statedata, setStateData}) => {
    const slideIn = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
      opacity: animatedValue,
    };
    return (
      <Animated.View
        style={[
          styles.sectionMenu,
          slideIn,
          {
            height: Metrics.scaleVertical(220),
          },
        ]}>
        {/* Job Details */}
        {[
          {label: 'Industry:', value: 'Corporate'},
          {label: 'Job Type:', value: 'Design'},
          {label: 'Location:', value: 'NY 1011.Street 13 Newyork'},
          {label: 'Salary range:', value: '$10,000'},
          {label: 'Date & Time:', value: 'Aug, 15 2024 - 10:00 am'},
        ].map(({label, value}, index) => (
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
          <View style={styles.jobHistoryViewStyle}>
            <ScaleText color={Colors.White} text={'Scheduled'} />
          </View>
          <ButtonView
            onPress={() => NavigationService.navigate(StackNav.Message)}>
            <Image
              resizeMode="contain"
              source={Images.icon.chat_icon}
              style={{width: ms(30), height: ms(30)}}
            />
          </ButtonView>
        </View>
      </Animated.View>
    );
  };

  return (
    <Background isDarkMode={isDarkMode}>
      {/* Toggle Button Row */}
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
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={item => item.toString()}
        renderItem={({item}) => {
          return statedata.selectedType === Invitations ? (
            <JobItem statedata={statedata} setStateData={setStateData} />
          ) : (
            <JobHistory statedata={statedata} setStateData={setStateData} />
          );
        }}
        contentContainerStyle={styles.listContentContainer}
      />
    </Background>
  );
};

export default Interview;


const styles = ScaledSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    padding: '10@ms',  // Scaled padding
    height: '45@ms',  // Scaled height
    width: '150@ms',  // Scaled width
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 26,
    borderWidth: 1,
  },
  sectionMenu: {
    marginVertical: '20@ms',  // Scaled vertical margin
    padding: '20@ms',  // Scaled padding
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    borderRadius: 10,
    shadowColor: Colors.Black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: '250@ms',  // Scaled height
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobDescriptionViewStyle: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8@ms',  // Scaled padding
    borderWidth: 1,
    borderColor: Colors.Back_70,
  },
  buttonStyle: {
    borderRadius: 35,
    height: '40@ms',  // Scaled height
    justifyContent: 'center',
    alignItems: 'center',
    width: '140@ms',  // Scaled width
  },
  interestedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: '15@ms',  // Scaled vertical margin
  },
  listContentContainer: {
    paddingBottom: '20@ms',  // Scaled bottom padding
    paddingHorizontal: '10@ms',  // Scaled horizontal padding
  },
  jobHistoryViewStyle: {
    backgroundColor:isDarkMode? Colors.more_black[800] : Colors.Blue,
    height: '35@ms',  // Scaled height
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.Back_70,
    width: '140@ms',  // Scaled width
  },
});
