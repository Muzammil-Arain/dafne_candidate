import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { PopupModal, ScaleText, VectorIcon } from '../../common';
import { ButtonView, TextInputCustom } from '../../components';
import { Colors, Fonts, Images } from '../../theme';
import { useHookForm, ValidationSchema } from '../../utils/ValidationUtil';
import { NavigationService } from '../../utils';
import { StackNav } from '../../naviagtor/stackkeys';
import CustomToggleSwitch from '../../components/CustomToggleSwitch';
import DocumentPicker from 'react-native-document-picker';
import HandleImagePicker from '../../components/HandleImagePicker';
import { ms, ScaledSheet } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

// const isDarkMode = datahandler.getAppTheme();
const isDarkMode = true
const { width, height } = Dimensions.get('window');

const Profile_Image =
  'https://t4.ftcdn.net/jpg/00/60/74/45/360_F_60744518_hcYsaXi8wPL8jD5bx3LJMPnMo7TloqdM.jpg';

const ProfileDataArray = [
  // {
  //   name: 'Interview Invitations',
  //   icon: Images.icon.book,
  //   subItems: [
  //     'Why & when you decided to become a corporate pilot',
  //     'What good manners and etiquette mean to you',
  //   ],
  // },
  {
    name: 'My Documents',
    icon: Images.icon.document,
    subItems: ['Upload your CV'],
  },
  { name: 'Your Pictures and Videos', icon: Images.icon.gallery, subItems: [] },
  // {name: 'Availability', icon: Images.icon.availability, subItems: []},
  { name: 'My Background', icon: Images.icon.book, subItems: [] },
  // {name: 'Manage your project(s)', icon: Images.icon.job, subItems: []},
  { name: 'Note', icon: Images.icon.book, subItems: [] },
];

