import React, { useState, useRef, useLayoutEffect } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import { AppButton, Background, PopupModal, ScaleText } from '../../common';
import { ButtonView } from '../../components';
import { Colors, Images } from '../../theme';
import { screenOptions } from '../../naviagtor/config';
import { ms } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import { styles } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserData,
  loginAccesToken,
  LOGOUT_API,
  UPDATE_PROFILE_API,
} from '../../ducks/auth';
import { } from '../../ducks/app';
import { NavigationService, Util } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStoragekey } from '../../config/AppConfig';

const EditProfile = ({ navigation }) => {
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({
    firstName: userData?.first_name || '',
    lastName: userData?.last_name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
    companyName: 'Intellaxal Solution',
    country: 'United States',
    role: userData?.role || '',
  });

  const [state, setState] = useState({
    logoutModal: false,
    logoutLoading: false,
  });

  const [editableField, setEditableField] = useState(null);
  const inputRefs = useRef({});
  const isDarkMode = datahandler.getAppTheme();

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Your Profile',
      ),
    );
  }, [navigation, isDarkMode]);

  const handleSave = () => {
    const formData = new FormData();
    formData.append('first_name', profileData.firstName);
    formData.append('last_name', profileData.lastName);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('designation', profileData.role);
    // formData.append('profile_picture', profileData.password);
    dispatch(
      UPDATE_PROFILE_API.request({
        payloadApi: formData,
        cb: res => {
          Util.showMessage('Profile updated successfully!', 'success');
          setEditableField(null);
          NavigationService.goBack();
        },
      }),
    );
  };

  const handleLogOut = async () => {
    setState(prev => ({ ...prev, logoutModal: false }));

    // Dispatch token removal action
    dispatch({
      type: loginAccesToken.type,
      payload: {
        token: false,
      },
    });

    // Clear all AsyncStorage except LOGIN_USER
    const keysToKeep = [LocalStoragekey.LOGIN_USER]; // Keep LOGIN_USER
    const allKeys = await AsyncStorage.getAllKeys();
    const keysToRemove = allKeys.filter(key => !keysToKeep.includes(key));
    console.log('🚀 ~ handleLogOut ~ keysToRemove:', keysToRemove);

    await AsyncStorage.multiRemove(keysToRemove);

    dispatch({
      type: LOGOUT_API.type,
    });

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    datahandler.setisNewProject(null);
    // Close the drawer and reset navigation again
    return;
    navigation.closeDrawer();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
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
        editable={editableField === field}
        style={styles.textInputStyle}
      />
    </View>
  );

  return (
    <Background isDarkMode={isDarkMode}>
      {renderEditableField('First Name', 'firstName')}
      {renderEditableField('Last Name', 'lastName')}
      {renderEditableField('Email', 'email')}
      {renderEditableField('Phone', 'phone')}
      {/* <ButtonView
        onPress={() => setState(prev => ({ ...prev, logoutModal: true }))}>
        <ScaleText
          fontSize={ms(17)}
          TextStyle={styles.logoutTextStyle}
          text={'logout'}
        />
      </ButtonView> */}
      <AppButton type={'UPDATE_PROFILE'} title="Update" onPress={handleSave} />
      <PopupModal
        isModalVisible={state.logoutModal}
        showButtons={true}
        ButtonTitleOne={'Yes'}
        ButtonTitleTwo={'No'}
        ButtonOneLoading={state.logoutLoading}
        ButtonOnePress={() => handleLogOut()}
        ButtonTwoPress={() => {
          setState(prev => ({ ...prev, logoutModal: false }));
        }}
        title={'Logout Confirmation'}
        description={
          'Are you sure you want to log out? This will end your current session.'
        }
      />
    </Background>
  );
};

export default EditProfile;
