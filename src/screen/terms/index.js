import {StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {screenOptions} from '../../naviagtor/config';
import {View} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {AppCheckBox} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const DummyText =
  'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors.';

const isDarkMode = datahandler.getAppTheme();

const Terms = ({navigation, route}) => {
  const [formObj, emailProps, passwordProps, termProps] = useHookForm(
    ['email', 'password', 'term'],
    {term: false},
    ValidationSchema.logIn,
  );
  console.log('termProps:', termProps);

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Terms & Conditions'
      )
    );
  }, [navigation, isDarkMode]);

  return (
    <Background isDarkMode={isDarkMode}>
      <View style={{marginBottom: 20}}>
        <ScaleText isDarkMode={isDarkMode} fontSize={ms(15)} text={DummyText} textAlign={'left'} />
      </View>
      <View style={{marginBottom: 20}}>
        <ScaleText isDarkMode={isDarkMode} fontSize={ms(15)} text={DummyText} textAlign={'left'} />
      </View>
      <View style={{marginBottom: 20}}>
        <ScaleText isDarkMode={isDarkMode} fontSize={ms(15)} text={DummyText} textAlign={'left'} />
      </View>
      {/* <View style={styles.rememberInnerContainer}>
        <AppCheckBox
          isChecked={statedata.isChecked}
          onClick={() =>
            setStateData(prev => ({
              ...prev,
              isChecked: !statedata.isChecked,
            }))
          }
        />
        <ScaleText
          text={'Accept Terms & Conditions *'}
          fontSize={Fonts.size.size_14}
          TextStyle={styles.rememberText}
        />
      </View> */}
      <View style={styles.rememberInnerContainer}>
        <AppCheckBox
          {...termProps}
          CheckBoxTextStyle={{
            color: Colors.DarkYellow,
            fontFamily: Fonts.type.Mediu,
            textDecorationLine: 'underline',
          }}
          text={'Accept Terms & Conditions *'}
        />
      </View>
      <AppButton
        onPress={() => {
          NavigationService.navigate(StackNav.VerifyOtp, {
            email: 'route.params.email',
            type: route.params.type,
          });
        }}
        title={'Accept'}
      />
    </Background>
  );
};

export default Terms;

const styles = ScaledSheet.create({
  rememberInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '20@ms',
  },
  rememberText: {
    marginLeft: '10@ms',
    color: Colors.Yellow,
    fontFamily: Fonts.type.Mediu,
  },
});
