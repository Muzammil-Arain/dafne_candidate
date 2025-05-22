import {StyleSheet, View} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
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
    frequencyvalue: null,
    currencyvalue: null,
  });

  const [formObj, betweenProps, andProps, NegotiableProps] =
    useHookForm(
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
  }, [navigation]);

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
    // NavigationService.navigate(StackNav.Where, { key: true });
    // return
    if (!validateFields()) return;
    handleSubmit();
  };

  const handleSubmit = formObj.handleSubmit(values => {
    if (!validateFields()) return;
    console.log('🚀 ~ What ~ values:', values);

    const {and, between, currency, negotiable} = values;
    const formdata = {
      preferable_industry_id: perID,
      industry_id: statedata.selectedindustry?.id,
      // type: statedata.selectedtype,
      employee_type_id: statedata.selectedtype?.id,
      position_looking_for: statedata.selectedposition?.id,
      // level: statedata.selectedlevel,
      level_of_experience_id: statedata.selectedlevel?.id,
      salary_between: between,
      salary_and: and,
      salary_frequency: statedata.frequencyvalue?.name,
      salary_currency: statedata.currencyvalue?.name,
      salary_negotiable: negotiable ? 1 : 0,
      have_relevant_certificate_license: statedata.relevantJob ? 1 : 0,
      offer_from_other_industries: statedata.isBackgound ? 1 : 0,
      current_location: 1,
      location_for_job: 1,
    };

    dispatch(
      PREFERABLE_INDUSTRY_API.request({
        payloadApi: formdata,
        cb: res => {
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
        {/* <TextInputCustom
          isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="Frequency"
          {...frequencyProps}
        /> */}
        <CustomDropdown
          isDarkMode={isDarkMode}
          mainContainerStyle={styles.cuntomStyle}
          label="Frequency"
          value={statedata?.frequencyvalue?.name}
          selectedValue={value => {
            setStateData(prev => ({...prev, frequencyvalue: value}));
            // Uncomment and use below if you're updating state
            // handleLicenseFieldChange(licenseIndex, 'license', value);
          }}
          data={statedata.getfreqency}
        />

        {/* <TextInputCustom
          isDarkMode={isDarkMode}
          cuntomStyle={styles.cuntomStyle}
          label="Currency"
          {...currencyProps}
        /> */}
        <CustomDropdown
          isDarkMode={isDarkMode}
          mainContainerStyle={styles.cuntomStyle}
          label="Currency"
          value={statedata?.currencyvalue?.name}
          selectedValue={value => {
            setStateData(prev => ({...prev, currencyvalue: value}));
            // Uncomment and use below if you're updating state
            // handleLicenseFieldChange(licenseIndex, 'license', value);
          }}
          data={statedata.getcurrency}
        />
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          isDarkMode={isDarkMode}
          {...NegotiableProps}
          text={'Negotiable?'}
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
