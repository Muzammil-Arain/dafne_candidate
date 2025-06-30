import React, {useCallback} from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {Colors, Fonts, Images} from '../../theme';
import {ButtonView} from '../../components';
import {AppButton, ScaleText, VectorIcon} from '../../common';
import {Image} from 'react-native';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();

// Header Component
const Header = React.memo(() => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <ButtonView onPress={() => NavigationService.goBack()}>
            <VectorIcon
              type="Entypo"
              name="chevron-left"
              color={isDarkMode ? Colors.Whiite_B1 : Colors.Black_21}
              size={ms(25)}
            />
          </ButtonView>
          <ScaleText
            isDarkMode={isDarkMode}
            fontFamily={Fonts.type.Bold}
            fontSize={ms(22)}
            text="Jobs"
          />
        </View>
        <ButtonView
          onPress={() => NavigationService.navigate(StackNav.CreateProject)}>
          <View style={styles.newProjectButton}>
            <ScaleText color={Colors.White} text={'New Job'} />
            <VectorIcon
              type="Entypo"
              name="plus"
              color={isDarkMode ? Colors.White : Colors.Black}
              size={ms(17)}
            />
          </View>
        </ButtonView>
      </View>
      {/* <View style={styles.searchContainer}>
        <TextInput
          placeholderTextColor={Colors.Whiite_B8}
          style={styles.searchInput}
          placeholder="Search"
        />
        <VectorIcon
          color={Colors.Whiite_B8}
          size={Fonts.size.size_20}
          name={'search'}
          type={'Fontisto'}
        />
      </View> */}
    </>
  );
});

// Project Item Component
const ProjectItem = React.memo(({item}) => {
  return (
    <View style={styles.projectItemContainer}>
      <View style={styles.projectItemHeader}>
        <View>
          {[
            {label: 'Job Name:', value: 'Server 12354'},
            {label: 'Industry:', value: 'Aviation'},
            {label: 'Position:', value: 'Director Maintenance'},
          ].map(({label, value}, index) => (
            <View key={index} style={styles.flexView}>
              <ScaleText
                fontFamily={Fonts.type.Mediu}
                TextStyle={{marginRight: 8}}
                fontSize={ms(14)}
                color={Colors.Black_21}
                text={label}
              />
              <ScaleText
                fontFamily={Fonts.type.Mediu}
                fontSize={ms(14)}
                color={Colors.DarkYellow}
                text={value}
              />
            </View>
          ))}
        </View>
        {item.icon && (
          <Image
            source={Images.icon.poistion_bell}
            resizeMode="contain"
            style={styles.projectItemImage}
          />
        )}
      </View>
      <AppButton
        onPress={() => NavigationService.navigate(StackNav.Interview)}
        title={'View your Jobs'}
      />
    </View>
  );
});

const Projects = () => {
  const renderItem = useCallback(({item}) => <ProjectItem item={item} />, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={isDarkMode ? Colors.more_black[900] : Colors.White}
      />
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      {/* <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        data={DummyData}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      /> */}

      <View style={{paddingTop:30}}>
        <View style={styles.projectItemContainer}>
          <View style={styles.projectItemHeader}>
            <View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Job Name:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Server 123456'}
                />
              </View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Industry:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Aviation'}
                />
              </View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Postion:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Director Maintenance'}
                />
              </View>
            </View>
            <Image
              source={Images.icon.poistion_bell}
              resizeMode="contain"
              style={styles.projectItemImage}
            />
          </View>
          <AppButton
            onPress={() => NavigationService.navigate(StackNav.Interview)}
            title={'View your Jobs'}
          />
        </View>
        <View style={styles.projectItemContainer}>
          <View style={styles.projectItemHeader}>
            <View>
              <View style={styles.flexView}>
                <ScaleText
                isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Job Name:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Server 123456'}
                />
              </View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Industry:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Real Estate'}
                />
              </View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Postion:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Director Maintenance'}
                />
              </View>
            </View>
            <Image
              source={Images.icon.poistion_bell}
              resizeMode="contain"
              style={styles.projectItemImage}
            />
          </View>

          <AppButton
            onPress={() => NavigationService.navigate(StackNav.Interview)}
            title={'View your Jobs'}
          />
        </View>
        <View style={styles.projectItemContainer}>
          <View style={styles.projectItemHeader}>
            <View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Job Name:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Server 123456'}
                />
              </View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Industry:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Engeneering'}
                />
              </View>
              <View style={styles.flexView}>
                <ScaleText
                 isDarkMode={isDarkMode}
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={{marginRight: 8}}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={'Postion:'}
                />
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={'Director Maintenance'}
                />
              </View>
            </View>
            <Image
              source={Images.icon.poistion_bell}
              resizeMode="contain"
              style={styles.projectItemImage}
            />
          </View>
          <AppButton
            onPress={() => NavigationService.navigate(StackNav.Interview)}
            title={'View your Jobs'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Projects;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: Platform.OS == 'android' ? '10%' : '3%',
    justifyContent: 'space-between',
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    paddingHorizontal: '5%',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80@ms', // Using @ms for scaling width
  },
  headerTitleStyle: {
    fontWeight: '400',
  },
  newProjectButton: {
    backgroundColor: Colors.DarkYellow,
    width: '90@ms', // Using @ms for scaling width
    height: '25@vs', // Using @vs for scaling height
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Back_c8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  },
  searchContainer: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.White_DE,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '30@vs', // Scaling marginBottom
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: Colors.Black,
    fontSize: Fonts.size.size_15,
  },
  flatListContentContainer: {
    paddingTop: '20@ms',
    paddingHorizontal: '5%', // Scaling padding
  },
  projectItemContainer: {
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    minHeight: '130@vs', // Scaling minHeight
    marginBottom: '20@vs', // Scaling marginBottom
    padding: '20@ms', // Scaling padding
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: '20@ms',
  },
  projectItemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  projectItemImage: {
    width: '40@ms', // Scaling width
    height: '40@vs', // Scaling height
  },
});
