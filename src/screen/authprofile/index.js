import React, {useLayoutEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {AppButton, Background, ScaleText, VectorIcon} from '../../common';
import {
  AppCheckBox,
  ButtonView,
  CustomDropdown,
  TextInputCustom,
} from '../../components';
import {ProgressBar} from 'react-native-paper';
import {useHookForm, ValidationSchema} from '../../utils/ValidationUtil';
import {screenOptions} from '../../naviagtor/config';
import {NavigationService, Util} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import {dummyDropdownData} from '../../utils/Hardcorddata';
import moment from 'moment';
import datahandler from '../../helper/datahandler';

const progressSteps = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
const progressTextSteps = ['10%', '20%', '30%', '40%', '50%', '60%'];
const steps = [
  'Work Experience/History',
  'Education',
  'Passport & Work Visa',
  'Language',
  'Skills',
  'Valid License & Certificates',
];
const isDarkMode = datahandler.getAppTheme();
const dateFormet = 'MMM Do YY';

const AuthProfile = ({navigation}) => {
  const [formObj, emailProps, termProps] = useHookForm(
    ['email', 'password', 'term'],
    {term: false, email: ' '},
    ValidationSchema.logIn,
  );

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        statedata.currentStep == null
          ? `${`Let's get to know you!`}`
          : `${'Complete your Profile'}`,
      )
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
        currently_working: false,
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
    NextEnalbe:false,
    selectedExpId: 0,
    selectedEudId: 0,
    selectedpasId: 0,
    selectedlangId: 0,
    selectedSkillId: 0,
    selectedLicenseId: 0,
    selectedCertificateId: 0,
    selectedVisaId:0,
    isLoading:false,
  });

  const handleNext = index => {
    setStateData(prev => ({...prev, isLoading:true}));
    setTimeout(() => {
      setStateData(prev => ({...prev, currentStep: index,isLoading:false}));
    }, 1500);
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
      console.log(UpdateskillsFiled);
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

  const experiencesetup = index => {
    const renderExperienceSection = (experience, expIndex) => {
      const isSelected = statedata.selectedExpId === expIndex;
      return (
        <View key={expIndex}>
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() => {
                  let index = expIndex;
                  if (statedata.selectedExpId == expIndex) {
                    setStateData(prev => ({
                      ...prev,
                      selectedExpId: null,
                    }));
                  } else {
                    setStateData(prev => ({
                      ...prev,
                      selectedExpId: index,
                    }));
                  }
                }}>
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
                  value={experience.industry}
                  label="Select Industry"
                  selectedValue={value =>
                    handleFieldChange(expIndex, 'industry', value)
                  }
                  mainContainerStyle={styles.dropdownStyle}
                  data={dummyDropdownData}
                />
                <CustomDropdown
                isDarkMode={isDarkMode}
                  value={experience.employmentType}
                  label="Employment Type"
                  selectedValue={value =>
                    handleFieldChange(expIndex, 'employmentType', value)
                  }
                  mainContainerStyle={styles.dropdownStyle}
                  data={dummyDropdownData}
                />
              </View>
              <CustomDropdown
               isDarkMode={isDarkMode}
                value={experience.jobTitle}
                label="Job Title"
                selectedValue={value =>
                  handleFieldChange(expIndex, 'jobTitle', value)
                }
                data={dummyDropdownData}
              />
              <CustomDropdown
               isDarkMode={isDarkMode}
                value={experience.companyName}
                label="Company Name"
                selectedValue={value =>
                  handleFieldChange(expIndex, 'companyName', value)
                }
                data={dummyDropdownData}
              />
              <CustomDropdown
               isDarkMode={isDarkMode}
                value={experience.location}
                label="Location"
                selectedValue={value =>
                  handleFieldChange(expIndex, 'location', value)
                }
                data={dummyDropdownData}
              />
              <View style={styles.row}>
                <CustomDropdown
                 isDarkMode={isDarkMode}
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
              onPress={() => {
                let index = expIndex;
                if (statedata.selectedExpId == expIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedExpId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedExpId: index,
                  }));
                }
              }}>
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

    const handleAddExperience = index => {
      const selectedArray = statedata.Experience[index];
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
      const selectedArray = statedata.Experience[0];
        const invalidField = Object.values(selectedArray)?.filter(
          val => typeof val === 'string' && !val.trim(),
        );
        const ButtonEnale = invalidField.length <=1 ? false: true;
      return (
        <View style={styles.formContainer}>
          <View>{statedata.Experience.map(renderExperienceSection)}</View>
          <ButtonView
            onPress={() => handleAddExperience(statedata.selectedExpId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
          isloading={statedata.isLoading && !ButtonEnale}
          disabled={ButtonEnale}
            onPress={() => handleNext(1)}
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
        <View key={eduIndex}>
          {isSelected ? (
            <View key={eduIndex} style={styles.educationSection}>
              <ButtonView
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
                    color={isDarkMode ? Colors.Whiite_B8: Colors.Black_55}
                  />
                </View>
              </ButtonView>
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
              <TextInputCustom
                optional={true}
                isDarkMode={isDarkMode}
                placeholder="Enter higher education degree"
                label="Higher Education Degree"
                value={education.degree}
                onChangeText={text =>
                  setStateData(prev => {
                    const updatedEducation = [...prev.Education];
                    updatedEducation[eduIndex].degree = text;
                    return {...prev, Education: updatedEducation};
                  })
                }
              />
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
          ) : (
            <ButtonView
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
                  text={`Eduction No ${eduIndex + 1}`}
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

    const handleAddEducation = index => {
      const selectedArray = statedata.Education[index];
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
      const isButtonDisabled = invalidField.length > 0 ;
      return (
        <View style={styles.formContainer}>
          <View>{statedata.Education.map(renderEducationSection)}</View>
          <ButtonView
            onPress={() => handleAddEducation(statedata.selectedEudId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
          isloading={statedata.isLoading && !isButtonDisabled}
          disabled={isButtonDisabled}
            onPress={() => handleNext(2)}
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
          {isSelected ? (
            <View>
              <ButtonView
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
              </ButtonView>
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
                  value={passport.passport}
                  label="Passport Nationality"
                  selectedValue={value =>
                    handlePassportFieldChange(passIndex, 'passport', value)
                  }
                  mainContainerStyle={styles.dropdownViewStyle}
                  data={dummyDropdownData}
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
                onPress={() => {
                  let index = visaIndex;
                  if (statedata.selectedVisaId == visaIndex) {
                    setStateData(prev => ({
                      ...prev,
                      selectedVisaId: null,
                    }));
                  } else {
                    setStateData(prev => ({
                      ...prev,
                      selectedVisaId: index,
                    }));
                  }
                }}>
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
                  value={visaVal.visa}
                  label="Visa (Optional)"
                  selectedValue={value =>
                    handleVisaFieldChange(visaIndex, 'visa', value)
                  }
                  mainContainerStyle={styles.dropdownViewStyle}
                  data={dummyDropdownData}
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
              onPress={() => {
                let index = visaIndex;
                if (statedata.selectedVisaId == visaIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedVisaId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedVisaId: index,
                  }));
                }
              }}>
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

    const handleAddPassport = index => {
      const selectedArray = statedata.Passport[index];
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
      const selectedArray = statedata.Visa[index];
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
      const isButtonDisabled = invalidPassportField.length > 0 || invalidVisaVisaField.length > 0;

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
          isloading={statedata.isLoading}
          disabled={isButtonDisabled}
            onPress={() => handleNext(3)}
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
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() => {
                  let index = langIndex;
                  if (statedata.selectedlangId == langIndex) {
                    setStateData(prev => ({
                      ...prev,
                      selectedlangId: null,
                    }));
                  } else {
                    setStateData(prev => ({
                      ...prev,
                      selectedlangId: index,
                    }));
                  }
                }}>
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
                  paddingHorizontal: ms(5),
                }}>
                <CustomDropdown
                isDarkMode={isDarkMode}
                  value={language.language}
                  label="Select Language"
                  selectedValue={value =>
                    handleLanguageFieldChange(langIndex, 'language', value)
                  }
                  data={dummyDropdownData}
                />
              </View>
            </View>
          ) : (
            <ButtonView
              onPress={() => {
                let index = langIndex;
                if (statedata.selectedlangId == langIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedlangId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedlangId: index,
                  }));
                }
              }}>
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

    const handleAddlanguage = index => {
      const selectedArray = statedata.language[index];
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
      const isButtonDisabled = invalidField.length > 0 ;
      return (
        <View style={styles.formContainer}>
          <View>{statedata.language.map(renderLanguageSetup)}</View>
          <ButtonView
            onPress={() => handleAddlanguage(statedata.selectedlangId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
          isloading={statedata.isLoading}
          disabled={isButtonDisabled}
            onPress={() => handleNext(4)}
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
          {isSelected ? (
            <View>
              <ButtonView
                onPress={() => {
                  let index = skillIndex;
                  if (statedata.selectedSkillId == skillIndex) {
                    setStateData(prev => ({
                      ...prev,
                      selectedSkillId: null,
                    }));
                  } else {
                    setStateData(prev => ({
                      ...prev,
                      selectedSkillId: index,
                    }));
                  }
                }}>
                <View style={styles.experienceButton}>
                  <ScaleText
                  isDarkMode={isDarkMode}
                    fontSize={ms(15)}
                    text={`Skills No ${skillIndex + 1}`}
                  />
                  <VectorIcon
                    type="FontAwesome"
                    name="chevron-up"
                    size={ms(14)}
                    color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_55}
                  />
                </View>
              </ButtonView>
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
                  value={skillsVal.skill}
                  label="Select Skills"
                  selectedValue={value =>
                    handleSkillsFieldChange(skillIndex, 'skill', value)
                  }
                  data={dummyDropdownData}
                />
              </View>
            </View>
          ) : (
            <ButtonView
              onPress={() => {
                let index = skillIndex;
                if (statedata.selectedSkillId == skillIndex) {
                  setStateData(prev => ({
                    ...prev,
                    selectedSkillId: null,
                  }));
                } else {
                  setStateData(prev => ({
                    ...prev,
                    selectedSkillId: index,
                  }));
                }
              }}>
              <View style={styles.experienceButton}>
                <ScaleText
                isDarkMode={isDarkMode}
                  fontSize={ms(15)}
                  text={`Language No ${skillIndex + 1}`}
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

    const handleAddSkills = index => {
      const selectedArray = statedata.Skills[index];
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
      const isButtonDisabled = invalidField.length > 0 ;
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
            onPress={() => handleNext(5)}
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
                    value={licenseVal.license}
                    selectedValue={value =>
                      handleLicenseFieldChange(licenseIndex, 'license', value)
                    }
                    data={dummyDropdownData}
                  />
                  <CustomDropdown
                  isDarkMode={isDarkMode}
                    mainContainerStyle={styles.dropdownViewStyle}
                    label="Issuing Country"
                    value={licenseVal.issue_country}
                    selectedValue={value =>
                      handleLicenseFieldChange(licenseIndex, 'issue_country', value)
                    }
                    data={dummyDropdownData}
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
                    color={isDarkMode ?Colors.Whiite_B1 : Colors.Black_55}
                  />
                </View>
              </ButtonView>
              {statedata.Certificate.length > 1 && (
                <ButtonView onPress={() => handleDeleteCertificate(certificateIndex)}>
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
                    value={certificateVal.certificate}
                    selectedValue={value =>
                      handleCertificatesFieldChange(certificateIndex, 'certificate', value)
                    }
                    data={dummyDropdownData}
                  />
                  <CustomDropdown
                  isDarkMode={isDarkMode}
                    mainContainerStyle={styles.dropdownViewStyle}
                    label="Issuing Country"
                    value={certificateVal.issue_country}
                    selectedValue={value =>
                      handleCertificatesFieldChange(certificateIndex, 'issue_country', value)
                    }
                    data={dummyDropdownData}
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
      const selectedArray = statedata.License[index];
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
        const updatedCertificate = prev.Certificate.filter((_, i) => i !== index);
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
      const isButtonDisabled = invalidLicenseField.length > 0 || invalidCertField.length > 0;
    
      return (
        <View style={styles.formContainer}>
          <View>{statedata.License.map(rendeLicenseSetup)}</View>
          <ButtonView
            onPress={() => handleAddlicense(statedata.selectedLicenseId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <View>{statedata.Certificate.map(rendeCertificateSetup)}</View>
          <ButtonView
            onPress={() => handleAddCertificate(statedata.selectedCertificateId)}>
            <Text style={styles.addButtonText}>Add +</Text>
          </ButtonView>
          <AppButton
          disabled={isButtonDisabled}
            onPress={() => {
              NavigationService.push(StackNav.CompleteProfile, {
                value: '60%',
              });
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
                        backgroundColor: isFutureStep && !isDarkMode
                          ? Colors.Border : isDarkMode && isFutureStep ? Colors.more_black[900]
                          : Colors.Yellow,
                      },
                    ]}
                  />
                )}
              </View>
              {/* Step Label */}
              <View>
              <TouchableOpacity
              disabled={statedata.currentStep < index}
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
                  {step}
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

const styles = ScaledSheet.create({
  stepContainer: {
    flexDirection: 'row',
  },
  circleContainer: {
    alignItems: 'center',
    marginRight: '10@ms', // Scaled margin
  },
  circle: {
    width: '30@ms', // Scaled width
    height: '30@ms', // Scaled height
    borderRadius: '15@ms', // Scaled border radius
    backgroundColor: Colors.Whiite_CC,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: Colors.White,
    fontFamily: Fonts.type.Roman,
  },
  line: {
    flex: 1,
    width: '2@ms', // Scaled width
    height: '30@ms', // Scaled height
    backgroundColor: '#ccc',
  },
  stepText: {
    fontSize: '19@ms', // Scaled font size
    fontFamily: Fonts.type.Mediu,
    marginTop: '2@ms', // Scaled margin
  },
  activeCircle: {
    borderWidth: 0.5,
    borderColor: Colors.Border,
    backgroundColor: Colors.Yellow,
  },
  inactiveCircle: {
    backgroundColor: '#aaaaaa',
  },
  formContainer: {
    padding: '10@ms',
    flex: 1,
    marginVertical:'10@ms',
    borderRadius: '10@ms', // Scaled border radius
    backgroundColor: isDarkMode ? Colors.more_black[900] :Colors.Whiite_FA,
    shadowColor: Colors.Black,
    elevation: 1,
  },
  plusButton: {
    backgroundColor: Colors.Yellow,
    width: '30@ms', // Scaled width
    height: '30@ms', // Scaled height
    borderRadius: '3@ms', // Scaled border radius
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '2@ms', // Scaled border width
    borderColor: Colors.Back_c8,
    alignSelf: 'flex-end',
  },
  AddMoreButton: {
    width: '100%',
    marginVertical: '5@ms',
    alignItems: 'flex-end',
  },
  profileStatusText: {
    marginTop: '20@ms', // Scaled margin
    color: isDarkMode ? Colors.White : Colors.Black,
    fontSize: '16@ms', // Scaled font size
    fontFamily: Fonts.type.Mediu,
  },
  progressBar: {
    height: '15@ms', // Scaled height
    borderRadius: '10@ms', // Scaled border radius
    marginVertical: '10@ms', // Scaled margin
    width: '300@ms', // Scaled width
  },
  progressText: {
    color: isDarkMode ? Colors.White: Colors.Black,
    marginLeft: '10@ms', // Scaled margin
    fontSize: '14@ms', // Scaled font size
  },
  dropdownViewStyle: {
    width: '130@ms', // Scaled width
  },
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  plusFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectedExperienceContainer: {
    marginVertical: '10@ms',
    paddingHorizontal: '5@ms',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownStyle: {
    flex: 1,
    width: '135@ms',
  },
  checkboxContainer: {
    marginVertical: 10,
  },
  checkBoxText: {
    fontFamily: Fonts.type.Roman,
  },
  experienceButton: {
    flexDirection: 'row',
    backgroundColor: isDarkMode ? Colors.more_black[800] : Colors.Whiite_FA,
    paddingHorizontal: ms(20),
    height: ms(40),
    marginBottom:'10@ms',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    width: '280@ms',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    shadowColor:isDarkMode?Colors.White : Colors.Back_70
  },
  addButtonText: {
    color: Colors.Yellow,
    textAlign: 'right',
    fontSize: ms(16),
    fontFamily: Fonts.type.Roman,
  },
});

export default AuthProfile;
