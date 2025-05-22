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
  Loader,
  TextInputCustom,
} from '../../components';
import {Colors} from '../../theme';
import {StackNav} from '../../naviagtor/stackkeys';
import datahandler from '../../helper/datahandler';
import {NavigationService, Util} from '../../utils';
import {screenOptions} from '../../naviagtor/config';
import {dummyDropdownData} from '../../utils/Hardcorddata';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {AppButton, Background, ScaleText, VectorIcon} from '../../common';
import {styles} from './styles';
import {
  changeSteps,
  dateFormet,
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
  DELETE_WORK_EXPERIENCE_API,
  DELETE_EDUCATION_API,
  DELETE_LANGUAGE_API,
  DELETE_SKILLS_API,
  DELETE_PASSPORT_VISA_API,
  DELETE_LICENSE_API,
} from '../../ducks/app';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

const MyBackground = ({navigation, route}) => {
  const userData = route?.params?.data;
  const [formObj, emailProps, termProps] = useHookForm(
    ['email', 'password', 'term'],
    {term: false, email: ' '},
    ValidationSchema.logIn,
  );
  const dispatch = useDispatch();
  const apiInProgressCountRef = useRef(0);
  const isDarkMode = datahandler.getAppTheme();

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'My Background',
      ),
    );
  }, [navigation, isDarkMode]);

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
    fullscreenisLoading: false,
  });

  const handleNext = index => {
    setStateData(prev => ({...prev, currentStep: index, isLoading: false}));
  };

  useEffect(() => {
    if (userData) {
      const filledExperiences =
        userData.work_experiences?.map(item => ({
          id: item.id,
          industry: {
            id: item?.industry_id || '',
            name: item?.industry || '',
          },
          employmentType: {
            id: item?.employment_type_id || '',
            name: item?.employment_type || '',
          },
          jobTitle: {
            id: item?.job_title_id || '',
            name: item?.job_title || '',
          },
          companyName: item?.company_name || '',
          location: item?.location || '',
          startDate: item?.start_date || '',
          endDate: item?.end_date || '',
          still_working: item?.still_working == 1,
        })) || [];

      const filledEducation =
        userData.educations?.map(item => {
          return {
            id: item?.id,
            school: item?.school || '',
            degree: {
              name: item?.degree || '',
              id: item?.degree_id,
            },
            field: item?.subject || '',
            startDate: item?.start_date || '',
            endDate: item?.end_date || '',
          };
        }) || [];

      const filledPassport =
        userData.passport_visa
          ?.filter(item => item?.passport_country_id && item?.passport_country)
          .map(item => ({
            passport: {
              name: item.passport_country,
              id: item.passport_country_id,
            },
            id: item.id,
            dateofexp: item.passport_expiry_date,
          })) || [];

      const filledVisa =
        userData.passport_visa
          ?.filter(item => item?.visa_country_id && item?.visa_country)
          .map(item => ({
            visa: {
              name: item.visa_country,
              id: item.visa_country_id,
            },
            id: item.id,
            dateofexp: item.visa_expiry_date || '',
          })) || [];

      const filledLanguage =
        userData.languages?.map((item, index) => ({
          language: {
            name: item?.language,
            id: item?.language_id,
          },
          id: item.id,
        })) || [];

      const filledSkill =
        userData.skills?.map((item, index) => ({
          skill: {
            name: item?.skill,
            id: item?.skill_id,
          },
          id: item.id,
        })) || [];

      const filledLicense =
        userData.license_certificates
          ?.filter(item => item?.license_name && item?.license_name)
          .map(item => ({
            license: {
              name: item.license_name,
              id: item.license_id,
            },
            issue_country: {
              id: item?.license_country_id,
              name: item?.license_country_name,
            },
            id: item.id,
          })) || [];

      const filledCertificate =
        userData.license_certificates
          ?.filter(item => item?.certificate_name && item?.certificate_name)
          .map(item => ({
            certificate: {
              name: item?.certificate_name,
              id: item?.certificate_id,
            },
            issue_country: {
              name: item?.certificate_country_name,
              id: item?.certificate_country_id,
            },
            id: item.id,
          })) || [];

      setStateData(prev => ({
        ...prev,
        Experience: filledExperiences,
        Education: filledEducation,
        Passport: filledPassport,
        Visa: filledVisa,
        language: filledLanguage,
        Skills: filledSkill,
        License: filledLicense,
        Certificate: filledCertificate,
      }));
    }
    handleGetAPISData();
  }, []);

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

            // Instead of multiple setStateData calls:
            setStateData(prev => {
              const newState = {...prev, [key]: updatedData};
              if (--apiInProgressCountRef.current === 0) {
                newState.fullscreenisLoading = false;
              }
              return newState;
            });

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

    if (!Experience || Experience.length === 0) {
      console.warn('No experience data found');
      return;
    }

    const handlepayload = {
      work_experience_id: Experience.map(exp => exp.id),
      industry_id: Experience.map(exp => exp.industry.id),
      employment_type_id: Experience.map(exp => exp.employmentType.id),
      job_title_id: Experience.map(exp => exp.jobTitle.id),
      company_name: Experience.map(exp => exp.companyName),
      location: Experience.map(exp => exp.location),
      start_date: Experience.map(exp => exp.startDate),
      end_date: Experience.map(exp => exp.endDate || ''),
      still_working: Experience.map(exp => (exp.still_working ? '1' : '0')),
    };

    setStateData(prev => ({...prev, isLoading: 'WORK_EXPERIENCE'}));
    dispatch(
      WORK_EXPERIENCE_API.request({
        payloadApi: handlepayload,
        cb: res => {
          handleNext(id);
          changeSteps(id + 1);
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
      education_id: Education.map(exp => exp.id),
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
          Util.showMessage('Education details added successfully', 'success');
          handleNext(id);
          changeSteps(id + 1);
        },
      }),
    );
  };

  const handleAddPassportApi = async id => {
    const {Passport, Visa} = statedata;

    if (!Passport || Passport.length === 0) {
      console.warn('No Passport data found');
      return;
    }

    const handlepayload = {
      passport_visa_id: Passport.map(exp => exp.id),
      passport_country_id: Passport.map(exp => exp.passport.id),
      // passport_issue_date: Passport.map(exp => exp.passport),
      passport_expiry_date: Passport.map(exp => exp.dateofexp),
      visa_country_id: Visa.map(exp => exp.visa.id),
      // visa_issue_date: Visa.map(exp => exp.endDate),
      visa_expiry_date: Visa.map(exp => exp.dateofexp),
    };
    dispatch(
      PASSPORT_VISA_API.request({
        payloadApi: handlepayload,
        cb: res => {
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

    if (statedata.isLoading) return;

    if (!language || language.length === 0) {
      console.warn('No language data found');
      return;
    }

    const handlepayload = {
      candidate_language_id: language.map(exp => exp.id),
      language_id: language.map(exp => exp.language.id),
    };
    // console.log('🚀 ~ MyBackground ~ handlepayload:', handlepayload);
    // setStateData(prev => ({...prev, isLoading: 'LANGUAGE'}));
    dispatch(
      LANGUAGE_API.request({
        payloadApi: handlepayload,
        cb: res => {
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
      candidate_skill_id: Skills.map(exp => exp.id),
      skill_id: Skills.map(exp => exp.skill.id),
    };
    setStateData(prev => ({...prev, isLoading: 'SKILLS'}));
    dispatch(
      SKILLS_API.request({
        payloadApi: handlepayload,
        cb: res => {
          Util.showMessage('Skills added successfully', 'success');
          handleNext(id);
          changeSteps(id + 1);
        },
      }),
    );
  };

  const handleAddLicenseApi = async id => {
    const {License, Certificate} = statedata;

    if (!License || License.length === 0) {
      console.warn('No License and Certificate data found');
      return;
    }

    const handlepayload = {
      candidate_license_certificate_id: License.map(exp => exp.id),
      license_id: License.map(exp => exp.license.id),
      license_country_id: License.map(exp => exp.issue_country.id),
      certificate_id: Certificate.map(exp => exp.certificate.id),
      certificate_country_id: Certificate.map(exp => exp.issue_country.id),
    };
    console.log('🚀 ~ MyBackground ~ handlepayload:', handlepayload);
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
                NavigationService.goBack();
              },
            }),
          );
        },
      }),
    );
  };

  const experiencesetupMemo = useMemo(() => {
    if (statedata.currentStep !== 0) return null;

    const handleAddExperience = index => {
      if (index > 0) return;
      const selectedArray = index
        ? statedata.Experience[index]
        : statedata.Experience[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      if (invalidField.length > 1) {
        Util.showMessage('An invalid field exists.');
        return;
      }

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
          },
        ],
        selectedExpId: statedata.Experience.length + 1,
      }));
    };

    const handleRemoveExperience = (index, item) => {
      const formData = new FormData();
      formData.append('work_experience_id', item.id);
      dispatch(
        DELETE_WORK_EXPERIENCE_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('Work Experience deleted successfully', 'success');
            setStateData(prev => {
              const updatedExperience = prev.Experience.filter(
                (_, i) => i !== index,
              );
              return {
                ...prev,
                Experience: updatedExperience,
              };
            });
          },
        }),
      );
    };

    const renderExperienceSection = (experience, expIndex) => {
      const isSelected = statedata.selectedExpId === expIndex;
      return (
        <View key={expIndex}>
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() =>
                  setStateData(prev => ({
                    ...prev,
                    selectedExpId:
                      prev.selectedExpId === expIndex ? null : expIndex,
                  }))
                }>
                <View style={styles.experienceButton}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontSize={ms(15)}
                    text={`Experience No ${expIndex + 1}`}
                  />
                  <VectorIcon
                    type="FontAwesome"
                    name="chevron-up"
                    size={ms(14)}
                    color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_55}
                  />
                </View>
              </ButtonView>

              {statedata.Experience.length > 1 && (
                <ButtonView
                  onPress={() => handleRemoveExperience(expIndex, experience)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign={'right'}
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text={'remove'}
                  />
                </ButtonView>
              )}

              <View style={styles.row}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  value={experience.industry.name || experience.industry}
                  label="Select Industry"
                  selectedValue={value =>
                    handleFieldChange(expIndex, 'industry', value)
                  }
                  mainContainerStyle={styles.dropdownStyle}
                  data={statedata.getIndustryData}
                  name={'industry_name'}
                />
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  value={
                    experience.employmentType.name || experience?.employmentType
                  }
                  label="Employment Type"
                  selectedValue={value =>
                    handleFieldChange(expIndex, 'employmentType', value)
                  }
                  mainContainerStyle={styles.dropdownStyle}
                  data={statedata.getEmployment}
                />
              </View>

              <CustomDropdown
                isDarkMode={isDarkMode}
                value={experience.jobTitle.name || experience?.jobTitle}
                label="Job Title"
                selectedValue={value =>
                  handleFieldChange(expIndex, 'jobTitle', value)
                }
                data={statedata.getJob}
              />

              <TextInputCustom
                optional={true}
                isDarkMode={isDarkMode}
                placeholder="Enter Company Name"
                label="Company Name"
                value={experience.companyName}
                onChangeText={text =>
                  setStateData(prev => {
                    const updated = [...prev.Experience];
                    updated[expIndex].companyName = text;
                    return {...prev, Experience: updated};
                  })
                }
              />

              <TextInputCustom
                optional={true}
                isDarkMode={isDarkMode}
                placeholder="Enter Location"
                label="Location"
                value={experience.location}
                onChangeText={text =>
                  setStateData(prev => {
                    const updated = [...prev.Experience];
                    updated[expIndex].location = text;
                    return {...prev, Experience: updated};
                  })
                }
              />

              <View style={styles.row}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  maximumDate={new Date()}
                  type={false}
                  value={experience.startDate}
                  label="Start Date"
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
                    // minimumDate={new Date()}
                    isDarkMode={isDarkMode}
                    type={false}
                    value={experience.endDate}
                    label="End Date"
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
          ) : (
            <ButtonView
              onPress={() =>
                setStateData(prev => ({
                  ...prev,
                  selectedExpId:
                    prev.selectedExpId === expIndex ? null : expIndex,
                }))
              }>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Experience No ${expIndex + 1}`}
                />
                <VectorIcon
                  color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_55}
                  type="FontAwesome"
                  name="chevron-down"
                  size={ms(14)}
                />
              </View>
            </ButtonView>
          )}
        </View>
      );
    };

    const selectedArray = statedata.Experience[0];
    const invalidField = Object.values(selectedArray)?.filter(
      val => val === '' || val === null || val === undefined,
    );

    return (
      <View style={styles.formContainer}>
        <View>{statedata.Experience.map(renderExperienceSection)}</View>
        <ButtonView
          onPress={() => handleAddExperience(statedata.selectedExpId)}>
          <Text style={styles.addButtonText}>Add +</Text>
        </ButtonView>
        <AppButton
          type={'WORK_EXPERIENCE'}
          onPress={() => handleAddExperienceApi(1)}
          BackgroundColor={Colors.Black}
          title="Update"
        />
      </View>
    );
  }, [statedata]);

  const educationsetupMemo = useMemo(() => {
    if (statedata.currentStep !== 1) return null;

    const handleAddEducation = index => {
      if (index > 0) return;
      const selectedArray =
        statedata.Education[index] || statedata.Education[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      if (invalidField.length > 0) {
        Util.showMessage('An invalid field exists.');
        return;
      }

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
    };

    const handleRemoveEducation = (eduIndex, item) => {
      const formData = new FormData();
      formData.append('education_id', item.id);
      dispatch(
        DELETE_EDUCATION_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('Work Experience deleted successfully', 'success');
            setStateData(prev => ({
              ...prev,
              Education: prev.Education.filter(
                (_, index) => index !== eduIndex,
              ),
            }));
          },
        }),
      );
    };

    const renderEducationSection = (education, eduIndex) => {
      const isSelected = statedata.selectedEudId === eduIndex;
      return (
        <View key={eduIndex}>
          {isSelected ? (
            <View style={styles.educationSection}>
              <ButtonView
                onPress={() =>
                  setStateData(prev => ({
                    ...prev,
                    selectedEudId:
                      prev.selectedEudId === eduIndex ? null : eduIndex,
                  }))
                }>
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
              </ButtonView>

              {statedata.Education.length > 1 && (
                <ButtonView
                  onPress={() => handleRemoveEducation(eduIndex, education)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign="right"
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text="remove"
                  />
                </ButtonView>
              )}

              <TextInputCustom
                optional
                isDarkMode={isDarkMode}
                placeholder="Enter school name"
                label="School"
                value={education.school}
                onChangeText={text =>
                  setStateData(prev => {
                    const updated = [...prev.Education];
                    updated[eduIndex].school = text;
                    return {...prev, Education: updated};
                  })
                }
              />

              <CustomDropdown
                isDarkMode={isDarkMode}
                value={education.degree.name}
                label="Higher Education Degree"
                selectedValue={value =>
                  setStateData(prev => {
                    const updated = [...prev.Education];
                    updated[eduIndex].degree = value;
                    return {...prev, Education: updated};
                  })
                }
                data={statedata.getDegree}
              />

              <TextInputCustom
                optional
                isDarkMode={isDarkMode}
                placeholder="Field of study"
                label="Subject field"
                value={education.field}
                onChangeText={text =>
                  setStateData(prev => {
                    const updated = [...prev.Education];
                    updated[eduIndex].field = text;
                    return {...prev, Education: updated};
                  })
                }
              />

              <View style={styles.row}>
                <CustomDropdown
                  type={false}
                  maximumDate={new Date()}
                  isDarkMode={isDarkMode}
                  value={education.startDate}
                  label="Start Date"
                  selectedValue={value =>
                    setStateData(prev => {
                      const updated = [...prev.Education];
                      updated[eduIndex].startDate =
                        moment(value).format(dateFormet);
                      return {...prev, Education: updated};
                    })
                  }
                  mainContainerStyle={styles.dropdownStyle}
                />

                <CustomDropdown
                  type={false}
                  // minimumDate={new Date()}
                  isDarkMode={isDarkMode}
                  value={education.endDate}
                  label="End Date"
                  selectedValue={value =>
                    setStateData(prev => {
                      const updated = [...prev.Education];
                      updated[eduIndex].endDate =
                        moment(value).format(dateFormet);
                      return {...prev, Education: updated};
                    })
                  }
                  mainContainerStyle={styles.dropdownStyle}
                />
              </View>
            </View>
          ) : (
            <ButtonView
              onPress={() =>
                setStateData(prev => ({
                  ...prev,
                  selectedEudId:
                    prev.selectedEudId === eduIndex ? null : eduIndex,
                }))
              }>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Education No ${eduIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-down"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                />
              </View>
            </ButtonView>
          )}
        </View>
      );
    };

    return (
      <View style={styles.formContainer}>
        <View>{statedata.Education.map(renderEducationSection)}</View>
        <ButtonView onPress={() => handleAddEducation(statedata.selectedEudId)}>
          <Text style={styles.addButtonText}>Add +</Text>
        </ButtonView>
        <AppButton
          type="EDUCATION"
          onPress={() => handleAddEducationApi(2)}
          BackgroundColor={Colors.Black}
          title="Update"
        />
      </View>
    );
  }, [statedata]);

  const passportsetupMemo = useMemo(() => {
    if (statedata.currentStep !== 2) return null;

    const handleAddPassport = index => {
      const selected = statedata.Passport[index] || statedata.Passport[0];
      const invalidField = Object.values(selected)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      if (invalidField.length > 0) {
        Util.showMessage('An invalid field exists.');
        return;
      }

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
    };

    const handleAddVisa = index => {
      const selected = statedata.Visa[index] || statedata.Visa[0];
      const invalidField = Object.values(selected)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );
      if (invalidField.length > 0) {
        Util.showMessage('An invalid field exists.');
        return;
      }

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
    };

    const handleRemovePassport = (index, item) => {
      const formData = new FormData();
      formData.append('passport_visa_id', item.id);
      formData.append('type', 'passport');
      dispatch(
        DELETE_PASSPORT_VISA_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('Passport deleted successfully', 'success');
            setStateData(prev => ({
              ...prev,
              Passport: prev.Passport.filter((_, i) => i !== index),
            }));
          },
        }),
      );
    };

    const handleRemoveVisa = (index, item) => {
      const formData = new FormData();
      formData.append('passport_visa_id', item.id);
      formData.append('type', 'visa');
      dispatch(
        DELETE_PASSPORT_VISA_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('Visa deleted successfully', 'success');
            setStateData(prev => ({
              ...prev,
              Visa: prev.Visa.filter((_, i) => i !== index),
            }));
          },
        }),
      );
    };

    const renderPassportSection = (passport, passIndex) => {
      const isSelected = statedata.selectedpasId === passIndex;
      return (
        <View key={passIndex}>
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() =>
                  setStateData(prev => ({
                    ...prev,
                    selectedpasId:
                      prev.selectedpasId === passIndex ? null : passIndex,
                  }))
                }>
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
              </ButtonView>

              {statedata.Passport.length > 1 && (
                <ButtonView
                  onPress={() => handleRemovePassport(passIndex, passport)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign="right"
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text="remove"
                  />
                </ButtonView>
              )}

              <View style={styles.flexViewStyle}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  value={passport.passport?.name}
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
          ) : (
            <ButtonView
              onPress={() =>
                setStateData(prev => ({
                  ...prev,
                  selectedpasId:
                    prev.selectedpasId === passIndex ? null : passIndex,
                }))
              }>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Passport No ${passIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-down"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                />
              </View>
            </ButtonView>
          )}
        </View>
      );
    };

    const renderVisaSection = (visaVal, visaIndex) => {
      const isSelected = statedata.selectedVisaId === visaIndex;
      return (
        <View key={visaIndex}>
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() =>
                  setStateData(prev => ({
                    ...prev,
                    selectedVisaId:
                      prev.selectedVisaId === visaIndex ? null : visaIndex,
                  }))
                }>
                <View style={styles.experienceButton}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontSize={ms(15)}
                    text={`Visa No ${visaIndex + 1}`}
                  />
                  <VectorIcon
                    type="FontAwesome"
                    name="chevron-up"
                    size={ms(14)}
                    color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                  />
                </View>
              </ButtonView>

              {statedata.Visa.length > 1 && (
                <ButtonView
                  onPress={() => handleRemoveVisa(visaIndex, visaVal)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign="right"
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text="remove"
                  />
                </ButtonView>
              )}

              <View style={styles.flexViewStyle}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  value={visaVal.visa?.name}
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
          ) : (
            <ButtonView
              onPress={() =>
                setStateData(prev => ({
                  ...prev,
                  selectedVisaId:
                    prev.selectedVisaId === visaIndex ? null : visaIndex,
                }))
              }>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Visa No ${visaIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-down"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                />
              </View>
            </ButtonView>
          )}
        </View>
      );
    };

    return (
      <View style={styles.formContainer}>
        <View>{statedata.Passport.map(renderPassportSection)}</View>
        <ButtonView onPress={() => handleAddPassport(statedata.selectedpasId)}>
          <Text style={styles.addButtonText}>Add +</Text>
        </ButtonView>

        <View>{statedata.Visa.map(renderVisaSection)}</View>
        <ButtonView onPress={() => handleAddVisa(statedata.selectedVisaId)}>
          <Text style={styles.addButtonText}>Add +</Text>
        </ButtonView>

        <AppButton
          type="PASSPORT_VISA"
          isloading={statedata.isLoading}
          // disabled={isButtonDisabled}
          onPress={() => handleAddPassportApi(3)}
          BackgroundColor={Colors.Black}
          title="Update"
        />
      </View>
    );
  }, [statedata]);

  const languagesetupMemo = useMemo(() => {
    if (statedata.currentStep !== 3) return null;

    const handleAddLanguage = index => {
      const selectedArray = statedata.language[index] || statedata.language[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      if (invalidField.length > 0) {
        Util.showMessage('An invalid field exists.');
        return;
      }

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
    };

    const handleRemoveLanguage = (index, item) => {
      const formData = new FormData();
      formData.append('candidate_language_id', item.id);
      dispatch(
        DELETE_LANGUAGE_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('Languages deleted successfully', 'success');
            setStateData(prev => ({
              ...prev,
              language: prev.language.filter((_, i) => i !== index),
            }));
          },
        }),
      );
    };

    const renderLanguageSetup = (language, langIndex) => {
      const isSelected = statedata.selectedlangId === langIndex;
      return (
        <View key={langIndex}>
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() =>
                  setStateData(prev => ({
                    ...prev,
                    selectedlangId:
                      prev.selectedlangId === langIndex ? null : langIndex,
                  }))
                }>
                <View style={styles.experienceButton}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontSize={ms(15)}
                    text={`Language No ${langIndex + 1}`}
                  />
                  <VectorIcon
                    type="FontAwesome"
                    name="chevron-up"
                    size={ms(14)}
                    color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                  />
                </View>
              </ButtonView>

              {statedata.language.length > 1 && (
                <ButtonView
                  onPress={() => handleRemoveLanguage(langIndex, language)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign="right"
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text="remove"
                  />
                </ButtonView>
              )}

              <View style={{paddingHorizontal: ms(5)}}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  value={language.language?.name}
                  label="Select Language"
                  selectedValue={value =>
                    handleLanguageFieldChange(langIndex, 'language', value)
                  }
                  data={statedata.getLanguages.data}
                />
              </View>
            </View>
          ) : (
            <ButtonView
              onPress={() =>
                setStateData(prev => ({
                  ...prev,
                  selectedlangId:
                    prev.selectedlangId === langIndex ? null : langIndex,
                }))
              }>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Language No ${langIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-down"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                />
              </View>
            </ButtonView>
          )}
        </View>
      );
    };

    return (
      <View style={styles.formContainer}>
        <View>{statedata.language.map(renderLanguageSetup)}</View>
        <ButtonView onPress={() => handleAddLanguage(statedata.selectedlangId)}>
          <Text style={styles.addButtonText}>Add +</Text>
        </ButtonView>
        <AppButton
          type="LANGUAGE"
          isloading={statedata.isLoading}
          // disabled={isButtonDisabled}
          onPress={() => handleAddLanguageApi(4)}
          BackgroundColor={Colors.Black}
          title="Update"
        />
      </View>
    );
  }, [statedata]);

  const SkillsetupMemo = useMemo(() => {
    if (statedata.currentStep !== 4) return null;

    const handleAddSkills = index => {
      const selectedArray = statedata.Skills[index] || statedata.Skills[0];
      const invalidField = Object.values(selectedArray)?.filter(
        val => typeof val === 'string' && !val.trim(),
      );

      if (invalidField.length > 0) {
        Util.showMessage('An invalid field exists.');
        return;
      }

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
    };

    const handleDeleteSkill = (index, item) => {
      const formData = new FormData();
      formData.append('candidate_skill_id', item.id);
      dispatch(
        DELETE_SKILLS_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('Skill deleted successfully', 'success');
            setStateData(prev => ({
              ...prev,
              Skills: prev.Skills.filter((_, i) => i !== index),
            }));
          },
        }),
      );
    };

    const renderSkillSetup = (skillItem, skillIndex) => {
      const isSelected = statedata.selectedSkillId === skillIndex;

      return (
        <View key={skillIndex}>
          <ButtonView
            onPress={() =>
              setStateData(prev => ({
                ...prev,
                selectedSkillId:
                  prev.selectedSkillId === skillIndex ? null : skillIndex,
              }))
            }>
            <View style={styles.experienceButton}>
              <ScaleText
                isDarkMode={isDarkMode}
                fontSize={ms(15)}
                text={`Skill No ${skillIndex + 1}`}
              />
              <VectorIcon
                type="FontAwesome"
                name={isSelected ? 'chevron-up' : 'chevron-down'}
                size={ms(14)}
                color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
              />
            </View>
          </ButtonView>

          {isSelected && (
            <>
              {statedata.Skills.length > 1 && (
                <ButtonView
                  onPress={() => handleDeleteSkill(skillIndex, skillItem)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign="right"
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text="remove"
                  />
                </ButtonView>
              )}
              <View style={{paddingHorizontal: ms(5)}}>
                <CustomDropdown
                  isDarkMode={isDarkMode}
                  value={skillItem.skill?.name}
                  label="Select Skills"
                  selectedValue={value =>
                    handleSkillsFieldChange(skillIndex, 'skill', value)
                  }
                  data={statedata.getSkills}
                />
              </View>
            </>
          )}
        </View>
      );
    };

    return (
      <View style={styles.formContainer}>
        <View>{statedata.Skills.map(renderSkillSetup)}</View>
        <ButtonView onPress={() => handleAddSkills(statedata.selectedSkillId)}>
          <Text style={styles.addButtonText}>Add +</Text>
        </ButtonView>
        <AppButton
          isloading={statedata.isLoading}
          onPress={() => handleAddSkillApi(5)}
          BackgroundColor={Colors.Black}
          title="Update"
        />
      </View>
    );
  }, [statedata]);

  const licensesetup = index => {
    const rendeLicenseSetup = (licenseVal, licenseIndex) => {
      const isSelected = statedata.selectedLicenseId === licenseIndex;
      return (
        <View key={licenseIndex}>
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() => {
                  let index = licenseIndex;
                  if (statedata.selectedLicenseId == licenseIndex) {
                    setStateData(prev => ({
                      ...prev,
                      selectedLicenseId: null,
                    }));
                  } else {
                    setStateData(prev => ({
                      ...prev,
                      selectedLicenseId: index,
                    }));
                  }
                }}>
                <View style={styles.experienceButton}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontSize={ms(15)}
                    text={`License No ${licenseIndex + 1}`}
                  />
                  <VectorIcon
                    type="FontAwesome"
                    name="chevron-up"
                    size={ms(14)}
                    color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                  />
                </View>
              </ButtonView>
              {statedata.License.length > 1 && (
                <ButtonView onPress={() => handleDeleteLicense(licenseIndex,licenseVal)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign={'right'}
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text={'remove'}
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
                    value={licenseVal?.license?.name}
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
                    value={licenseVal?.issue_country?.name}
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
          ) : (
            <ButtonView
              onPress={() => {
                let index = licenseIndex;
                if (statedata.selectedLicenseId == licenseIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedLicenseId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedLicenseId: index,
                  }));
                }
              }}>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`License No ${licenseIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-down"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                />
              </View>
            </ButtonView>
          )}
        </View>
      );
    };
    const rendeCertificateSetup = (certificateVal, certificateIndex) => {
      // console.log(
      // '🚀 ~ rendeCertificateSetup ~ certificateVal:',
      // certificateVal,
      // );
      const isSelected = statedata.selectedCertificateId === certificateIndex;
      return (
        <View key={certificateIndex}>
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() => {
                  let index = certificateIndex;
                  if (statedata.selectedCertificateId == certificateIndex) {
                    setStateData(prev => ({
                      ...prev,
                      selectedCertificateId: null,
                    }));
                  } else {
                    setStateData(prev => ({
                      ...prev,
                      selectedCertificateId: index,
                    }));
                  }
                }}>
                <View style={styles.experienceButton}>
                  <ScaleText
                    isDarkMode={isDarkMode}
                    fontSize={ms(15)}
                    text={`Certificate No ${certificateIndex + 1}`}
                  />
                  <VectorIcon
                    type="FontAwesome"
                    name="chevron-up"
                    size={ms(14)}
                    color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                  />
                </View>
              </ButtonView>
              {statedata.Certificate.length > 1 && (
                <ButtonView
                  onPress={() => handleDeleteCertificate(certificateIndex,certificateVal)}>
                  <ScaleText
                    TextStyle={{marginRight: ms(10)}}
                    textAlign={'right'}
                    fontSize={ms(12)}
                    color={Colors.Red}
                    text={'remove'}
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
                    value={certificateVal?.certificate?.name}
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
                    value={certificateVal?.issue_country?.name}
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
          ) : (
            <ButtonView
              onPress={() => {
                let index = certificateIndex;
                if (statedata.selectedCertificateId == certificateIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedCertificateId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedCertificateId: index,
                  }));
                }
              }}>
              <View style={styles.experienceButton}>
                <ScaleText
                  isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Certificate No ${certificateIndex + 1}`}
                />
                <VectorIcon
                  type="FontAwesome"
                  name="chevron-down"
                  size={ms(14)}
                  color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                />
              </View>
            </ButtonView>
          )}
        </View>
      );
    };

    const handleAddlicense = index => {
      if (index > 0) return;
      const ArrayLength = statedata?.License?.length - 1;
      const selectedArray = index
        ? statedata.License[index]
        : statedata.License[ArrayLength];
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
      if (index > 0) return;
      const ArrayLength = statedata.Certificate.length - 1;
      const selectedArray = index
        ? statedata.Certificate[index]
        : statedata.Certificate[ArrayLength];
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

    const handleDeleteLicense = (index, item) => {
      const formData = new FormData();
      formData.append('candidate_license_certificate_id', item.id);
      formData.append('type', 'license');
      dispatch(
        DELETE_LICENSE_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('License deleted successfully', 'success');
            setStateData(prev => {
              const updatedLicense = prev.License.filter((_, i) => i !== index);
              return {
                ...prev,
                License: updatedLicense,
              };
            });
          },
        }),
      );
    };

    const handleDeleteCertificate = (index,item) => {
      const formData = new FormData();
      formData.append('candidate_license_certificate_id', item.id);
      formData.append('type', 'certificate');
      dispatch(
        DELETE_LICENSE_API.request({
          payloadApi: formData,
          cb: res => {
            Util.showMessage('Certificate deleted successfully', 'success');
            setStateData(prev => {
              const updatedCertificate = prev.Certificate.filter(
                (_, i) => i !== index,
              );
              return {
                ...prev,
                Certificate: updatedCertificate,
              };
            });
          },
        }),
      );
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
            title="Update"
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
                {isActiveStep && index === 0 && experiencesetupMemo}
                {isActiveStep && index === 1 && educationsetupMemo}
                {isActiveStep && index === 2 && passportsetupMemo}
                {isActiveStep && index === 3 && languagesetupMemo}
                {isActiveStep && index === 4 && SkillsetupMemo}
                {isActiveStep && index === 5 && licensesetup(index)}
                {statedata.fullscreenisLoading && (
                  <Loader showLoading={statedata.fullscreenisLoading} />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </Background>
  );
};

export default MyBackground;
