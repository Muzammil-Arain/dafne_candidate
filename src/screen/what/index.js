import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { AppButton, Background, ScaleText } from '../../common';
import { Colors, Fonts, Metrics } from '../../theme';
import { ButtonView, CustomDropdown, TextInputCustom } from '../../components';
import { screenOptions } from '../../naviagtor/config';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import CheckBox from '../../components/CheckBox';
import { NavigationService } from '../../utils';
import { StackNav } from '../../naviagtor/stackkeys';
import { ms, ScaledSheet } from 'react-native-size-matters';
import { dummyDropdownData } from '../../utils/Hardcorddata';
import datahandler from '../../helper/datahandler';

// const isDarkMode = datahandler.getAppTheme();
const isDarkMode = true

const What = ({ navigation }) => {
  const [statedata, setStateData] = useState({
    isBackgound: true,
    relevantJob: true,
  });

  const [
    formObj,
    industryProps,
    typeProps,
    positionProps,
    experienceProps,
    betweenProps,
    andProps,
    frequencyProps,
    currencyProps,
    NegotiableProps,
  ] = useHookForm(
    [
      'industry',
      'type',
      'position',
      'experience',
      'between',
      'and',
      'frequency',
      'currency',
      'negotiable',
    ],
    { negotiable: false },
    ValidationSchema.what,
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
       'What?'
      )
    );
  }, [navigation, isDarkMode]);

  return (
    <Background isDarkMode={isDarkMode}>
      <CustomDropdown
      isDarkMode={isDarkMode}
        value="Select Industry"
        label="Industry"
        data={dummyDropdownData}
        selectedValue={value =>
          console.log(value)
        }
      />
      <CustomDropdown
      isDarkMode={isDarkMode}
        value="Select Type"
        label="Type"
        data={dummyDropdownData}
        selectedValue={value =>
          console.log(value)
        }
      />
      <CustomDropdown
      isDarkMode={isDarkMode}
        value="Select Position"
        label="Position"
        placeholder="Position"
        data={dummyDropdownData}
        selectedValue={value =>
          console.log(value)
        }
      />
      <CustomDropdown
      isDarkMode={isDarkMode}
        value="Select Level"
        label="Level of experience "
        placeholder="Level of experience "
        data={dummyDropdownData}
        selectedValue={value =>
          console.log(value)
        }
      />

      <View style={styles.cardContainer}>
        <ScaleText
        isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Mediu}
          text={
            'Would you consider offers from other industries that align with your background?'
          }
        />
        <View style={styles.buttonRow}>
          <ButtonView
            onPress={() => setStateData(prev => ({ ...prev, isBackgound: true }))}
            style={[
              styles.buttonStyle,
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
            onPress={() =>
              setStateData(prev => ({ ...prev, isBackgound: false }))
            }
            style={[
              styles.buttonStyle,
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

      <View style={styles.cardContainer}>
        <ScaleText
        isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Mediu}
          text={
            'Do you possess any valid licenses or certificates relevant to this job?'
          }
        />
        <View style={styles.buttonRow}>
          <ButtonView
            onPress={() => setStateData(prev => ({ ...prev, relevantJob: true }))}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: statedata.relevantJob
                  ? Colors.Yellow
                  : Colors.White_F8,
              },
            ]}>
            <ScaleText
              color={statedata.relevantJob ? Colors.White : Colors.Black_02}
              textAlign={'center'}
              text={'Yes'}
            />
          </ButtonView>
          <ButtonView
            onPress={() =>
              setStateData(prev => ({ ...prev, relevantJob: false }))
            }
            style={[
              styles.buttonStyle,
              {
                backgroundColor: !statedata.relevantJob
                  ? Colors.Yellow
                  : Colors.White_F8,
              },
            ]}>
            <ScaleText
              color={!statedata.relevantJob ? Colors.White : Colors.Black_02}
              textAlign={'center'}
              text={'No'}
            />
          </ButtonView>
        </View>
      </View>

      <ScaleText
      isDarkMode={isDarkMode}
        TextStyle={[styles.labelTextStyle]}
        fontFamily={Fonts.type.Mediu}
        fontSize={ms(15)}
        text={'What Annual Compensation Range Are You Seeking?'}
      />
      <ScaleText
      isDarkMode={isDarkMode}
        TextStyle={styles.labelTextStyle}
        fontSize={ms(15)}
        text={'Salary Range'}
      />
      <View style={styles.flexViewStyle}>
        <TextInputCustom
        isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="Between"
          {...betweenProps}
        />
        <TextInputCustom
        isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="And"
          {...andProps}
        />
      </View>
      <View style={styles.flexViewStyle}>
        <TextInputCustom
        isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="Frequency"
          {...frequencyProps}
        />
        <TextInputCustom
        isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="Currency"
          {...currencyProps}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox isDarkMode={isDarkMode} {...NegotiableProps} text={'Negotiable?'} />
      </View>
      <AppButton
        onPress={() => NavigationService.navigate(StackNav.Where,{
          key:true
        })}
        title={'Continue'}
      />
    </Background>
  );
};

export default What;

const styles = ScaledSheet.create({
  cardContainer: {
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    padding: '20@ms', // Scaled padding
    marginVertical: '10@ms', // Scaled vertical margin
    borderRadius: '14@ms', // Scaled border radius
    shadowColor: Colors.Black_02,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: '2@ms', // Scaled shadow offset
    },
    shadowOpacity: 0.15,
    shadowRadius: '3.84@ms', // Scaled shadow radius
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: '10@ms', // Scaled margin top
    alignItems: 'center',
  },
  buttonStyle: {
    width: '70@ms', // Scaled width
    height: '40@ms', // Scaled height
    borderRadius: '50@ms', // Scaled border radius
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10@ms', // Scaled margin
  },
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '65@ms', // Scaled height
  },
  cuntomStyle: {
    width: '170@ms', // Scaled width
  },
  labelTextStyle: {
    marginLeft: '10@ms', // Scaled margin left
    marginTop: '10@ms', // Scaled margin top
  },
  checkboxContainer: {
    marginVertical: '20@ms', // Scaled vertical margin
  },
});
