import {View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, ScaleText} from '../../common';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {Colors, Fonts} from '../../theme';
import {TextInputNative} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

const CreateProject = ({navigation}) => {
  const [formObj, passwordProps] = useHookForm(
    ['password'],
    {},
    ValidationSchema.logIn,
  );
  const [projecttype, setProjectType] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        projecttype ? 'Name your Position Search' : 'Create Projects',
      ),
    );
  }, [navigation, projecttype, isDarkMode]);

  const DummyText = `It is a long established fact that a reader will be 
distracted by the readable content of a page 
when looking at its layout.`;

  return (
    <Background isDarkMode={isDarkMode}>
      {!projecttype && (
        <ScaleText isDarkMode={isDarkMode} fontSize={ms(16)} text={DummyText} />
      )}
      <View
        style={{
          marginTop: '40%',
        }}>
        {projecttype ? (
          // <View>
          //   <AppButton
          //     onPress={() =>
          //       NavigationService.navigate(StackNav.CreateProjectDetails)
          //     }
          //     title={'Enter the name here'}
          //   />
          // </View>
          <View style={styles.formContainer}>
            <ScaleText
              isDarkMode={isDarkMode}
              textAlign="center"
              fontFamily={Fonts.type.Mediu}
              text="Enter Your Position Name"
              fontSize={ms(18)}
            />
            <TextInputNative
              topSpaceLarge
              title="Name*"
              {...passwordProps}
              customPlaceholder="Enter Position Name"
            />
            <View style={styles.buttonContainer}>
              <AppButton
                onPress={() =>
                  NavigationService.navigate(StackNav.CreateProjectDetails)
                }
                title="Continue"
              />
            </View>
          </View>
        ) : (
          <View>
            <AppButton
              onPress={() => setProjectType(true)}
              title={'Manage your project'}
            />
            <AppButton
              ShowLinear={false}
              onPress={() => NavigationService.goBack()}
              title={'Create a new project'}
            />
          </View>
        )}
      </View>
    </Background>
  );
};

export default CreateProject;

const styles = ScaledSheet.create({
  formContainer: {
    marginTop: '-40@ms', // Scaled vertical margin
    backgroundColor: Colors.White,
    paddingHorizontal: '20@ms', // Scaled horizontal padding
    paddingVertical: '40@ms', // Scaled vertical padding
    borderRadius: 14,
    shadowColor: Colors.Back_70,
    elevation: 10,
  },
  buttonContainer: {
    marginTop: '20@ms', // Scaled vertical margin
  },
  input: {
    marginHorizontal: '20@ms', // Scaled horizontal margin
    marginTop: '20@ms', // Scaled vertical margin
  },
});
