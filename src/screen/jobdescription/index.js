import {Colors, Fonts} from '../../theme';
import React, {useLayoutEffect} from 'react';
import {Background, ScaleText} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();
const {width, height} = Dimensions.get('screen');

const JobDescription = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'View Job Description'
      )
    );
  }, [navigation, isDarkMode]);


  return (
    <Background isDarkMode={isDarkMode}>
      <Animated.View style={[styles.sectionMenu]}>
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
          text={
            'It is a long established fact that a reader will distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters'
          }
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
    backgroundColor: isDarkMode ? Colors.more_black[900]: Colors.White,
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
