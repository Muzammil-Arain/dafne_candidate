import {StyleSheet, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {Colors, Fonts, Metrics} from '../../theme';
import {ButtonView, CustomDropdown} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {screenOptions} from '../../naviagtor/config';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {dummyDropdownData} from '../../utils/Hardcorddata';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const Where = ({navigation, route}) => {
  console.log(route.params.key);

  const [statedata, setStateData] = useState({
    isBackgound: true,
    relevantJob: true,
  });

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Where?',
      ),
    );
  }, [navigation, isDarkMode]);

  const [formObj, locationProps, currentLocationProp, startDateProps] =
    useHookForm(
      ['location', 'currentLocation', 'startDate'],
      ValidationSchema.where,
    );

  return (
    <Background isDarkMode={isDarkMode}>
      <CustomDropdown
        isDarkMode={isDarkMode}
        value="Select Location"
        label="Location"
        data={dummyDropdownData}
        selectedValue={value => console.log(value)}
      />
      <CustomDropdown
        isDarkMode={isDarkMode}
        value="Select Current Location"
        label="Where are you currently located?"
        data={dummyDropdownData}
        selectedValue={value => console.log(value)}
      />
      <CustomDropdown
        isDarkMode={isDarkMode}
        value="Select Date"
        label="Availability to start work?"
        data={dummyDropdownData}
        selectedValue={value => console.log(value)}
      />
      <View style={styles.cardContainer}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={ms(14)}
          fontFamily={Fonts.type.Mediu}
          text={'Would you be willing to relocate for this position?'}
        />
        <View style={styles.buttonGroup}>
          <ButtonView
            onPress={() => {
              setStateData(prev => ({
                ...prev,
                isBackgound: true,
              }));
            }}
            style={[
              styles.button,
              {
                backgroundColor: statedata.isBackgound
                  ? Colors.Yellow
                  : Colors.White_F8,
              },
            ]}>
            <ScaleText
              color={statedata.isBackgound ? Colors.White : Colors.Black_02}
              textAlign={'center'}
              text={'Yes'}
            />
          </ButtonView>
          <ButtonView
            onPress={() => {
              setStateData(prev => ({
                ...prev,
                isBackgound: false,
              }));
            }}
            style={[
              styles.button,
              {
                backgroundColor: !statedata.isBackgound
                  ? Colors.Yellow
                  : Colors.White_F8,
              },
            ]}>
            <ScaleText
              color={!statedata.isBackgound ? Colors.White : Colors.Black_02}
              textAlign={'center'}
              text={'No'}
            />
          </ButtonView>
        </View>
      </View>

      <View
        style={{
          marginTop: ms(220),
        }}>
        <AppButton
          onPress={() => {
            if (route.params.key == false) {
              NavigationService.navigate(StackNav.What);
            } else {
              NavigationService.push(StackNav.CompleteProfile, {
                value: '75%',
              });
            }
          }}
          title={'Continue'}
        />
      </View>
    </Background>
  );
};

export default Where;

const styles = ScaledSheet.create({
  cardContainer: {
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    padding: '20@ms', // Scaled padding
    marginVertical: '10@ms', // Scaled vertical margin
    borderRadius: '14@ms', // Scaled border radius
    shadowColor: Colors.Black_02,
    elevation: 15,
    shadowOffset: {
      width: 0,
      height: '2@ms', // Scaled shadow offset
    },
    shadowOpacity: 0.15,
    shadowRadius: '3.84@ms', // Scaled shadow radius
    marginTop: '20@ms', // Scaled margin top
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: '10@ms', // Scaled margin top
    alignItems: 'center',
  },
  button: {
    width: '70@ms', // Scaled width
    height: '40@ms', // Scaled height
    borderRadius: '50@ms', // Scaled border radius
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10@ms', // Scaled margin right
  },
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '65@ms', // Scaled height
  },
  cuntomStyle: {
    width: '150@ms', // Scaled width
  },
});
