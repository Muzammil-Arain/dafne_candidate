import { View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, ScaleText} from '../../common';
import {TextInputNative} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {Colors, Fonts} from '../../theme';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const ProjectName = ({navigation}) => {
  const [formObj, passwordProps] = useHookForm(
    ['password'],
    {},
    ValidationSchema.logIn,
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Name your ideal position!'
      )
    );
  }, [navigation, isDarkMode]);

  return (
    <Background isDarkMode={isDarkMode}>
      <View style={styles.formContainer}>
        <ScaleText
        isDarkMode={isDarkMode}
          textAlign="center"
          fontFamily={Fonts.type.Mediu}
          text="Name your job!"
          fontSize={ms(18)}
        />
        <TextInputNative
        isDarkMode={isDarkMode}
          topSpaceLarge
          title="Name*"
          {...passwordProps}
          customPlaceholder="name"
        />
        <View style={styles.buttonContainer}>
          <AppButton
            onPress={() => NavigationService.navigate(StackNav.SelectOne)}
            title="Continue"
          />
        </View>
      </View>
    </Background>
  );
};

export default ProjectName;

const styles = ScaledSheet.create({
  formContainer: {
    marginTop: '20@ms',  // Scaled vertical margin
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    paddingHorizontal: '20@ms',  // Scaled horizontal padding
    paddingVertical: '40@ms',  // Scaled vertical padding
    borderRadius: 14,
    shadowColor: isDarkMode ? Colors.Whiite_B1 : Colors.Back_70,
    elevation: 10,
  },
  buttonContainer: {
    marginTop: '20@ms',  // Scaled vertical margin
  },
  input: {
    marginHorizontal: '20@ms',  // Scaled horizontal margin
    marginTop: '20@ms',  // Scaled vertical margin
  },
});
