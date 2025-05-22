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

const isDarkMode = datahandler.getAppTheme();

const Where = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {perID, key} = route?.params ?? '';

  const [statedata, setStateData] = useState({
    isBackgound: true,
    getState: [],
  });

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
  console.log('🚀 ~ Where ~ formData:', formData.startDate);

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
    handleGetAPISData();
  }, [navigation]);

  const handleGetAPISData = async () => {
    const apiRequests = [
      {
        action: GET_STATE_API,
        key: 'getState',
        params: 167,
      },
      // {
      //   action: GET_EMPLOYMENT_API,
      //   key: 'getEmployment',
      //   transform: val => ({...val, name: val.employment_type}),
      // },
      // {
      //   action: GET_JOB_API,
      //   key: 'getJob',
      //   transform: val => ({...val, name: val.job_title}),
      // },
      // {
      //   action: GET_EXPERIENCE_API,
      //   key: 'getexperience',
      // },
    ];

    for (const req of apiRequests) {
      await fetchAndUpdateState(req);
      await new Promise(res => setTimeout(res, 300));
    }
  };

  const fetchAndUpdateState = ({action, key, transform, params}) => {
    return new Promise(resolve => {
      dispatch(
        action.request({
          payloadApi: {},
          params: params,
          cb: res => {
            const updatedData = transform ? res?.map(transform) : res;
            setStateData(prev => ({...prev, [key]: updatedData}));
            console.log(`✅ ${key} API Response:`, res);
            resolve();
          },
        }),
      );
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.location) errors.location = 'Please select a location';
    if (!formData.currentLocation)
      errors.currentLocation = 'Please select your current location';
    if (!formData.startDate) errors.startDate = 'Please select a start date';

    setFormData(prev => ({...prev, errors}));
    return Object.keys(errors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;

    const payload = new FormData();
    payload.append('preferable_industry_id', perID ?? '1');
    payload.append('location_for_job', formData.location.id);
    payload.append('current_location', formData.currentLocation.id);
    payload.append(
      'Availablity_to_start',
      moment(formData.startDate).format(dateFormetchange),
    );
    payload.append('willing_to_relocate', statedata.isBackgound ? 1 : 0);
    // if (route?.params?.key === false) {
    //   NavigationService.navigate(StackNav.What, { perID: perID });
    // } else {
    //   NavigationService.push(StackNav.CompleteProfile, {
    //     value: '75%',
    //   });
    // }
    // return;
    dispatch(
      PREFERABLE_LOCATION_API.request({
        payloadApi: payload,
        cb: async data => {
          const isNewProject = datahandler.getisNewProject();
          const isFromKeyFalse = route?.params?.key == false;

          if (isNewProject) {
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
          }

          if (isFromKeyFalse) {
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
          }

          // Default case
          const formData = new FormData();
          formData.append('percentage', 'UploadProfile');

          await dispatch(
            PROFILE_PERCENTAGE_API.request({
              payloadApi: formData,
            }),
          );

          NavigationService.push(StackNav.CompleteProfile, {value: '75%'});
        },
      }),
    );
  };

  return (
    <Background isDarkMode={isDarkMode}>
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
      {formData.errors.currentLocation ? (
        <ScaleText
          TextStyle={styles.errStyle}
          text={formData.errors.currentLocation}
        />
      ) : null}

      <CustomDropdown
        minimumDate={new Date()}
        isDarkMode={isDarkMode}
        value={moment(formData.startDate).format(dateFormet)}
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

      <View style={styles.cardContainer}>
        <ScaleText
          isDarkMode={isDarkMode}
          fontSize={ms(14)}
          fontFamily={Fonts.type.Mediu}
          text={'Would you be willing to relocate for this position?'}
        />
        <View style={styles.buttonGroup}>
          <ButtonView
            onPress={() => setStateData({isBackgound: true})}
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
            onPress={() => setStateData({isBackgound: false})}
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
  cardContainer: {
    marginVertical: ms(20),
  },
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
