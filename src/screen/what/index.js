import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {AppButton, Background, ScaleText} from '../../common';
import {Colors, Fonts, Metrics} from '../../theme';
import {ButtonView, CustomDropdown, TextInputCustom} from '../../components';
import {screenOptions} from '../../naviagtor/config';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import CheckBox from '../../components/CheckBox';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {dummyDropdownData} from '../../utils/Hardcorddata';
import datahandler from '../../helper/datahandler';
import {
  GET_COUNTRIES_API,
  GET_EMPLOYMENT_API,
  GET_EXPERIENCE_API,
  GET_INDUSTRY_API,
  GET_INTERVIEW_JOBS_API,
  GET_JOB_API,
  PREFERABLE_INDUSTRY_API,
  PROFILE_PERCENTAGE_API,
  SALARY_CURRENCY_API,
  SALARY_FREQYENCYS_API,
} from '../../ducks/app';
import {useDispatch} from 'react-redux';

const isDarkMode = datahandler.getAppTheme();

const FrequencyData = [{name: 'Monthly'}, {name: 'yearly'}];

const What = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {perID, isFromKeyFalse} = route?.params;
  console.log('🚀 ~ What ~ perID:', perID);
  const [statedata, setStateData] = useState({
    isBackgound: true,
    relevantJob: true,
    selectedindustry: '',
    selectedtype: '',
    selectedposition: '',
    selectedlevel: '',
    errors: {},
    getIndustryData: [],
    getEmployment: [],
    getJob: [],
    getexperience: [],
    Errfrequencyvalue: false,
    Errcurrencyvalue: false,
    frequencyvalue: null,
    currencyvalue: null,
  });
  console.log("🚀 ~ What ~What ~ statedata statedata:", statedata?.currencyvalue)

  const [jobsData, setJobsData] = useState(null);
  console.log('🚀 ~ What ~ jobsData:', jobsData);
  const [refreshing, setRefreshing] = useState(false);

  const [formObj, betweenProps, andProps, NegotiableProps] = useHookForm(
    ['between', 'and', 'negotiable'],
    {negotiable: false},
    ValidationSchema.what,
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'What?',
      ),
    );
  }, [navigation, isDarkMode]);

  useEffect(() => {
    handleGetAPISData();
    getNotificationData();
  }, [navigation]);

  const getNotificationData = useCallback(async () => {
    setRefreshing(true);
    try {
      dispatch(
        GET_INTERVIEW_JOBS_API.request({
          payloadApi: {},
          params: perID,
          cb: async res => {
            if (res?.data?.employee_type) {
              console.log('🚀 ~ getNotificationData ~ res?.data:', res?.data?.salary_between);
              setJobsData(res?.data);
              setStateData(prev => ({
                ...prev,
                selectedindustry: {
                  id: res?.data?.industry_id,
                  name: res?.data?.industry,
                },
                selectedtype: {
                  id: res?.data?.employee_type_id,
                  name: res?.data?.employee_type,
                },
                selectedposition: {
                  id: res?.data?.industry_id,
                  name: res?.data?.position_looking_for,
                },
                selectedlevel: {
                  id: res?.data?.level_of_experience_id,
                  name: res?.data?.level_of_experience,
                },
                frequencyvalue: {
                  name: res?.data?.salary_frequency,
                },
                currencyvalue: {
                  id: res?.data?.salary_currency_id,
                  name: res?.data?.salary_currency,
                  code:res?.data?.salary_currency_code,
                  symbol:res?.data?.salary_currency_symbol
                },
                isBackgound:
                  res?.data?.offer_from_other_industries == 1 ? true : false,
                relevantJob:
                  res?.data?.have_relevant_certificate_license == 1
                    ? true
                    : false,
              }));
              formObj.setValue('between',res?.data?.salary_between > 0 && res?.data?.salary_between);
              formObj.setValue('and',res?.data?.salary_and > 0 &&  res?.data?.salary_and);
              formObj.setValue(
                'negotiable',
                res?.data?.salary_negotiable == 1 ? true : false,
              );
              setRefreshing(false);
            }
          },
        }),
      );
    } catch (error) {
      console.log('Error fetching data:', error);
      setRefreshing(false);
    }
  }, [dispatch]);

  const handleGetAPISData = async () => {
    const apiRequests = [
      {
        action: GET_INDUSTRY_API,
        key: 'getIndustryData',
        transform: val => ({...val, name: val.industry_name}),
      },
      {
        action: GET_EMPLOYMENT_API,
        key: 'getEmployment',
        transform: val => ({...val, name: val.employment_type}),
      },
      {
        action: GET_JOB_API,
        key: 'getJob',
        transform: val => ({...val, name: val.job_title}),
      },
      {
        action: GET_EXPERIENCE_API,
        key: 'getexperience',
        transform: val => ({...val, name: val.experience_level}),
      },
      {
        action: SALARY_CURRENCY_API,
        key: 'getcurrency',
        transform: val => ({...val, name: val.name}),
      },
      {
        action: SALARY_FREQYENCYS_API,
        key: 'getfreqency',
        transform: val => ({...val, name: val.name}),
      },
    ];

    for (const req of apiRequests) {
      await fetchAndUpdateState(req);
      await new Promise(res => setTimeout(res, 300)); // 300ms delay between API calls
    }
  };

  const fetchAndUpdateState = ({action, key, transform}) => {
    return new Promise(resolve => {
      dispatch(
        action.request({
          payloadApi: {},
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

  const validateFields = () => {
    let errors = {};

    if (!statedata.selectedindustry)
      errors.selectedindustry = 'This field is required';

    if (!statedata.selectedtype) errors.selectedtype = 'This field is required';

    if (!statedata.selectedposition)
      errors.selectedposition = 'This field is required';

    if (!statedata.selectedlevel)
      errors.selectedlevel = 'This field is required';

    setStateData(prev => ({...prev, errors}));

    return Object.keys(errors).length === 0;
  };

  const handleApiSumbit = () => {
    const isValid = validateFields();

    if (!isValid) return;

    // Additional validation for frequencyvalue and currencyvalue
    let updateErrors = {};

    if (!statedata.frequencyvalue) updateErrors.Errfrequencyvalue = true;

    // if (!statedata.currencyvalue) updateErrors.Errcurrencyvalue = true;

    if (Object.keys(updateErrors).length > 0) {
      setStateData(prev => ({...prev, ...updateErrors}));
      return; // prevent submission if frequency/currency is missing
    }

    handleSubmit();
  };

  const handleSubmit = formObj.handleSubmit(values => {
    console.log('🚀 ~ What ~ values:', values);

    if (!validateFields()) return;

    const {and, between, currency, negotiable} = values;
    const formdata = {
      preferable_industry_id: perID,
      industry_id: statedata.selectedindustry?.id,
      employee_type_id: statedata.selectedtype?.id,
      position_looking_for: statedata.selectedposition?.id,
      level_of_experience_id: statedata.selectedlevel?.id,
      salary_negotiable: negotiable ? 1 : 0,
      have_relevant_certificate_license: statedata.relevantJob ? 1 : 0,
      offer_from_other_industries: statedata.isBackgound ? 1 : 0,
      current_location: 1,
      location_for_job: 1,
      ...(between && {salary_between: between}),
      ...(and && {salary_and: and}),
      ...(statedata.frequencyvalue?.name && {
        salary_frequency: statedata.frequencyvalue.name,
      }),
      ...(statedata.currencyvalue?.id && {
        salary_currency: statedata.currencyvalue.id,
      }),
    };

    console.log('🚀 ~ What ~ formdata:', formdata);

    dispatch(
      PREFERABLE_INDUSTRY_API.request({
        payloadApi: formdata,
        cb: res => {
          if (isFromKeyFalse) {
            NavigationService.navigate(StackNav.Where, {
              key: true,
              perID: perID,
              jobsData: jobsData,
            });
            return;
          }
          const formData = new FormData();
          formData.append('percentage', `Where / ${true} / ${perID}`);
          const isNewProject = datahandler.getisNewProject();
          dispatch(
            PROFILE_PERCENTAGE_API.request({
              payloadApi: formData,
              cb: async res => {
                if (isFromKeyFalse == false) {
                  if (isNewProject) {
                    datahandler.setisNewProject(null);
                    NavigationService.navigate('AppStack', {key: true});
                    return;
                  }
                  const formData = new FormData();
                  formData.append('percentage', 'UploadProfile');

                  await dispatch(
                    PROFILE_PERCENTAGE_API.request({payloadApi: formData}),
                  );
                  NavigationService.push(StackNav.CompleteProfile, {
                    value: '75%',
                  });
                } else {
                  NavigationService.navigate(StackNav.Where, {
                    key: true,
                    perID: perID,
                    jobsData: jobsData,
                  });
                }
              },
            }),
          );
        },
      }),
    );
  });

  return (
    <Background isDarkMode={isDarkMode}>
      {[
        {
          label: 'Industry',
          key: 'selectedindustry',
          Apidata: statedata.getIndustryData,
        },
        {
          label: 'Type',
          key: 'selectedtype',
          Apidata: statedata.getEmployment,
        },
        {
          label: 'Position',
          key: 'selectedposition',
          Apidata: statedata.getJob,
        },
        {
          label: 'Level of Experience',
          key: 'selectedlevel',
          Apidata: statedata.getexperience,
        },
      ].map(({label, key, Apidata}) => (
        <View key={key}>
          <CustomDropdown
            isDarkMode={isDarkMode}
            value={statedata?.[key]?.name || `Select ${label}`}
            label={label}
            data={Apidata || []}
            selectedValue={value =>
              setStateData(prev => ({...prev, [key]: value}))
            }
          />
          {statedata.errors?.[key] && (
            <ScaleText color="red" text={statedata.errors[key]} />
          )}
        </View>
      ))}

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
            onPress={() => setStateData(prev => ({...prev, isBackgound: true}))}
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
              setStateData(prev => ({...prev, isBackgound: false}))
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
            onPress={() => setStateData(prev => ({...prev, relevantJob: true}))}
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
              setStateData(prev => ({...prev, relevantJob: false}))
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
          keyboardType="numeric"
          isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="Between"
          {...betweenProps}
        />
        <TextInputCustom
          keyboardType="numeric"
          isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="And"
          {...andProps}
        />
      </View>
      <View style={styles.flexViewStyle}>
        <View>
          <CustomDropdown
            isDarkMode={isDarkMode}
            mainContainerStyle={styles.cuntomStyle}
            label="Frequency"
            value={statedata?.frequencyvalue?.name}
            selectedValue={value => {
              setStateData(prev => ({
                ...prev,
                frequencyvalue: value,
                Errfrequencyvalue: false,
              }));
            }}
            data={statedata.getfreqency}
          />
          {statedata.Errfrequencyvalue && (
            <View style={{position: 'absolute', bottom: -15, left: ms(10)}}>
              <ScaleText
                fontSize={ms(12)}
                color={Colors.red[500]}
                text={'This field is required'}
              />
            </View>
          )}
        </View>

        <View>
          <CustomDropdown
            isDarkMode={isDarkMode}
            mainContainerStyle={styles.cuntomStyle}
            label="Currency"
            value={statedata?.currencyvalue?.name ? `${statedata?.currencyvalue?.code}-${statedata?.currencyvalue?.symbol}` : null}
            selectedValue={value => {
              setStateData(prev => ({
                ...prev,
                currencyvalue: value,
                Errcurrencyvalue: false,
              }));
            }}
            data={statedata.getcurrency}
          />
          {statedata.Errcurrencyvalue && (
            <View style={{position: 'absolute', bottom: -15, left: ms(10)}}>
              <ScaleText
                fontSize={ms(12)}
                color={Colors.red[500]}
                text={'This field is required'}
              />
            </View>
          )}
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <CheckBox
          isDarkMode={isDarkMode}
          {...NegotiableProps}
          text={'Negotiable?'}
          onChangeCustom={async val => {
            if (!val) {
              const values = formObj.getValues();
              const {between, and} = values ?? '';
              if (!between) {
                formObj.setError('between', {
                  type: 'manual',
                  message: 'Please enter Between',
                });
              }
              if (!and) {
                formObj.setError('and', {
                  type: 'manual',
                  message: 'Please enter And',
                });
                // if (!statedata.currencyvalue) {
                //   setStateData(prev => ({...prev, Errcurrencyvalue: true}));
                // }
              }
            } else {
              formObj.setError('and', {
                type: 'manual',
                message: null,
              });
              formObj.setError('between', {
                type: 'manual',
                message: null,
              });
              setStateData(prev => ({...prev, Errcurrencyvalue: false}));
            }
            // useHookField(formObj, 'and')
            // await formObj.setError('and', 'acbde')
            // console.log(":rocket: ~ ProjectCreateSecondStep ~ val:", val)
          }}
        />
      </View>
      <AppButton
        type={'PREFERABLE_INDUSTRY'}
        onPress={handleApiSumbit}
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
    width: '160@ms', // Scaled width
  },
  labelTextStyle: {
    marginLeft: '10@ms', // Scaled margin left
    marginTop: '10@ms', // Scaled margin top
  },
  checkboxContainer: {
    marginVertical: '20@ms', // Scaled vertical margin
  },
});
