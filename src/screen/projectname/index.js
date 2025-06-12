import {View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {screenOptions} from '../../naviagtor/config';
import {AppButton, Background, ScaleText} from '../../common';
import {TextInputNative} from '../../components';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {Colors, Fonts} from '../../theme';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {useDispatch} from 'react-redux';
import {JOB_TITLE_API, PROFILE_PERCENTAGE_API} from '../../ducks/app';

const isDarkMode = datahandler.getAppTheme();

const ProjectName = ({navigation, route}) => {
  const {key} = route?.params ?? '';
  const [formObj, jobProps] = useHookForm(['job'], {}, ValidationSchema.job);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Name your ideal position!',
      ),
    );
  }, [navigation, isDarkMode]);

  const handleSubmit = formObj.handleSubmit(values => {
    const jobName = values?.job;
    if (!jobName) return;

    const payload = {job_name: jobName};

    const onJobTitleAdded = res => {
      if (!res?.id) return;

      const perID = res.id;
      Util.showMessage('Job title added successfully', 'success');

      if (key) {
        datahandler.setisNewProject(key);
        NavigationService.navigate(StackNav.SelectOne, {perID});
        return;
      }

      const formData = new FormData();
      formData.append('percentage', `SelectOne / ${null} / ${perID}`);

      dispatch(
        PROFILE_PERCENTAGE_API.request({
          payloadApi: formData,
          cb: () => {
            NavigationService.navigate(StackNav.SelectOne, {perID});
          },
        }),
      );
    };

    dispatch(
      JOB_TITLE_API.request({
        payloadApi: payload,
        cb: onJobTitleAdded,
      }),
    );
  });

  return (
    <Background isDarkMode={isDarkMode}>
      <View style={styles.formContainer}>
        <ScaleText
          isDarkMode={isDarkMode}
          textAlign="center"
          fontFamily={Fonts.type.Mediu}
          text="Name your Position!"
          fontSize={ms(18)}
        />
        <TextInputNative
          isDarkMode={isDarkMode}
          topSpaceLarge
          title="Name*"
          {...jobProps}
          customPlaceholder="name"
        />
        <View style={styles.buttonContainer}>
          <AppButton
            type={'JOBS_TITLE'}
            onPress={handleSubmit}
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
    marginTop: '20@ms',
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    paddingHorizontal: '20@ms',
    paddingVertical: '40@ms',
    borderRadius: 14,
    shadowColor: isDarkMode ? Colors.Whiite_B1 : Colors.Back_70,
    elevation: 10,
  },
  buttonContainer: {
    marginTop: '20@ms',
  },
  input: {
    marginHorizontal: '20@ms',
    marginTop: '20@ms',
  },
});
