import {StyleSheet, View} from 'react-native';
import React, {useState, useCallback, useMemo} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {Colors, Fonts, Metrics} from '../../theme';
import {ButtonView, CustomDropdown} from '../../components';
import {screenOptions} from '../../naviagtor/config';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import CheckBox from '../../components/CheckBox';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import { ScaledSheet } from 'react-native-size-matters';

const ProjectDescription = ({navigation}) => {
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
    {negotiable: false},
    ValidationSchema.what,
  );

  const dropdownData = useMemo(() => [{name: 'abc'}, {name: 'def'}], []);

  // Retain useLayoutEffect as requested
  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       ...screenOptions,
  //       headerTitle: 'Name Here',
  //     });
  //   }, [navigation]);

  // Memoize handlers to avoid re-creating them on each render
  const handleStateUpdate = useCallback(
    (key, value) => {
      setStateData(prev => ({...prev, [key]: value}));
    },
    [setStateData],
  );

  return (
    <Background>
      <CustomDropdown
        value="lorem ipsum"
        label="Which Industry Are You Interested In?"
        placeholder="Which Industry Are You Interested In?"
        data={dropdownData}
        {...industryProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="What Is Your Preferred Employment Type?"
        placeholder="What Is Your Preferred Employment Type?"
        data={dropdownData}
        {...typeProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Position You Are Looking For?"
        placeholder="Position You Are Looking For?"
        data={dropdownData}
        {...positionProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="What Is Your Level Of Experience For This Position?"
        placeholder="What Is Your Level Of Experience For This Position?"
        data={dropdownData}
        {...experienceProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Where Would You Prefer The Location For This Job To Be?"
        placeholder="Where Would You Prefer The Location For This Job To Be?"
        data={dropdownData}
        {...experienceProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Where Are You Currently Located?"
        placeholder="Where Are You Currently Located?"
        data={dropdownData}
        {...experienceProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Availability To Start To Work?"
        placeholder="Availability To Start To Work?"
        data={dropdownData}
        {...experienceProps}
      />

      <View style={styles.cardContainer}>
        <ScaleText
          text={
            'Would you consider offers from other industries that align with your background?'
          }
        />
        <View style={styles.buttonRow}>
          <ButtonView
            onPress={() => handleStateUpdate('isBackgound', true)}
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
            onPress={() => handleStateUpdate('isBackgound', false)}
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
          text={'Would You Be Willing To Relocate For This Position?'}
        />
        <View style={styles.buttonRow}>
          <ButtonView
            onPress={() => handleStateUpdate('relevantJob', true)}
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
            onPress={() => handleStateUpdate('relevantJob', false)}
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

      <View style={styles.cardContainer}>
        <ScaleText
          text={
            'Do You Possess Any Valid Licenses Or Certificates Relevant To This Job?'
          }
        />
        <View style={styles.buttonRow}>
          <ButtonView
            onPress={() => handleStateUpdate('relevantJob', true)}
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
            onPress={() => handleStateUpdate('relevantJob', false)}
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

      <CustomDropdown
        value="lorem ipsum"
        label="What Annual Compensation Range Are You Seeking?"
        placeholder="What Annual Compensation Range Are You Seeking?"
        data={dropdownData}
        {...experienceProps}
      />

      <View style={styles.checkboxContainer}>
        <CheckBox {...NegotiableProps} text={'Negotiable?'} />
      </View>
      <AppButton
        onPress={() =>
          NavigationService.navigate(StackNav.CompleteProfile, {
            value: '75%',
          })
        }
        title={'Continue'}
      />
    </Background>
  );
};

export default ProjectDescription;

const styles = ScaledSheet.create({
  cardContainer: {
    backgroundColor: Colors.White,
    padding: 20,
    marginVertical: '10@ms',
    borderRadius: 14,
    shadowColor: '#000',
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: '10@ms',
    alignItems: 'center',
  },
  buttonStyle: {
    width: '70@ms',
    height: '40@ms',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10@ms',
  },
  checkboxContainer: {
    marginVertical: '20@ms',
  },
});
