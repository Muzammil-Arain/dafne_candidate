import React, {useState, useRef, useLayoutEffect} from 'react';
import {Image, Platform, TextInput, View} from 'react-native';
import {AppButton, Background, ScaleText} from '../../common';
import {ButtonView} from '../../components';
import {Colors, Images, Metrics} from '../../theme';
import {screenOptions} from '../../naviagtor/config';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme()

const EditProfile = ({navigation}) => {
  const [profileData, setProfileData] = useState({
    firstName: 'John Doe',
    lastName: 'John Doe',
    email: 'johndoe123@gmail.com',
    phone: '+71 445 887 4456',
    companyName: 'Intellaxal Solution',
    country: 'United State',
    role: 'Pilot',
  });

  const [editableField, setEditableField] = useState(null);
  const inputRefs = useRef({});

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
       'Your Profile',
      )
    );
  }, [navigation, isDarkMode]);

  const handleSave = () => {
    console.log('Saved:', profileData);
    setEditableField(null);
  };

  const handleChange = (field, value) => {
    setProfileData({...profileData, [field]: value});
  };

  const handleEditPress = field => {
    setEditableField(field);
    setTimeout(() => {
      inputRefs.current[field]?.focus();
    }, 100);
  };

  const renderEditableField = (label, field) => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <ScaleText
        isDarkMode={isDarkMode}
          color={Colors.Black_21}
          fontSize={ms(15)}
          text={label}
        />
        <ButtonView onPress={() => handleEditPress(field)}>
          <Image
            tintColor={Colors.Black_8b}
            source={Images.icon.Edit}
            resizeMode="contain"
            style={styles.editIcon}
          />
        </ButtonView>
      </View>
      <TextInput
        ref={ref => (inputRefs.current[field] = ref)}
        value={profileData[field]}
        onChangeText={value => handleChange(field, value)}
        editable={editableField === field} // Make editable based on state
        style={styles.textInputStyle}
      />
    </View>
  );

  return (
    <Background isDarkMode={isDarkMode}>
      {/* <View style={styles.container}> */}
      {renderEditableField('First Name', 'firstName')}
      {renderEditableField('Last Name', 'lastName')}
      {renderEditableField('Email', 'email')}
      {renderEditableField('Phone', 'phone')}
      {/* {renderEditableField('Company Name', 'companyName')} */}
      {/* {renderEditableField('Country', 'country')} */}
      {/* {renderEditableField('Your designation/role', 'role')} */}
      <AppButton title={'Save'} onPress={handleSave} />
      {/* </View> */}
    </Background>
  );
};

export default EditProfile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderTopRightRadius: '26@ms',
    borderTopLeftRadius: '26@ms',
    marginHorizontal:' -20@ms',
    marginBottom:' -20@ms',
    height: Metrics.screenHeight,
  },
  fieldContainer: {
    marginBottom: '20@ms',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5@ms',
  },
  textInputStyle: {
    borderWidth: 1,
    backgroundColor: Colors.Whiite_FA,
    fontSize: '14@ms',
    color: Colors.Black,
    paddingBottom:
      Platform.OS === 'ios' ? Metrics.ratio(12) : Metrics.ratio(10),
    paddingTop: Platform.OS === 'ios' ? Metrics.ratio(12) : Metrics.ratio(10),
    paddingHorizontal: Metrics.ratio(15),
    includeFontPadding: false,
    borderColor: 'rgba(2, 2, 2, 0.15)',
    borderRadius: 5,
  },
  editIcon: {
    width: '17@ms',
    height: '17@ms',
  },
});
