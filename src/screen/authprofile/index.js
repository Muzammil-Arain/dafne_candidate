//lib
import moment from 'moment';
import {ProgressBar} from 'react-native-paper';
import {ms} from 'react-native-size-matters';
import {View, Text, TouchableOpacity} from 'react-native';

//local import
import {
  AppCheckBox,
  ButtonView,
  CustomDropdown,
  TextInputCustom,
} from '../../components';
import {Colors, Fonts} from '../../theme';
import {StackNav} from '../../naviagtor/stackkeys';
import datahandler from '../../helper/datahandler';
import {NavigationService, Util} from '../../utils';
import {screenOptions} from '../../naviagtor/config';
import {dummyDropdownData} from '../../utils/Hardcorddata';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {AppButton, Background, ScaleText, VectorIcon} from '../../common';
import {styles} from './styles';
import {
  changeSteps,
  dateFormet,
  getoptionsdata,
  progressSteps,
  progressTextSteps,
  steps,
} from './data';
import {LOGIN_API} from '../../ducks/auth';
import {
  EDUCATION_API,
  GET_EMPLOYMENT_API,
  GET_COUNTRIES_API,
  GET_INDUSTRY_API,
  GET_JOB_API,
  LANGUAGE_API,
  LICENSE_API,
  PASSPORT_VISA_API,
  SKILLS_API,
  WORK_EXPERIENCE_API,
  GET_LANGUAGES_API,
  GET_SKILLS_API,
  GET_LICANCE_API,
  GET_CERTIFICATE_API,
  GET_DEGREE_API,
  PROFILE_PERCENTAGE_API,
  GET_STATE_API,
  API_GET_CITY_API,
} from '../../ducks/app';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GooglePlacesInput from '../../common/GooglePlace';

const AuthProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [formObj, emailProps, termProps] = useHookForm(
    ['email', 'password', 'term'],
    {term: false, email: ' '},
    ValidationSchema.logIn,
  );
  const isDarkMode = datahandler.getAppTheme();
  useEffect(() => {
    const getLocation = datahandler.getCurrentLocation();
  }, []);

  const [statedata, setStateData] = useState({
    Experience: [
      {
        industry: '',
        employmentType: '',
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        flightTime: '',
        turbineTime: '',
        pictime: '',
        sictime: '',
        typerate: '',
        currently_working: null,
      },
    ],
    Education: [
      {
        school: '',
        degree: '',
        field: '',
        startDate: '',
        endDate: '',
      },
    ],
    Passport: [
      {
        passport: '',
        dateofexp: '',
      },
    ],
    Visa: [
      {
        visa: '',
        dateofexp: '',
      },
    ],
    language: [
      {
        language: '',
      },
    ],
    Skills: [
      {
        skill: '',
      },
    ],
    Certificate: [
      {
        certificate: '',
        issue_country: '',
      },
    ],
    License: [
      {
        license: '',
        issue_country: '',
      },
    ],
    currentStep: null,
    NextEnalbe: false,
    selectedExpId: 0,
    selectedEudId: 0,
    selectedpasId: 0,
    selectedlangId: 0,
    selectedSkillId: 0,
    selectedLicenseId: 0,
    selectedCertificateId: 0,
    selectedVisaId: 0,
    isLoading: false,
    getIndustryData: [],
    getEmployment: [],
    getJob: [],
    getCountry: [],
    getLanguages: [],
    getSkills: [],
    getLicance: [],
    getCertificate: [],
    getDegree: [],
    showLocationPop: false,
  });

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        statedata.currentStep == null
          ? `${`Let's get to know you!`}`
          : `${'Complete your Profile'}`,
        true,
        false,
      ),
    );
  }, [navigation, statedata.currentStep]);

  console.log('====================================');
  console.log(statedata, 'statedata statedata statedata');
  console.log('====================================');

  const handleNext = index => {
    // setStateData(prev => ({ ...prev, isLoading: true }));
    // setTimeout(() => {
    setStateData(prev => ({...prev, currentStep: index, isLoading: false}));
    // }, 1500);
  };

  useEffect(() => {
    handleGetAPISData();
    getLocalData();
  }, [navigation]);

  const getLocalData = async () => {
    try {
      const Experience = await AsyncStorage.getItem('Experience');
      const Education = await AsyncStorage.getItem('Education');
      const Passport = await AsyncStorage.getItem('Passport');
      const language = await AsyncStorage.getItem('language');
      const Visa = await AsyncStorage.getItem('Visa');
      const Skills = await AsyncStorage.getItem('Skills');

      const parsedExperience = JSON.parse(Experience || '[]');
      const parsedEducation = JSON.parse(Education || '[]');
      const parsedPassport = JSON.parse(Passport || '[]');
      const parsedVisa = JSON.parse(Visa || '[]');
      const parsedlanguage = JSON.parse(language || '[]');
      const parsedSkills = JSON.parse(Skills || '[]');

      console.log('====================================');
      console.log(parsedSkills, 'Parsed Skills');
      console.log('====================================');

      const filledExperiences = parsedExperience.map(item => ({
        industry: {
          id: item?.industry?.id || '',
          name: item?.industry?.name || '',
        },
        employmentType: {
          id: item?.employmentType?.id || '',
          name: item?.employmentType?.employment_type || '',
        },
        jobTitle: {
          id: item?.jobTitle?.id || '',
          name: item?.jobTitle?.job_title || '',
        },
        companyName: item?.companyName || '',
        location:
          {
            lat: item.location?.lat,
            lng: item.location?.lng,
            name: item.location?.name,
          } || {},
        startDate: item?.startDate || '',
        endDate: item?.endDate || '',
        still_working: item?.currently_working == 1,

        flightTime: item?.flight_time,
        turbineTime: item?.turbin_time,
        pictime: item?.pic_time,
        sictime: item?.sic_time,
        typerate: {
          name: item?.require_type_rating,
        },
      }));

      const filledEducation = parsedEducation?.map(item => {
        return {
          school: item?.school || '',
          degree: {
            name: item?.degree?.name || '',
            id: item?.degree?.id,
          },
          field: item?.field || '',
          startDate: item?.startDate || '',
          endDate: item?.endDate || '',
        };
      });

      const filledPassport = parsedPassport.map(item => ({
        passport: {
          name: item.passport?.full_name,
          id: item.passport?.id,
        },
        dateofexp: item.dateofexp,
      }));

      const filledVisa = parsedVisa.map(item => ({
        visa: {
          name: item.visa?.name,
          id: item.visa?.id,
        },
        dateofexp: item.dateofexp || '',
      }));

      const filledLanguage = parsedlanguage?.map((item, index) => ({
        language: {
          name: item?.language?.name,
          id: item?.language?.id,
        },
      }));

      const filledSkill = parsedSkills?.map((item, index) => ({
        skill: {
          name: item?.skill?.name,
          id: item?.skill?.id,
        },
      }));
      console.log(
        '🚀 ~ filledSkill ~ filledSkill:',
        filledSkill.length == 0 ? true : false,
      );

      setStateData(prev => ({
        ...prev,
        currentStep:
          filledSkill.length !== 0
            ? 5
            : filledLanguage.length !== 0
            ? 4
            : filledVisa.length !== 0
            ? 3
            : filledEducation.length !== 0
            ? 2
            : filledExperiences.length !== 0
            ? 1
            : 0,
        Experience:
          filledExperiences.length == 0
            ? [
                {
                  industry: '',
                  employmentType: '',
                  jobTitle: '',
                  companyName: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  currently_working: null,
                  flightTime: '',
                  turbineTime: '',
                  pictime: '',
                  sictime: '',
                  typerate: '',
                },
              ]
            : filledExperiences,
        Education:
          filledEducation.length === 0
            ? [
                {
                  school: '',
                  degree: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                },
              ]
            : filledEducation,
        Passport:
          filledPassport.length == 0
            ? [
                {
                  passport: '',
                  dateofexp: '',
                },
              ]
            : filledPassport,
        Visa:
          filledVisa.length == 0
            ? [
                {
                  visa: '',
                  dateofexp: '',
                },
              ]
            : filledVisa,
        language:
          filledLanguage.length == 0
            ? [
                {
                  language: '',
                },
              ]
            : filledLanguage,
        Skills:
          filledSkill.length == 0
            ? [
                {
                  skill: '',
                },
              ]
            : filledSkill,
      }));
    } catch (error) {
      console.error('Error parsing Experience data:', error);
    }
  };

  const handleGetAPISData = async () => {
    const apiBatches = [
      // Batch 1
      [
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
      ],
      // Batch 2
      [
        {
          action: GET_JOB_API,
          key: 'getJob',
          transform: val => ({...val, name: val.job_title}),
        },
        {
          action: GET_COUNTRIES_API,
          key: 'getCountry',
        },
      ],
      // Batch 3
      [
        {
          action: GET_LANGUAGES_API,
          key: 'getLanguages',
        },
        {
          action: GET_SKILLS_API,
          key: 'getSkills',
        },
        {
          action: GET_DEGREE_API,
          key: 'getDegree',
        },
      ],
      [
        {
          action: GET_LICANCE_API,
          key: 'getLicance',
        },
        {
          action: GET_CERTIFICATE_API,
          key: 'getCertificate',
        },
        {
          action: GET_COUNTRIES_API,
          key: 'getcountries',
        },
      ],
    ];

    for (let batch of apiBatches) {
      await Promise.all(batch.map(fetchAndUpdateState));
      await new Promise(res => setTimeout(res, 500));
    }
  };

  const fetchAndUpdateState = ({action, key, transform}) => {
    return new Promise(resolve => {
      dispatch(
        action.request({
          payloadApi: {},
          cb: async res => {
            const updatedData = transform ? res?.map(transform) : res;
            setStateData(prev => ({...prev, [key]: updatedData}));
            resolve();
          },
        }),
      );
    });
  };

  const handleFieldChange = (expIndex, field, value) => {
    setStateData(prev => {
      const updatedExperience = [...prev.Experience];
      updatedExperience[expIndex] = {
        ...updatedExperience[expIndex],
        [field]: value,
      };
      return {...prev, Experience: updatedExperience};
    });
  };

  const updateExperienceField = (index, field, value) => {
    setStateData(prev => {
      const updatedExperience = [...prev.Experience];
      updatedExperience[index][field] = value;
      return {...prev, Experience: updatedExperience};
    });
  };

  const handlePassportFieldChange = (expIndex, field, value) => {
    setStateData(prev => {
      const UpdatePassportFiled = [...prev.Passport];
      UpdatePassportFiled[expIndex] = {
        ...UpdatePassportFiled[expIndex],
        [field]: value,
      };
      return {...prev, Passport: UpdatePassportFiled};
    });
  };

  const handleVisaFieldChange = (expIndex, field, value) => {
    setStateData(prev => {
      const UpdateVisaFiled = [...prev.Visa];
      UpdateVisaFiled[expIndex] = {
        ...UpdateVisaFiled[expIndex],
        [field]: value,
      };
      return {...prev, Visa: UpdateVisaFiled};
    });
  };

  const handleLanguageFieldChange = (langIndex, field, value) => {
    setStateData(prev => {
      const UpdatelanguageFiled = [...prev.language];
      UpdatelanguageFiled[langIndex] = {
        ...UpdatelanguageFiled[langIndex],
        [field]: value,
      };
      return {...prev, language: UpdatelanguageFiled};
    });
  };

  const handleSkillsFieldChange = (skillIndex, field, value) => {
    setStateData(prev => {
      const UpdateskillsFiled = [...prev.Skills];
      UpdateskillsFiled[skillIndex] = {
        ...UpdateskillsFiled[skillIndex],
        [field]: value,
      };
      return {...prev, Skills: UpdateskillsFiled};
    });
  };

  const handleLicenseFieldChange = (skillIndex, field, value) => {
    setStateData(prev => {
      const UpdatelicenseFiled = [...prev.License];
      UpdatelicenseFiled[skillIndex] = {
        ...UpdatelicenseFiled[skillIndex],
        [field]: value,
      };
      return {...prev, License: UpdatelicenseFiled};
    });
  };

  const handleCertificatesFieldChange = (certifIndex, field, value) => {
    setStateData(prev => {
      const UpdateCertificateFiled = [...prev.Certificate];
      UpdateCertificateFiled[certifIndex] = {
        ...UpdateCertificateFiled[certifIndex],
        [field]: value,
      };
      return {...prev, Certificate: UpdateCertificateFiled};
    });
  };

  const handleAddExperienceApi = async id => {
    const {Experience} = statedata;
    console.log('🚀 ~ AuthProfile ~ Experience:', Experience);

    if (!Experience || Experience.length === 0) {
      console.warn('No experience data found');
      return;
    }

    // for (let i = 0; i < Experience.length; i++) {
    //   const exp = Experience[i];
    //   console.log("🚀 ~ AuthProfile ~ exp:", exp)

    //   if (!exp.industry?.id) {
    //     Util.showMessage(
    //       `Please select Industry for Experience ${i + 1}`,
    //       'danger',
    //     );
    //     return;
    //   }
    // }

    const handlepayload = {
      industry_id: Experience.map(exp => exp.industry.id),
      employment_type_id: Experience.map(exp => exp.employmentType.id),
      job_title_id: Experience.map(exp => exp.jobTitle.id),
      company_name: Experience.map(exp => exp.companyName),
      location: Experience.map(exp => ({
        lat: exp.location?.latitude,
        lng: exp.location?.longitude,
        name: exp.location?.name,
      })),
      start_date: Experience.map(exp => exp.startDate),
      end_date: Experience.map(exp => exp.endDate || ''),
      still_working: Experience.map(exp => (exp.still_working ? '1' : '0')),

      //optional
      flight_time: Experience.map(exp => exp.flightTime),
      turbin_time: Experience.map(exp => exp.turbineTime),
      pic_time: Experience.map(exp => exp.pictime),
      sic_time: Experience.map(exp => exp.sictime),
      require_type_rating: Experience.map(exp => exp.typerate?.name),
    };
    console.log(handlepayload, 'handlepayload Experience');

    // return;
    setStateData(prev => ({...prev, isLoading: 'WORK_EXPERIENCE'}));
    dispatch(
      WORK_EXPERIENCE_API.request({
        payloadApi: handlepayload,
        cb: res => {
          handleNext(id);
          changeSteps(id + 1);
          AsyncStorage.setItem('Experience', JSON.stringify(Experience));
          Util.showMessage('Experience has been added successfully', 'success');
        },
      }),
    );
  };

  const handleAddEducationApi = async id => {
    const {Education} = statedata;

    if (!Education || Education.length === 0) {
      console.warn('No Education data found');
      return;
    }

    const handlepayload = {
      school: Education.map(exp => exp.school),
      degree_id: Education.map(exp => exp.degree.id),
      subject: Education.map(exp => exp.field),
      start_date: Education.map(exp => exp.startDate),
      end_date: Education.map(exp => exp.endDate),
    };

    setStateData(prev => ({...prev, isLoading: 'EDUCATION'}));
    dispatch(
      EDUCATION_API.request({
        payloadApi: handlepayload,
        cb: res => {
          AsyncStorage.setItem('Education', JSON.stringify(Education));
          Util.showMessage('Education details added successfully', 'success');
          handleNext(id);
          changeSteps(id + 1);
        },
      }),
    );
  };

  const handleAddPassportApi = async id => {
    const {Passport, Visa} = statedata;
    console.log('🚀 ~ AuthProfile ~ Visa.lengt:', Visa?.[0]?.visa);

    if (!Passport || Passport.length === 0) {
      console.warn('No Passport data found');
      return;
    }
    const handlepayload = {};

    const passport_country_id = Passport.map(item => item.passport?.id || null);
    const passport_expiry_date = Passport.map(item => item.dateofexp || null);

    // Add passport fields only if at least one non-null value
    if (passport_country_id.some(id => id !== null)) {
      handlepayload.passport_country_id = passport_country_id;
    }
    if (passport_expiry_date.some(date => date !== null && date !== '')) {
      handlepayload.passport_expiry_date = passport_expiry_date;
    }

    // Handle visa conditionally
    if (Visa?.[0]?.visa !== '') {
      const visa_country_id = Visa.map(item => item.visa?.id || null);
      const visa_expiry_date = Visa.map(item => item.dateofexp || null);

      if (visa_country_id.some(id => id !== null)) {
        handlepayload.visa_country_id = visa_country_id;
      }
      if (visa_expiry_date.some(date => date !== null && date !== '')) {
        handlepayload.visa_expiry_date = visa_expiry_date;
      }
    }

    console.log('Final Payload:', handlepayload);
    dispatch(
      PASSPORT_VISA_API.request({
        payloadApi: handlepayload,
        cb: res => {
          AsyncStorage.setItem('Passport', JSON.stringify(Passport)),
            AsyncStorage.setItem('Visa', JSON.stringify(Visa)),
            Util.showMessage(
              'Passport/Visa details added successfully',
              'success',
            );
          handleNext(id);
          changeSteps(id + 1);
        },
      }),
    );
  };

  const handleAddLanguageApi = async id => {
    const {language} = statedata;

    if (!language || language.length === 0) {
      console.warn('No language data found');
      return;
    }

    const handlepayload = {
      language_id: language.map(exp => exp.language.id),
    };
    setStateData(prev => ({...prev, isLoading: 'LANGUAGE'}));
    dispatch(
      LANGUAGE_API.request({
        payloadApi: handlepayload,
        cb: res => {
          AsyncStorage.setItem('language', JSON.stringify(language));
          Util.showMessage('Language added successfully', 'success');
          handleNext(id);
          changeSteps(id + 1);
        },
      }),
    );
  };

  const handleAddSkillApi = async id => {
    const {Skills} = statedata;

    if (!Skills || Skills.length === 0) {
      console.warn('No Skills data found');
      return;
    }

    const handlepayload = {
      skill_id: Skills.map(exp => exp.skill.id),
    };

    setStateData(prev => ({...prev, isLoading: 'SKILLS'}));
    dispatch(
      SKILLS_API.request({
        payloadApi: handlepayload,
        cb: res => {
          AsyncStorage.setItem('Skills', JSON.stringify(Skills));
          Util.showMessage('Skills added successfully', 'success');
          handleNext(id);
          changeSteps(id + 1);
        },
      }),
    );
  };

  const handleAddLicenseApi = async id => {
    const {License, Certificate} = statedata;

    if (!License?.[0]?.issue_country == '' || License[0].license == '') {
      const formData = new FormData();
      formData.append('percentage', 'CompleteProfile');
      dispatch(
        PROFILE_PERCENTAGE_API.request({
          payloadApi: formData,
          cb: res => {
            // Util.showMessage(
            //   'License and Certificate added successfully',
            //   'success',
            // );
            NavigationService.push(StackNav.CompleteProfile, {
              value: '60%',
            });
          },
        }),
      );
      console.warn('No License and Certificate data found');
      return;
    }

    const handlepayload = {
      license_id: License.map(exp => exp.license.id),
      license_country_id: License.map(exp => exp.issue_country.id),
      certificate_id: Certificate.map(exp => exp.certificate.id),
      certificate_country_id: Certificate.map(exp => exp.issue_country.id),
    };

    setStateData(prev => ({...prev, isLoading: 'LICENSE'}));

    dispatch(
      LICENSE_API.request({
        payloadApi: handlepayload,
        cb: res => {
          const formData = new FormData();
          formData.append('percentage', 'CompleteProfile');
          dispatch(
            PROFILE_PERCENTAGE_API.request({
              payloadApi: formData,
              cb: res => {
                Util.showMessage(
                  'License and Certificate added successfully',
                  'success',
                );
                NavigationService.push(StackNav.CompleteProfile, {
                  value: '60%',
                });
              },
            }),
          );
        },
      }),
    );
  };

  const experiencesetup = index => {
    const renderExperienceSection = (experience, expIndex) => {
      console.log('🚀 ~ renderExperienceSection ~ expIndex:', expIndex);
      console.log('🚀 ~ renderExperienceSection ~ experience:', experience);
      const isSelected = statedata.selectedExpId === expIndex;
      return (
        <View key={expIndex}>
          <View style={{width: ms(275)}}>
            {statedata.Experience.length > 1 && (
              <ButtonView onPress={() => handleRemoveExperience(expIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <View style={styles.row}>
              <CustomDropdown
                isDarkMode={isDarkMode}
                value={experience.industry.name}
                label="Industry"
                selectedValue={value =>
                  handleFieldChange(expIndex, 'industry', value)
                }
                mainContainerStyle={styles.dropdownStyle}
                data={statedata.getIndustryData}
                // data={statedata.getSkills}
                name={'industry_name'}
              />
              <CustomDropdown
                isDarkMode={isDarkMode}
                value={experience.employmentType.name}
                label="Employment Type"
                selectedValue={value =>
                  handleFieldChange(expIndex, 'employmentType', value)
                }
                mainContainerStyle={styles.dropdownStyle}
                data={statedata.getEmployment}
                // data={statedata.getSkills}
              />
            </View>
            <CustomDropdown
              isDarkMode={isDarkMode}
              value={experience.jobTitle.name}
              label="Job Title"
              selectedValue={value =>
                handleFieldChange(expIndex, 'jobTitle', value)
              }
              data={statedata.getJob}
              // data={statedata.getSkills}
            />
            <TextInputCustom
              optional={true}
              isDarkMode={isDarkMode}
              placeholder="Enter Company Name"
              label="Enter Company Name"
              value={experience.companyName}
              onChangeText={text =>
                setStateData(prev => {
                  const updatedExperience = [...prev.Experience];
                  updatedExperience[expIndex].companyName = text;
                  return {...prev, Experience: updatedExperience};
                })
              }
            />

            {/* <CustomDropdown
              isDarkMode={isDarkMode}
              value={experience?.country?.name}
              label="Enter Country Name"
              selectedValue={value => {
                handleGetStates(value);
                handleFieldChange(expIndex, 'country', value);
              }}
              data={statedata.getCountry}
            /> */}

            {/* <TextInputCustom
              optional={true}
              isDarkMode={isDarkMode}
              placeholder="Enter Location"
              label="Location"
              value={experience.location}
              onChangeText={text =>
                setStateData(prev => {
                  const updatedExperience = [...prev.Experience];
                  updatedExperience[expIndex].location = text;
                  return {...prev, Experience: updatedExperience};
                })
              }
            /> */}

            <CustomDropdown
              onPressValue={() => {
                setStateData(prev => ({
                  ...prev,
                  showLocationPop: expIndex,
                }));
              }}
              isDarkMode={isDarkMode}
              value={experience.location.name}
              label="Enter Location"
            />

            <GooglePlacesInput
              expIndex={expIndex}
              visible={statedata.showLocationPop === expIndex}
              onClose={() =>
                setStateData(prev => ({
                  ...prev,
                  showLocationPop: false,
                }))
              }
              containerstyle={{width: ms(330)}}
              placeholder="Enter Location"
              onPlaceSelected={(index, text) => {
                updateExperienceField(expIndex, 'location', text);
              }}
            />

            <View style={styles.row}>
              <CustomDropdown
                isDarkMode={isDarkMode}
                type={false}
                value={experience.startDate}
                label="Start Date"
                maximumDate={new Date()}
                selectedValue={value =>
                  handleFieldChange(
                    expIndex,
                    'startDate',
                    moment(value).format(dateFormet),
                  )
                }
                mainContainerStyle={styles.dropdownStyle}
              />
              {!experience.currently_working && (
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  type={false}
                  value={experience.endDate}
                  label="End Date"
                  // minimumDate={new Date()}
                  selectedValue={value =>
                    handleFieldChange(
                      expIndex,
                      'endDate',
                      moment(value).format(dateFormet),
                    )
                  }
                  mainContainerStyle={styles.dropdownStyle}
                />
              )}
            </View>
            {!experience.endDate && (
              <View style={styles.checkboxContainer}>
                <AppCheckBox
                  isDarkMode={isDarkMode}
                  isChecked={experience.currently_working}
                  onPress={() =>
                    handleFieldChange(
                      expIndex,
                      'currently_working',
                      !experience.currently_working,
                    )
                  }
                  CheckBoxTextStyle={styles.checkBoxText}
                  {...termProps}
                  text="I am currently working in this role"
                />
              </View>
            )}
          </View>
          {experience.jobTitle.name?.toLowerCase() === 'pilot' && (
            <View style={{}}>
              <View
                style={{
                  backgroundColor: Colors.Black,
                  height: ms(40),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: ms(10),
                }}>
                <ScaleText
                  color={Colors.White}
                  fontSize={Fonts.size.size_17}
                  textAlign={'center'}
                  text={'Flight Time Experience'}
                />
              </View>
              <View style={styles.row}>
                <TextInputCustom
                  cuntomStyle={{width: ms(135)}}
                  optional={true}
                  isDarkMode={isDarkMode}
                  placeholder="Total flight time"
                  label="Total flight time"
                  value={experience.flightTime}
                  onChangeText={text =>
                    setStateData(prev => {
                      const updatedExperience = [...prev.Experience];
                      updatedExperience[expIndex].flightTime = text;
                      return {...prev, Experience: updatedExperience};
                    })
                  }
                />
                <TextInputCustom
                  cuntomStyle={{width: ms(135)}}
                  optional={true}
                  isDarkMode={isDarkMode}
                  placeholder="Total turbine time"
                  label="Total turbine time"
                  value={experience.turbineTime}
                  onChangeText={text =>
                    setStateData(prev => {
                      const updatedExperience = [...prev.Experience];
                      updatedExperience[expIndex].turbineTime = text;
                      return {...prev, Experience: updatedExperience};
                    })
                  }
                />
              </View>
              <View style={styles.row}>
                <TextInputCustom
                  cuntomStyle={{width: ms(135)}}
                  optional={true}
                  isDarkMode={isDarkMode}
                  placeholder="Total PIC time"
                  label="Total PIC time"
                  value={experience.pictime}
                  onChangeText={text =>
                    setStateData(prev => {
                      const updatedExperience = [...prev.Experience];
                      updatedExperience[expIndex].pictime = text;
                      return {...prev, Experience: updatedExperience};
                    })
                  }
                />
                <TextInputCustom
                  cuntomStyle={{width: ms(135)}}
                  optional={true}
                  isDarkMode={isDarkMode}
                  placeholder="Total SIC time"
                  label="Total SIC time"
                  value={experience.sictime}
                  onChangeText={text =>
                    setStateData(prev => {
                      const updatedExperience = [...prev.Experience];
                      updatedExperience[expIndex].sictime = text;
                      return {...prev, Experience: updatedExperience};
                    })
                  }
                />
              </View>
              <CustomDropdown
                isDarkMode={isDarkMode}
                value={experience?.typerate?.name}
                label="Type Rate"
                selectedValue={value =>
                  handleFieldChange(expIndex, 'typerate', value)
                }
                data={getoptionsdata}
                // data={statedata.getSkills}
              />
            </View>
          )}
        </View>
      );
    };

    const handleAddExperience = index => {
      // const selectedArray =
      //   statedata.Experience[index] ?? statedata.Experience[0];
      // const invalidField = Object.values(selectedArray)?.filter(
      //   val => typeof val === 'string' && !val.trim(),
      // );
      const selectedArray =
        statedata.Experience[index] ?? statedata.Experience[0];
      console.log('🚀 ~ AuthProfile ~ selectedArray:', selectedArray);

      const isPilot = selectedArray?.jobTitle?.name === 'PILOT';
      console.log('🚀 ~ AuthProfile ~ isPilot:', isPilot);

      // Common required fields
      let requiredFields = [
        'industry',
        'employmentType',
        'jobTitle',
        'companyName',
        'location',
        'startDate',
        'endDate',
      ];

      if (isPilot) {
        requiredFields.push(
          'flightTime',
          'turbineTime',
          'pictime',
          'sictime',
          'typerate',
        );
      }

      // Now validate the fields
      const invalidField = requiredFields.filter(
        key =>
          selectedArray[key] === '' ||
          selectedArray[key] === null ||
          selectedArray[key] === undefined,
      );

      if (invalidField.length > 1) {
        Util.showMessage('An invalid field exists.');
        return;
      } else {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          Experience: [
            ...prev.Experience,
            {
              industry: '',
              employmentType: '',
              jobTitle: '',
              companyName: '',
              location: '',
              startDate: '',
              endDate: '',
              flightTime: '',
              turbineTime: '',
              pictime: '',
              sictime: '',
              typerate: '',
            },
          ],
          selectedExpId: statedata.Experience.length + 1,
        }));
      }
    };

    const handleRemoveExperience = index => {
      setStateData(prev => {
        const updatedExperience = prev.Experience.filter((_, i) => i !== index);
        return {
          ...prev,
          Experience: updatedExperience,
        };
      });
    };

    if (index === 0) {
      const selectedArray = statedata.Experience?.[0];

      const isPilot = selectedArray?.jobTitle?.name === 'PILOT';

      // Common required fields
      let requiredFields = [
        'industry',
        'employmentType',
        'jobTitle',
        'companyName',
        'location',
        'startDate',
      ];

      if (isPilot) {
        requiredFields.push(
          'flightTime',
          'turbineTime',
          'pictime',
          'sictime',
          'typerate',
        );
      }

      // Now validate the fields
      const invalidField = requiredFields.filter(
        key =>
          selectedArray[key] === '' ||
          selectedArray[key] === null ||
          selectedArray[key] === undefined,
      );

      const ButtonEnable = invalidField.length > 0;

      return (
        <View style={styles.formContainer}>
          <View>
            {statedata.Experience.map((val, ind) =>
              renderExperienceSection(val, ind),
            )}
          </View>
          <ButtonView
            onPress={() => handleAddExperience(statedata.selectedExpId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
            type={'WORK_EXPERIENCE'}
            disabled={ButtonEnable}
            onPress={() => handleAddExperienceApi(1, index)}
            BackgroundColor={Colors.Black}
            title="Next"
          />
        </View>
      );
    }
  };

  const educationsetup = index => {
    const renderEducationSection = (education, eduIndex) => {
      const isSelected = statedata.selectedEudId === eduIndex;
      return (
        <View style={{width: ms(275)}} key={eduIndex}>
          <View key={eduIndex} style={styles.educationSection}>
            {/* <ButtonView
              onPress={() => {
                let index = eduIndex;
                if (statedata.selectedEudId == eduIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedEudId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedEudId: index,
                  }));
                }
              }}>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Education No ${eduIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-up"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_55}
                />
              </View>
            </ButtonView> */}
            {statedata.Education.length > 1 && (
              <ButtonView onPress={() => handleRemoveEducation(eduIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <TextInputCustom
              optional={true}
              isDarkMode={isDarkMode}
              placeholder="Enter school name"
              label="School"
              value={education.school}
              onChangeText={text =>
                setStateData(prev => {
                  const updatedEducation = [...prev.Education];
                  updatedEducation[eduIndex].school = text;
                  return {...prev, Education: updatedEducation};
                })
              }
            />
            <CustomDropdown
              isDarkMode={isDarkMode}
              value={education.degree.name}
              label="Higher Education Degree"
              selectedValue={
                value =>
                  setStateData(prev => {
                    const updatedEducation = [...prev.Education];
                    updatedEducation[eduIndex].degree = value;
                    return {...prev, Education: updatedEducation};
                  })
                // handlePassportFieldChange(passIndex, 'passport', value)
              }
              // mainContainerStyle={styles.dropdownViewStyle}
              data={statedata.getDegree}
              // data={statedata.getSkills}
            />
            {/* <TextInputCustom
                optional={true}
                isDarkMode={isDarkMode}
                placeholder="Enter higher education degree"
                label="Higher Education Degree"
                value={education.degree}
                onChangeText={text =>
                  setStateData(prev => {
                    const updatedEducation = [...prev.Education];
                    updatedEducation[eduIndex].degree = text;
                    return { ...prev, Education: updatedEducation };
                  })
                }
              /> */}
            <TextInputCustom
              optional={true}
              isDarkMode={isDarkMode}
              placeholder="Field of study"
              label="Subject field"
              value={education.field}
              onChangeText={text =>
                setStateData(prev => {
                  const updatedEducation = [...prev.Education];
                  updatedEducation[eduIndex].field = text;
                  return {...prev, Education: updatedEducation};
                })
              }
            />
            <View style={styles.row}>
              <CustomDropdown
                type={false}
                isDarkMode={isDarkMode}
                value={education.startDate}
                label="Start Date"
                maximumDate={new Date()}
                selectedValue={value => {
                  setStateData(prev => {
                    const updatedEducation = [...prev.Education];
                    updatedEducation[eduIndex].startDate =
                      moment(value).format(dateFormet);
                    return {...prev, Education: updatedEducation};
                  });
                }}
                mainContainerStyle={styles.dropdownStyle}
              />
              <CustomDropdown
                type={false}
                // minimumDate={new Date()}
                isDarkMode={isDarkMode}
                value={education.endDate}
                label="End Date"
                selectedValue={value => {
                  setStateData(prev => {
                    const updatedEducation = [...prev.Education];
                    updatedEducation[eduIndex].endDate =
                      moment(value).format(dateFormet);
                    return {...prev, Education: updatedEducation};
                  });
                }}
                mainContainerStyle={styles.dropdownStyle}
              />
            </View>
            {/* {statedata.Education.length > 1 && (
                <ButtonView onPress={() => handleRemoveEducation(eduIndex)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign={'right'}
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text={'Delete'}
                  />
                </ButtonView>
              )} */}
          </View>
        </View>
      );
    };

    const handleAddEducation = index => {
      const selectedArray =
        statedata.Education[index] ?? statedata.Education[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      if (invalidField.length > 0) {
        Util.showMessage('An invalid field exists.');
        return;
      } else {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          Education: [
            ...prev.Education,
            {
              school: '',
              degree: '',
              field: '',
              startDate: '',
              endDate: '',
            },
          ],
          selectedEudId: index + 1,
        }));
      }
    };

    const handleRemoveEducation = eduIndex => {
      setStateData(prev => ({
        ...prev,
        Education: prev.Education.filter((_, index) => index !== eduIndex),
      }));
    };

    if (index === 1) {
      const selectedArray = statedata.Education[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      const isButtonDisabled = invalidField.length > 0;
      return (
        <View style={styles.formContainer}>
          <View>{statedata.Education.map(renderEducationSection)}</View>
          <ButtonView
            onPress={() => handleAddEducation(statedata.selectedEudId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
            type={'EDUCATION'}
            disabled={isButtonDisabled}
            onPress={() => handleAddEducationApi(2, index)}
            BackgroundColor={Colors.Black}
            title={'Next'}
          />
        </View>
      );
    }
  };

  const passportsetup = index => {
    const renderPassportSection = (passport, passIndex) => {
      const isSelected = statedata.selectedpasId === passIndex;
      return (
        <View key={passIndex}>
          <View>
            {/* <ButtonView
              onPress={() => {
                let index = passIndex;
                if (statedata.selectedpasId == passIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedpasId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedpasId: index,
                  }));
                }
              }}>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Passport No ${passIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-up"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                />
              </View>
            </ButtonView> */}
            {statedata.Passport.length > 1 && (
              <ButtonView onPress={() => handleRemovePassport(passIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <View style={styles.flexViewStyle}>
              <CustomDropdown
                isDarkMode={isDarkMode}
                value={passport.passport.name}
                label="Passport Nationality"
                selectedValue={value =>
                  handlePassportFieldChange(passIndex, 'passport', value)
                }
                mainContainerStyle={styles.dropdownViewStyle}
                data={statedata.getCountry}
              />
              <CustomDropdown
                type={false}
                isDarkMode={isDarkMode}
                value={passport.dateofexp}
                label="Date of Expiration"
                selectedValue={value =>
                  handlePassportFieldChange(
                    passIndex,
                    'dateofexp',
                    moment(value).format(dateFormet),
                  )
                }
                mainContainerStyle={styles.dropdownStyle}
              />
            </View>
          </View>
        </View>
      );
    };

    const renderVisaSection = (visaVal, visaIndex) => {
      const isSelected = statedata.selectedVisaId === visaIndex;
      return (
        <View key={visaIndex}>
          <View style={{width: ms(270)}}>
            {statedata.Visa.length > 1 && (
              <ButtonView onPress={() => handleRemoveVisa(visaIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <View style={styles.flexViewStyle}>
              <CustomDropdown
                isDarkMode={isDarkMode}
                value={visaVal.visa.name}
                label="Visa (Optional)"
                selectedValue={value =>
                  handleVisaFieldChange(visaIndex, 'visa', value)
                }
                mainContainerStyle={styles.dropdownViewStyle}
                data={statedata.getCountry}
              />
              <CustomDropdown
                type={false}
                isDarkMode={isDarkMode}
                value={visaVal.dateofexp}
                label="Date of Expiration"
                selectedValue={value =>
                  handleVisaFieldChange(
                    visaIndex,
                    'dateofexp',
                    moment(value).format(dateFormet),
                  )
                }
                mainContainerStyle={styles.dropdownStyle}
              />
            </View>
          </View>
        </View>
      );
    };

    const handleAddPassport = index => {
      const selectedArray = statedata.Passport[index] ?? statedata.Passport[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      if (invalidField.length > 1) {
        Util.showMessage('An invalid field exists.');
        return;
      } else {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          Passport: [
            ...prev.Passport,
            {
              passport: '',
              dateofexp: '',
            },
          ],
          selectedpasId: index + 1,
        }));
      }
    };
    const handleAddVisa = index => {
      const selectedArray = statedata.Visa[index] ?? statedata.Visa[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      if (invalidField.length > 1) {
        Util.showMessage('An invalid field exists.');
        return;
      } else {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          Visa: [
            ...prev.Visa,
            {
              visa: '',
              dateofexp: '',
            },
          ],
          selectedVisaId: index + 1,
        }));
      }
    };
    const handleRemoveVisa = index => {
      setStateData(prev => {
        const UpdatedVisa = prev.Visa.filter((_, i) => i !== index);
        return {
          ...ValidationSchema,
          Passport: UpdatedVisa,
        };
      });
    };
    const handleRemovePassport = index => {
      setStateData(prev => {
        const UpdatedPassports = prev.Passport.filter((_, i) => i !== index);
        return {
          ...prev,
          Passport: UpdatedPassports,
        };
      });
    };

    if (index === 2) {
      const selectedPassportArray = statedata.Passport[0];
      const invalidPassportField = Object.values(selectedPassportArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      const selectedArray = statedata.Visa[0];
      const invalidVisaVisaField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      const isButtonDisabled = invalidPassportField.length > 1;

      return (
        <View style={styles.formContainer}>
          <View>{statedata.Passport.map(renderPassportSection)}</View>
          <ButtonView
            onPress={() => {
              handleAddPassport(statedata.selectedpasId);
            }}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <View>{statedata.Visa.map(renderVisaSection)}</View>
          <ButtonView
            onPress={() => {
              handleAddVisa(statedata.selectedVisaId);
            }}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
            type={'PASSPORT_VISA'}
            isloading={statedata.isLoading}
            disabled={isButtonDisabled}
            onPress={() => handleAddPassportApi(3)}
            BackgroundColor={Colors.Black}
            title="Next"
          />
        </View>
      );
    }
  };

  const languagesetup = index => {
    const renderLanguageSetup = (language, langIndex) => {
      const isSelected = statedata.selectedlangId === langIndex;
      return (
        <View key={langIndex}>
          <View>
            {statedata.language.length > 1 && (
              <ButtonView onPress={() => handleRemovelanguage(langIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <View
              style={{
                width: ms(275),
                paddingHorizontal: ms(5),
              }}>
              <CustomDropdown
                isDarkMode={isDarkMode}
                value={language.language.name}
                label="Select Language"
                selectedValue={value =>
                  handleLanguageFieldChange(langIndex, 'language', value)
                }
                data={statedata.getLanguages.data}
              />
            </View>
          </View>
        </View>
      );
    };

    const handleAddlanguage = index => {
      const selectedArray = statedata.language[index] ?? statedata.language[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      if (invalidField.length > 0) {
        Util.showMessage('An invalid field exists.');
        return;
      } else {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          language: [
            ...prev.language,
            {
              language: '',
            },
          ],
          selectedlangId: index + 1,
        }));
      }
    };

    const handleRemovelanguage = index => {
      setStateData(prev => {
        const updatedlanguage = prev.language.filter((_, i) => i !== index);
        return {
          ...prev,
          language: updatedlanguage,
        };
      });
    };

    if (index === 3) {
      const selectedArray = statedata.language[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      const isButtonDisabled = invalidField.length > 0;
      return (
        <View style={styles.formContainer}>
          <View>{statedata.language.map(renderLanguageSetup)}</View>
          <ButtonView
            onPress={() => handleAddlanguage(statedata.selectedlangId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
            type={'LANGUAGE'}
            isloading={statedata.isLoading}
            disabled={isButtonDisabled}
            onPress={() => handleAddLanguageApi(4)}
            BackgroundColor={Colors.Black}
            title="Next"
          />
        </View>
      );
    }
  };

  const skillsetup = index => {
    const rendeSkillSetup = (skillsVal, skillIndex) => {
      const isSelected = statedata.selectedSkillId === skillIndex;
      return (
        <View key={skillIndex}>
          <View style={{width: ms(275)}}>
            {statedata.Skills.length > 1 && (
              <ButtonView onPress={() => handleDeleteSkill(skillIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <View
              style={{
                paddingHorizontal: ms(5),
              }}>
              <CustomDropdown
                isDarkMode={isDarkMode}
                value={skillsVal.skill.name}
                label="Select Skills"
                selectedValue={value =>
                  handleSkillsFieldChange(skillIndex, 'skill', value)
                }
                data={statedata.getSkills}
              />
            </View>
          </View>
        </View>
      );
    };

    const handleAddSkills = index => {
      const selectedArray = statedata.Skills[index] ?? statedata.Skills[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      console.log(invalidField, 'invalidField');
      if (invalidField.length == 0) {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          Skills: [
            ...prev.Skills,
            {
              skill: '',
            },
          ],
          selectedSkillId: index + 1,
        }));
      } else {
        Util.showMessage('An invalid field exists.');
      }
    };

    const handleDeleteSkill = index => {
      setStateData(prev => {
        const updatedskills = prev.Skills.filter((_, i) => i !== index);
        return {
          ...prev,
          Skills: updatedskills,
        };
      });
    };

    if (index === 4) {
      const selectedArray = statedata.Skills[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      const isButtonDisabled = invalidField.length > 0;
      return (
        <View style={styles.formContainer}>
          <View>{statedata.Skills.map(rendeSkillSetup)}</View>
          <ButtonView
            onPress={() => handleAddSkills(statedata.selectedSkillId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
            isloading={statedata.isLoading}
            disabled={isButtonDisabled}
            onPress={() => handleAddSkillApi(5)}
            BackgroundColor={Colors.Black}
            title="Next"
          />
        </View>
      );
    }
  };

  const licensesetup = index => {
    const rendeLicenseSetup = (licenseVal, licenseIndex) => {
      const isSelected = statedata.selectedLicenseId === licenseIndex;
      return (
        <View style={{width: ms(275)}} key={licenseIndex}>
          <View>
            {statedata.License.length > 1 && (
              <ButtonView onPress={() => handleDeleteLicense(licenseIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <View
              style={{
                paddingHorizontal: ms(5),
              }}>
              <View style={styles.flexViewStyle}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  mainContainerStyle={styles.dropdownViewStyle}
                  label="License"
                  value={licenseVal.license.name}
                  selectedValue={value =>
                    handleLicenseFieldChange(licenseIndex, 'license', value)
                  }
                  data={statedata.getLicance}
                  // data={statedata.getSkills}
                />
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  mainContainerStyle={styles.dropdownViewStyle}
                  label="Issuing Country"
                  value={licenseVal.issue_country.name}
                  selectedValue={value =>
                    handleLicenseFieldChange(
                      licenseIndex,
                      'issue_country',
                      value,
                    )
                  }
                  data={statedata.getCountry}
                />
              </View>
            </View>
          </View>
        </View>
      );
    };
    const rendeCertificateSetup = (certificateVal, certificateIndex) => {
      const isSelected = statedata.selectedCertificateId === certificateIndex;
      return (
        <View key={certificateIndex}>
          <View>
            {statedata.Certificate.length > 1 && (
              <ButtonView
                onPress={() => handleDeleteCertificate(certificateIndex)}>
                <ScaleText
                  TextStyle={{marginRight: ms(10)}}
                  textAlign={'right'}
                  fontSize={ms(12)}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            )}
            <View
              style={{
                paddingHorizontal: ms(5),
              }}>
              <View style={styles.flexViewStyle}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  mainContainerStyle={styles.dropdownViewStyle}
                  label="Certification"
                  value={certificateVal.certificate.name}
                  selectedValue={value =>
                    handleCertificatesFieldChange(
                      certificateIndex,
                      'certificate',
                      value,
                    )
                  }
                  data={statedata.getCertificate}
                  // data={statedata.getSkills}
                />
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  mainContainerStyle={styles.dropdownViewStyle}
                  label="Issuing Country"
                  value={certificateVal.issue_country.name}
                  selectedValue={value =>
                    handleCertificatesFieldChange(
                      certificateIndex,
                      'issue_country',
                      value,
                    )
                  }
                  data={statedata.getCountry}
                />
              </View>
            </View>
          </View>
        </View>
      );
    };

    const handleAddlicense = index => {
      const selectedArray = statedata.License[index] ?? statedata.License[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      console.log(invalidField, 'invalidField');
      if (invalidField.length == 0) {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          License: [
            ...prev.License,
            {
              license: '',
              issue_country: '',
            },
          ],
          selectedLicenseId: index + 1,
        }));
      } else {
        Util.showMessage('An invalid field exists.');
      }
    };

    const handleAddCertificate = index => {
      const selectedArray = statedata.Certificate[index];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      console.log(invalidField, 'invalidField');
      if (invalidField.length == 0) {
        console.log('All fields are valid.');
        setStateData(prev => ({
          ...prev,
          Certificate: [
            ...prev.Certificate,
            {
              certificate: '',
              issue_country: '',
            },
          ],
          selectedCertificateId: index + 1,
        }));
      } else {
        Util.showMessage('An invalid field exists.');
      }
    };

    const handleDeleteLicense = index => {
      setStateData(prev => {
        const updatedLicense = prev.License.filter((_, i) => i !== index);
        return {
          ...prev,
          License: updatedLicense,
        };
      });
    };

    const handleDeleteCertificate = index => {
      setStateData(prev => {
        const updatedCertificate = prev.Certificate.filter(
          (_, i) => i !== index,
        );
        return {
          ...prev,
          Certificate: updatedCertificate,
        };
      });
    };

    if (index === 5) {
      const selectedLicenseArray = statedata.License[0];
      const invalidLicenseField = Object.values(selectedLicenseArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      const selectedCertifArray = statedata.Certificate[0];
      const invalidCertField = Object.values(selectedCertifArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      // Determine button disabled state
      const isButtonDisabled =
        invalidLicenseField.length > 0 || invalidCertField.length > 0;

      return (
        <View style={styles.formContainer}>
          <View>{statedata.License.map(rendeLicenseSetup)}</View>
          <ButtonView
            onPress={() => handleAddlicense(statedata.selectedLicenseId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <View>{statedata.Certificate.map(rendeCertificateSetup)}</View>
          <ButtonView
            onPress={() =>
              handleAddCertificate(statedata.selectedCertificateId)
            }>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
            type={'LICENSE'}
            // disabled={isButtonDisabled}
            onPress={() => {
              handleAddLicenseApi();
            }}
            BackgroundColor={Colors.Black}
            title="Next"
          />
        </View>
      );
    }
  };
  return (
    <Background isDarkMode={isDarkMode}>
      <View
        style={[
          styles.container,
          {
            marginTop: statedata.currentStep == null ? '20%' : 20,
          },
        ]}>
        {steps.map((step, index) => {
          const {name, submited, id} = step ?? '';
          const isActiveStep = statedata.currentStep === index;
          const isCompletedStep = statedata.currentStep > index;
          const isFutureStep = statedata.currentStep < index;
          return (
            <View key={index} style={styles.stepContainer}>
              {/* Circle */}
              <View style={styles.circleContainer}>
                <View
                  style={[
                    styles.circle,
                    isActiveStep || isCompletedStep
                      ? styles.activeCircle
                      : styles.inactiveCircle,
                  ]}>
                  {isCompletedStep ? (
                    <VectorIcon
                      size={ms(16)}
                      color={Colors.White}
                      name={'check'}
                      type={'MaterialIcons'}
                    />
                  ) : (
                    <Text style={styles.stepNumber}>{index + 1}</Text>
                  )}
                </View>
                {/* Line */}
                {index !== steps.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      {
                        backgroundColor:
                          isFutureStep && !isDarkMode
                            ? Colors.Border
                            : isDarkMode && isFutureStep
                            ? Colors.more_black[900]
                            : Colors.Yellow,
                      },
                    ]}
                  />
                )}
              </View>
              {/* Step Label */}
              <View>
                <TouchableOpacity
                  // disabled={!submited}
                  // disabled={statedata.currentStep == null && step > steps?.[0] ? false: true}
                  // disabled={isActiveStep}
                  onPress={() => handleNext(index)}>
                  <Text
                    style={[
                      styles.stepText,
                      {
                        color: isFutureStep ? Colors.Back_c8 : Colors.Yellow,
                      },
                    ]}>
                    {name}
                  </Text>
                </TouchableOpacity>
                {/* Render only the active step's function */}
                {isActiveStep && index === 0 && experiencesetup(index)}
                {isActiveStep && index === 1 && educationsetup(index)}
                {isActiveStep && index === 2 && passportsetup(index)}
                {isActiveStep && index === 3 && languagesetup(index)}
                {isActiveStep && index === 4 && skillsetup(index)}
                {isActiveStep && index === 5 && licensesetup(index)}
              </View>
            </View>
          );
        })}
      </View>
      <View
        style={{
          marginTop: statedata.currentStep == null ? '20%' : 20,
        }}>
        <Text style={styles.profileStatusText}>Your Profile Status</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ProgressBar
            progress={
              statedata.currentStep == null
                ? 0.0
                : progressSteps[statedata.currentStep]
            }
            color="#387FF1"
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>
            {statedata.currentStep == null
              ? '0%'
              : progressTextSteps[statedata.currentStep]}
          </Text>
        </View>
      </View>
    </Background>
  );
};

export default AuthProfile;
