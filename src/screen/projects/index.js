import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import {Colors, Fonts, Images} from '../../theme';
import {ButtonView} from '../../components';
import {AppButton, ScaleText, VectorIcon} from '../../common';
import {Image} from 'react-native';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {useDispatch} from 'react-redux';
import {GET_INTERVIEW_JOBS_API, GET_INVITATIONS_API} from '../../ducks/app';
import {useIsFocused} from '@react-navigation/native';

const isDarkMode = datahandler.getAppTheme();

// Header Component
const Header = React.memo(() => (
  <View style={styles.header}>
    <View style={styles.headerLeftContainer}>
      <ButtonView onPress={() => NavigationService.goBack()}>
        {/* Add your VectorIcon component */}
      </ButtonView>
      <ScaleText fontFamily={Fonts.type.Bold} fontSize={ms(22)} text="Jobs" />
    </View>
    <ButtonView
      onPress={() => NavigationService.navigate(StackNav.CreateProject)}>
      <View style={styles.newProjectButton}>
        <ScaleText color={Colors.White} text="New Job" />
        <VectorIcon
          type="Entypo"
          name="plus"
          color={Colors.White}
          size={ms(17)}
        />
      </View>
    </ButtonView>
  </View>
));

const handleViewJob = (item, dispatch, setJobsData) => {
  setJobsData(prevJobs =>
    prevJobs.map(job => (job.id === item.id ? {...job, loading: true} : job)),
  );

  const formData = new FormData();
  formData.append('candidate_preferable_industry_id', item.id);
  console.log('🚀 ~ handleViewJob ~ formData:', formData);

  dispatch(
    GET_INVITATIONS_API.request({
      payloadApi: formData,
      cb: res => {
        console.log('🚀 ~ handleViewJob ~ res:', res);
        NavigationService.navigate(StackNav.Interview, {
          data: res?.invitations?.reverse(),
          id: item.id,
        });
        setJobsData(prevJobs =>
          prevJobs.map(job =>
            job.id === item.id ? {...job, loading: false} : job,
          ),
        );
      },
    }),
  );
};

// Project Item Component
const ProjectItem = React.memo(({item, dispatch, onPress}) => (
  <View style={styles.projectItemContainer}>
    <View style={styles.projectItemHeader}>
      <View>
        {[
          {label: 'Job Name:', value: item.job_name},
          {label: 'Industry:', value: item.industry || 'Aviation'},
          {
            label: 'Position:',
            value: item.position_looking_for || 'Director Maintenance',
          },
        ].map(({label, value}, index) => (
          <View key={index} style={styles.flexView}>
            <ScaleText
              fontFamily={Fonts.type.Mediu}
              fontSize={ms(14)}
              color={Colors.Black_21}
              text={label}
            />
            <ScaleText
              TextStyle={{marginLeft: 10}}
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
      isloading={item?.loading}
      onPress={onPress}
      title="View your Jobs"
    />
  </View>
));

const Projects = ({navigation}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getNotificationData = useCallback(async () => {
    setRefreshing(true);
    try {
      dispatch(
        GET_INTERVIEW_JOBS_API.request({
          payloadApi: {},
          cb: async res => {
            const jobs = res?.data?.reverse() || [];
            const jobsWithLoadingState = jobs.map(job => ({
              ...job,
              loading: false,
              interestStatus: null,
            }));
            setJobsData(jobsWithLoadingState.reverse());
            setLoading(false);
            setRefreshing(false);
          },
        }),
      );
    } catch (error) {
      console.log('Error fetching data:', error);
      setRefreshing(false);
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    getNotificationData();
  }, [focus]);

  const handleInterest = (itemId, status) => {
    setJobsData(prevJobs =>
      prevJobs.map(job =>
        job.id === itemId ? {...job, interestStatus: status} : job,
      ),
    );
  };

  const renderItem = useCallback(
    ({item}) => (
      <ProjectItem
        item={item}
        dispatch={dispatch}
        onInterestChange={handleInterest}
        onPress={() => handleViewJob(item, dispatch, setJobsData)}
      />
    ),
    [dispatch],
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={isDarkMode ? Colors.more_black[900] : Colors.White}
      />
      <Header />

      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        data={jobsData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getNotificationData}
          />
        }
      />
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
    paddingVertical: Platform.OS === 'android' ? '10%' : '3%',
    justifyContent: 'space-between',
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    paddingHorizontal: '5%',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newProjectButton: {
    backgroundColor: Colors.DarkYellow,
    width: '90@ms',
    height: '25@vs',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Back_c8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 5,
  },
  flexView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListContentContainer: {
    paddingTop: '20@ms',
    paddingHorizontal: '5%',
  },
  projectItemContainer: {
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.White,
    minHeight: '130@vs',
    marginBottom: '20@vs',
    padding: '20@ms',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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
    width: '30@ms',
    height: '30@ms',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
