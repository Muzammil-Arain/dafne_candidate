import {StyleSheet, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
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
import {
  GET_DEGREE_API,
  GET_EMPLOYMENT_API,
  GET_EXPERIENCE_API,
  GET_INDUSTRY_API,
  GET_JOB_API,
  GET_STATE_API,
  PREFERABLE_LOCATION_API,
  PROFILE_PERCENTAGE_API,
} from '../../ducks/app';
import {useDispatch} from 'react-redux';
import {dateFormet, dateFormetchange} from '../authprofile/data';
import moment from 'moment';
import {useIsFocused} from '@react-navigation/native';

const isDarkMode = datahandler.getAppTheme();

const Where = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {perID, jobsData} = route?.params ?? '';
  const isfoucsed = useIsFocused();

  const [statedata, setStateData] = useState({
    isBackgound: true,
    getState: [],
  });
  console.log('🚀 ~ Where ~ statedata:', jobsData?.Availablity_to_start);

  const [formData, setFormData] = useState({
    location: '',
    currentLocation: '',
    startDate: '',
    relocate: false,
    errors: {
      location: '',
      currentLocation: '',
      startDate: '',
    },
  });
  console.log('🚀 ~ Where ~formData.startDate formData:', formData.startDate);

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

  useEffect(() => {
    fetchAndUpdateState();
    setFormData(prev => ({
      ...prev,
      location: {
        name: jobsData?.location_for_job,
        id: jobsData?.location_id,
      },
      currentLocation: {
        name: jobsData?.current_location,
        id: jobsData?.current_location_id,
      },
      startDate: jobsData?.Availablity_to_start
        ? jobsData?.Availablity_to_start
        : moment().format(
            dateFormet,
          ),
      relocate: jobsData?.willing_to_relocate == 1 ? true : false,
    }));
  }, [navigation, isfoucsed]);

  const fetchAndUpdateState = () => {
    dispatch(
      GET_STATE_API.request({
        payloadApi: {},
        params: 167,
        cb: res => {
          setStateData(prev => ({...prev, getState: res}));
        },
      }),
    );
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.location) errors.location = 'Please select a location';
    // if (statedata.isBackgound || !formData.currentLocation)
    //   errors.currentLocation = 'Please select your current location';
    if (!jobsData?.Availablity_to_start && !formData.startDate) {
      errors.startDate = 'Please select a start date';
    }

    setFormData(prev => ({...prev, errors}));
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    const payload = new FormData();
    payload.append('preferable_industry_id', perID ?? '1');
    payload.append('location_for_job', formData.location.id);
    formData.currentLocation.id &&
      payload.append('current_location', formData.currentLocation.id);
    payload.append(
      'Availablity_to_start',
      !jobsData?.Availablity_to_start ||
        jobsData?.Availablity_to_start === 'Invalid date'
        ? moment(formData.startDate).format('MMM Do YY')
        : jobsData?.Availablity_to_start,
    );

    payload.append('willing_to_relocate', statedata.isBackgound ? 1 : 0);
    console.log('🚀 ~ onSubmit ~ payload:', payload);
    dispatch(
      PREFERABLE_LOCATION_API.request({
        payloadApi: payload,
        cb: async data => {
          const isNewProject = datahandler.getisNewProject();
          const isFromKeyFalse = route?.params?.key == false;

          if (jobsData) {
            NavigationService.navigate('AppStack', {key: true});
            return;
          } else if (isNewProject) {
            const formData = new FormData();
            formData.append('percentage', `AppStack`);

            dispatch(
              PROFILE_PERCENTAGE_API.request({
                payloadApi: formData,
                cb: () => {
                  datahandler.setisNewProject(null);
                  NavigationService.navigate('AppStack', {key: true});
                },
              }),
            );
            return;
          } else if (isFromKeyFalse) {
            const formData = new FormData();
            formData.append('percentage', `What / ${true} / ${perID}`);

            dispatch(
              PROFILE_PERCENTAGE_API.request({
                payloadApi: formData,
                cb: () => {
                  NavigationService.navigate(StackNav.What, {
                    perID: perID,
                    isFromKeyFalse: false,
                  });
                },
              }),
            );
            return;
          } else {
            const formData = new FormData();
            formData.append('percentage', 'UploadProfile');

            await dispatch(
              PROFILE_PERCENTAGE_API.request({
                payloadApi: formData,
              }),
            );

            NavigationService.push(StackNav.CompleteProfile, {value: '75%'});
          }
        },
      }),
    );
  };

  return (
    <Background isDarkMode={isDarkMode}>
      <View style={styles.cardContainer}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={ms(14)}
          fontFamily={Fonts.type.Mediu}
          text={'Would you be willing to relocate for this position?'}
        />
        <View style={styles.buttonGroup}>
          <ButtonView
            onPress={() => setStateData(prev => ({...prev, isBackgound: true}))}
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
            onPress={() =>
              setStateData(prev => ({...prev, isBackgound: false}))
            }
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

      <CustomDropdown
        isDarkMode={isDarkMode}
        value={formData.location.name}
        label="Location"
        data={statedata.getState}
        selectedValue={value =>
          setFormData(prev => ({
            ...prev,
            location: value,
            errors: {...prev.errors, location: ''},
          }))
        }
      />
      {formData.errors.location ? (
        <ScaleText
          TextStyle={styles.errStyle}
          text={formData.errors.location}
        />
      ) : null}

      {statedata.isBackgound && (
        <CustomDropdown
          isDarkMode={isDarkMode}
          value={formData.currentLocation.name}
          label="Where are you currently located?"
          data={statedata.getState}
          selectedValue={value =>
            setFormData(prev => ({
              ...prev,
              currentLocation: value,
              errors: {...prev.errors, currentLocation: ''},
            }))
          }
        />
      )}
      {formData.errors.currentLocation ? (
        <ScaleText
          TextStyle={styles.errStyle}
          text={formData.errors.currentLocation}
        />
      ) : null}

      <CustomDropdown
        minimumDate={new Date()}
        isDarkMode={isDarkMode}
        value={
          !jobsData?.Availablity_to_start ||
          jobsData?.Availablity_to_start === 'Invalid date'
            ? moment(formData.startDate).format(dateFormet)
            : jobsData?.Availablity_to_start
        }
        label="Availability to start work?"
        data={dummyDropdownData}
        type={false}
        selectedValue={value =>
          setFormData(prev => ({
            ...prev,
            startDate: value,
            errors: {...prev.errors, startDate: ''},
          }))
        }
      />
      {formData.errors.startDate ? (
        <ScaleText
          TextStyle={styles.errStyle}
          text={formData.errors.startDate}
        />
      ) : null}

      <View style={{marginTop: ms(160)}}>
        <AppButton
          type={'PREFERABLE_LOCATION'}
          onPress={onSubmit}
          title={'Continue'}
        />
      </View>
    </Background>
  );
};

export default Where;

const styles = ScaledSheet.create({
  cardContainer: {},
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(10),
  },
  button: {
    flex: 1,
    paddingVertical: ms(10),
    marginHorizontal: ms(5),
    borderRadius: ms(5),
  },
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
    marginBottom: '30@ms',
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
  errStyle: {
    color: Colors.red[600],
    fontSize: '11@ms',
    marginTop: '-10@ms',
    marginBottom: '10@ms',
  },
});
