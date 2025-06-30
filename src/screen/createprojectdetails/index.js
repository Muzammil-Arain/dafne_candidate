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
import { ScaledSheet } from 'react-native-size-matters';

const CreateProjectDetails = ({ navigation }) => {
  const [statedata, setStateData] = useState({
    isBackgound: true,
    relevantJob: true,
    Position: true
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
    navigation.setOptions({
      ...screenOptions,
      headerTitle: 'Name Here',
    });
  }, [navigation]);

  return (
    <Background>
      <CustomDropdown
        value="lorem ipsum"
        label="Which Industry Are You Interested In?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...industryProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="What Is Your Preferred Employment Type?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...typeProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Position You Are Looking For?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...positionProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="What Is Your Level Of Experience For This Position?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...experienceProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Where Would You Prefer The Location For This Job To Be?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...experienceProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Where Are You Currently Located?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...experienceProps}
      />
      <CustomDropdown
        value="lorem ipsum"
        label="Availability To Start To Work?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...experienceProps}
      />

      <View style={styles.cardContainer}>
        <ScaleText
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
          fontFamily={Fonts.type.Mediu}
          text={'Would You Be Willing To Relocate For This Position?'}
        />
        <View style={styles.buttonRow}>
          <ButtonView
            onPress={() => setStateData(prev => ({ ...prev, Position: true }))}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: statedata.Position
                  ? Colors.Yellow
                  : Colors.White_F8,
              },
            ]}>
            <ScaleText
              color={statedata.Position ? Colors.White : Colors.Black_02}
              textAlign={'center'}
              text={'Yes'}
            />
          </ButtonView>
          <ButtonView
            onPress={() =>
              setStateData(prev => ({ ...prev, Position: false }))
            }
            style={[
              styles.buttonStyle,
              {
                backgroundColor: !statedata.Position
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
          fontFamily={Fonts.type.Mediu}
          text={
            'Do You Possess Any Valid Licenses Or Certificates Relevant To This Job?'
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
      <CustomDropdown
        value="lorem ipsum"
        label="What Annual Compensation Range Are You Seeking?"
        placeholder="lorem ipsum"
        data={[{ name: 'abc' }, { name: 'def' }]}
        {...experienceProps}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox {...NegotiableProps} text={'Negotiable?'} />
      </View>
      <AppButton
        onPress={() => NavigationService.navigate(StackNav.SelectOne)}
        title={'Continue'}
      />
    </Background>
  );
};

export default CreateProjectDetails;

const styles = ScaledSheet.create({
  cardContainer: {
    backgroundColor: Colors.White,
    padding: 20,
    marginVertical: '10@ms',
    borderRadius: 14,
    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
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
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '65@ms',
  },
  cuntomStyle: {
    width: '160@ms',
  },
  labelTextStyle: {
    marginLeft: '10@ms',
    marginTop: '10@ms',
  },
  checkboxContainer: {
    marginVertical: '20@ms',
  },
});
