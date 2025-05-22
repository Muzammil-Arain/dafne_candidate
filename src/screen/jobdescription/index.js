import {Colors, Fonts} from '../../theme';
import React, {useLayoutEffect} from 'react';
import {Background, ScaleText} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();
const {width, height} = Dimensions.get('screen');

const JobDescription = ({navigation, route}) => {
  const InterViewData = route?.params?.data;
  console.log(
    '🚀 ~ InterviewInvitations ~ InterViewData:',
    InterViewData?.project?.description
    ,
  );
  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'View Job Description',
      ),
    );
  }, [navigation, isDarkMode]);

  return (
    <Background isDarkMode={isDarkMode}>
      <Animated.View style={[styles.sectionMenu]}>
        {/* Job Details */}
        {[
          {
            label: 'Industry:',
            value: InterViewData?.project?.requirement?.industry,
          },
          {
            label: 'Job Type:',
            value: InterViewData?.project?.requirement?.job_title,
          },
          {
            label: 'Location:',
            value: InterViewData?.project?.requirement?.location,
          },
          {
            label: 'Salary range:',
            value: `$${InterViewData?.project?.academic_requirement?.salary_between}`
          },
          {label: 'Date & Time:', value: InterViewData?.project?.requirement?.start_date},
        ].map(({label, value}, index) => (
          <View key={index} style={styles.flexView}>
            <ScaleText
              isDarkMode={isDarkMode}
              fontFamily={Fonts.type.Mediu}
              TextStyle={{marginRight: 10}}
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
      </Animated.View>
      <Animated.View
        style={[
          styles.sectionMenu,
          {
            backgroundColor: Colors.LightYellow,
          },
        ]}>
        <ScaleText
          fontFamily={Fonts.type.Mediu}
          fontSize={ms(15)}
          color={Colors.Black}
          text={'Job Description'}
        />
        <ScaleText
          fontFamily={Fonts.type.Roman}
          fontSize={ms(13)}
          color={Colors.Black_4A}
          text={InterViewData?.project?.description}
        />
      </Animated.View>
    </Background>
  );
};

export default JobDescription;

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
    height: height * 0.18,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