const Profile = ({ navigation,route }) => {
  const [statedata, setStateData] = useState({
    expandedIndex: null,
    selectData: false,
    showProfile: true,
    deleteModal: false,
    showgalleryModal: false,
    galleryPhoto: null,
  });

  console.log('🚀 ~ Profile ~ statedata:', route.params);
  const [formObj, betweenProps] = useHookForm(
    ['between'],
    ValidationSchema.what,
  );

  const handlePickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('Picked document:', res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error: ', err);
      }
    }
  };

  const handleToggle = index => {
    if (statedata.expandedIndex === index) {
      setStateData(prev => ({ ...prev, expandedIndex: null }));
    } else {
      setStateData(prev => ({ ...prev, expandedIndex: index }));
    }
  };

  const handleProfileToggle = newState => {
    setStateData(prev => ({ ...prev, showProfile: newState }));
  };

  const onImagePicked = image => {
    setStateData(prev => ({
      ...prev,
      galleryPhoto: image,
      showgalleryModal: false,
    }));
  };

  const renderItem = ({ item, index }) => (
    <View style={!statedata.showProfile && { opacity: 0.5 }} key={index}>
      <TouchableOpacity
        style={styles.actionItem}
        disabled={!statedata.showProfile}
        onPress={() => handleToggle(index)}>
        <View style={styles.profileArrayFlexView}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={styles.iconStyle}
          />
          <Text style={styles.actionText}>{item.name}</Text>
        </View>
        <Image
          resizeMode="contain"
          source={
            statedata.expandedIndex === index
              ? Images.icon.remove
              : Images.icon.plus
          }
          style={styles.plusIconStyle}
        />
      </TouchableOpacity>
      {/* {statedata.expandedIndex === index && index == 0 && (
        <View style={styles.submenuContainer}>
          {[1, 2, 3, 4].map((value, index) => (
            <View key={index} style={styles.interViewContainer}>
              <ScaleText
                numberOfLines={1}
                color={Colors.Black}
                fontSize={ms(15)}
                text={'Why & when you decided to become a corporate pilot'}
              />
              <View style={styles.interviewFlexView}>
                <ScaleText
                  color={Colors.Black}
                  fontSize={Fonts.size.size_13}
                  text={'100 min'}
                />
                <ButtonView style={styles.buttonStyle}>
                  <ScaleText
                    color={Colors.White}
                    fontSize={Fonts.size.size_11}
                    text={'Edit'}
                  />
                </ButtonView>
              </View>
              <View style={styles.interviewBorder} />
            </View>
          ))}
        </View>
      )} */}
      {statedata.expandedIndex === index && index == 0 && (
        <View style={styles.submenuContainer}>
          <View style={styles.interviewFlexView}>
            <ScaleText isDarkMode={isDarkMode} color={Colors.Black} text={'Upload your CV'} />
            <View style={styles.flexView}>
              <ButtonView onPress={() => handlePickDocument()}>
                <VectorIcon
                  size={ms(18)}
                  color={isDarkMode ? Colors.White : Colors.Black}
                  name={'cloud-upload'}
                  type={'MaterialIcons'}
                />
              </ButtonView>
              <ButtonView
                onPress={() =>
                  setStateData(prev => ({ ...prev, deleteModal: true }))
                }>
                <ScaleText
                  TextStyle={{ marginLeft: ms(10) }}
                  color={Colors.Red}
                  text={'Delete'}
                />
              </ButtonView>
            </View>
          </View>
        </View>
      )}
      {/* {statedata.expandedIndex === index && index == 3 && (
        <View style={styles.submenuContainer}>
          <View style={styles.interviewFlexView}>
            <ScaleText
              fontSize={Fonts.size.size_16}
              color={Colors.Black}
              text={'Select Date'}
            />
            <SwitchToggle
              switchOn={statedata.selectData}
              onPress={() =>
                setStateData(prev => ({
                  ...prev,
                  selectData: !statedata.selectData,
                }))
              }
              circleColorOff={'#D3D3D3'}
              circleColorOn={Colors.DarkYellow}
              backgroundColorOn={'#F6F6F6'}
              backgroundColorOff={'#F6F6F6'}
              containerStyle={{
                width: 55,
                height: 25,
                borderRadius: 25,
                padding: 5,
              }}
              circleStyle={{
                width: 20,
                height: 20,
                borderRadius: 20,
              }}
            />
          </View>
          <View style={styles.calenderViewStyle}>
            <CalendarPicker
              yearTitleStyle={{
                fontSize: Fonts.size.size_18,
                fontWeight: 'bold',
                color: Colors.Black,
              }}
              monthTitleStyle={{
                fontSize: Fonts.size.size_18,
                fontWeight: 'bold',
                color: Colors.Black,
              }}
              textStyle={{color: Colors.Black_55}}
              previousTitleStyle={{color: Colors.Black}}
              nextTitleStyle={{color: Colors.Black}}
              width={Metrics.scaleHorizontal(330)}
              selectedDayColor={Colors.DarkYellow}
              selectedDayTextColor={Colors.White}
              previousTitle="<"
              nextTitle=">"
              todayBackgroundColor={Colors.Yellow}
              //   onDateChange={this.onDateChange}
            />
          </View>
        </View>
      )} */}
      {statedata.expandedIndex === index && index == 3 && (
        <View style={styles.submenuContainer}>
          <View
            style={{
              marginTop: ms(-15),
            }}>
            <TextInputCustom
            isDarkMode={isDarkMode}
              multiline={true}
              textAlignVertical="top"
              cuntomStyle={styles.cuntomStyle}
              label="Personal Notes"
              placeholder="Type Here"
              {...betweenProps}
            />
          </View>
        </View>
      )}
    </View>
  );

  // Render Header Content
  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={[styles.header, !statedata.showProfile && { opacity: 0.5 }]}>
        <ButtonView
          disabled={!statedata.showProfile}
          onPress={() => navigation.goBack()}>
          <VectorIcon
            type="Entypo"
            name="chevron-left"
            color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_21}
            size={ms(25)}
          />
        </ButtonView>
        <ScaleText
        isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Mediu}
          fontSize={ms(22)}
          text="Profile"
        />
        <ButtonView disabled={!statedata.showProfile}>
          <VectorIcon
            type="FontAwesome"
            name="phone"
            color={isDarkMode ? Colors.Whiite_B8 : Colors.Black_21}
            size={ms(22)}
          />
        </ButtonView>
      </View>

      {/* Profile Picture and Edit Button */}
      <View
        style={[
          styles.profileSection,
          !statedata.showProfile && { opacity: 0.5 },
        ]}>
        <Image
          source={{
            uri: statedata.galleryPhoto?.uri ?? Profile_Image,
          }}
          resizeMode="cover"
          style={styles.profileImage}
        />
        <ButtonView
          disabled={!statedata.showProfile}
          onPress={() =>
            setStateData(prev => ({ ...prev, showgalleryModal: true }))
          }
          style={styles.profileEditButton}>
          <VectorIcon
            name="edit"
            type="MaterialIcons"
            color={isDarkMode ? Colors.White : Colors.Black}
            size={ms(19)}
          />
        </ButtonView>
      </View>

      {/* User Info */}
      <View style={[styles.userInfo, !statedata.showProfile && { opacity: 0.5 }]}>
        <ScaleText
        isDarkMode={isDarkMode}
          color={Colors.Black_02}
          fontSize={ms(21)}
          TextStyle={styles.userName}
          fontFamily={Fonts.type.Mediu}
          text="Bastien Hallywood"
        />
        <ScaleText isDarkMode={isDarkMode} color={Colors.Black_02} text="Corporate Pilot" />
        <View style={styles.spacer} />
        <View style={styles.flexView}>
          <VectorIcon
            type="FontAwesome"
            name="phone"
            color={isDarkMode ? Colors.Whiite_B8 : Colors.DarkBlue}
            size={ms(15)}
          />
          <ScaleText isDarkMode={isDarkMode} fontSize={ms(14)} TextStyle={styles.contactText} text="+1 470 277 0684" />
        </View>
        <View style={styles.flexView}>
          <VectorIcon
            type="MaterialCommunityIcons"
            name="email"
            color={isDarkMode ? Colors.Whiite_B8 : Colors.DarkBlue}
            size={ms(15)}
          />
          <ScaleText
          isDarkMode={isDarkMode}
            TextStyle={styles.contactText}
            text="candidate.123@gmail.com"
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: ms(50),
          justifyContent: 'space-evenly',
          marginBottom: ms(15),
        }}>
        <ButtonView
        // disabled={!statedata.showProfile ?true : false }
          onPress={() => NavigationService.navigate(StackNav.EditProfile)}
          style={styles.ProfilEdituttonStyle}>
          <VectorIcon
            color={Colors.White}
            size={ms(17)}
            name={'edit'}
            type={'MaterialIcons'}
          />
          <ScaleText
            TextStyle={{ marginLeft: ms(5) }}
            color={Colors.White}
            fontSize={ms(14)}
            text={'Edit Profile'}
          />
        </ButtonView>
        <ButtonView
          // onPress={() => NavigationService.navigate(StackNav.Projects)}
          style={styles.ProfilEdituttonStyle}>
          <VectorIcon
            color={Colors.White}
            size={ms(17)}
            name={'bookmark'}
            type={'Ionicons'}
          />
          <ScaleText
            TextStyle={{ marginLeft: ms(5) }}
            color={Colors.White}
            fontSize={ms(14)}
            text={'Save Profile'}
          />
        </ButtonView>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: ms(30),
        }}>
        <ScaleText
        isDarkMode={isDarkMode}
          fontFamily={Fonts.type.Roman}
          TextStyle={{ marginBottom: ms(10), fontSize: ms(13), fontWeight: '500' }}
          text={'Hide your profile?'}
        />
        <CustomToggleSwitch
          isOn={statedata.showProfile}
          onToggle={handleProfileToggle}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={isDarkMode ? Colors.more_black[900] :Colors.App_Background}
      />
      <FlatList
        data={ProfileDataArray}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
      <PopupModal
        isModalVisible={statedata.deleteModal}
        GifEnable={true}
        GifSource={Images.icon.warning}
        GifStyle={{ width: ms(100), height: ms(100) }}
        title={'Delete'}
        showButtons={true}
        ButtonTitleOne={'Yes'}
        ButtonTitleTwo={'No'}
        ButtonTwoPress={() => {
          setStateData(prev => ({ ...prev, deleteModal: false }));
        }}
        ButtonOnePress={() => {
          setStateData(prev => ({ ...prev, deleteModal: false }));
        }}
        content={'are you shure you want to delete this'}
      />
      <HandleImagePicker
        modalVisible={statedata.showgalleryModal}
        onClose={() =>
          setStateData(prev => ({ ...prev, showgalleryModal: false }))
        }
        onImagePicked={onImagePicked}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.Black_21: Colors.White,
  },
  header: {
    flexDirection: 'row',
    paddingTop: height * 0.05,
    justifyContent: 'space-between',
    height: height * 0.2,
    backgroundColor: isDarkMode ? Colors.more_black[900]: Colors.App_Background,
    paddingHorizontal: width * 0.05,
  },
  headerTitleStyle: {
    fontWeight: '400',
  },
  profileSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * -0.1,
  },
  profileImage: {
    width: '130@ms',
    height: '130@ms',
    borderRadius: 100,
    borderWidth: 4,
    borderColor: Colors.White,
  },
  profileEditButton: {
    backgroundColor: Colors.DarkYellow,
    width: width * 0.09,
    height: width * 0.09,
    borderRadius: (width * 0.09) / 2,
    position: 'absolute',
    top: 0,
    right: (width * 0.7) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    marginTop: height * 0.01,
    marginBottom: height * 0.005,
  },
  spacer: {
    height: height * 0.01,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contactText: {
    fontSize: '12@ms',
    marginLeft: width * 0.02,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.OffYellow,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: 8,
    marginBottom: height * 0.02,
    marginHorizontal: '20@ms',
  },
  actionText: {
    fontSize: '14@ms',
    color: Colors.Black_02,
    fontFamily: Fonts.type.Mediu,
  },
  profileArrayFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: '20@ms',
    height: '20@ms',
    marginRight: '10@ms',
  },
  plusIconStyle: {
    width: '20@ms',
    height: '20@ms',
  },
  submenuContainer: {
    paddingHorizontal: '20@ms',
    marginBottom: '20@ms',
  },
  submenuText: {
    fontSize: '14@ms',
    color: Colors.Black_02,
    marginBottom: height * 0.01,
  },
  buttonStyle: {
    backgroundColor: Colors.DarkYellow,
    width: '50@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  ProfilEdituttonStyle: {
    backgroundColor: Colors.Yellow,
    marginTop: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
    height: '40@ms',
    width: '120@ms',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  interviewFlexView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  interviewBorder: {
    height: 1.5,
    backgroundColor: Colors.Black_B2,
  },
  interViewContainer: {
    marginBottom: '10@ms',
    height: '60@ms',
  },
  calenderViewStyle: {
    backgroundColor: Colors.White,
    flex: 1,
    padding: '10@ms',
    borderRadius: 14,
    shadowColor: Colors.Black,
    elevation: 10,
    marginTop: '5@ms',
  },
  cuntomStyle: {
    flex: 1,
    width: '350@ms',
    height: '100@ms',
  },
});
