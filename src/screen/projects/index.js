import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  RefreshControl,
  Platform,
  AppState,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images} from '../../theme';
import {ButtonView} from '../../components';
import {AppButton, PopupModal, ScaleText, VectorIcon} from '../../common';
import {Image} from 'react-native';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import {ms, ScaledSheet} from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';
import {useDispatch} from 'react-redux';
import {
  DELETE_PERFERABLE_API,
  GET_INTERVIEW_JOBS_API,
  GET_INVITATIONS_API,
} from '../../ducks/app';
import {useIsFocused} from '@react-navigation/native';
import {
  onNotification,
  removeNotificationListener,
} from '../../utils/NotificationListner';
import {NOTIFICATION_KEYS} from '../../config/AppConfig';

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
      onPress={() => {
        NavigationService.navigate(StackNav.ProjectName, {
          key: true,
        });
        // NavigationService.navigate(StackNav.CreateProject),
        datahandler.setisNewProject(true);
      }}>
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

const Projects = ({navigation}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();
  const [jobsData, setJobsData] = useState([]);
  const [deletemodal, setDeleteModal] = useState(false);
  const [selecteddeleteid, setDeleteId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const handleNotification = async remoteMessage => {
      if (
        remoteMessage?.notification?.title ==
        NOTIFICATION_KEYS.Invitationreceived
      ) {
        await getNotificationData();
      }
    };
    onNotification(handleNotification);

    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('📲 App resumed from background');
          await getNotificationData();
        }

        appState.current = nextAppState;
      },
    );

    return () => {
      removeNotificationListener(handleNotification);
      subscription.remove();
    };
  }, []);

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
              jobloading: false,
              interestStatus: null,
            }));
            setJobsData(jobsWithLoadingState.reverse());
            setRefreshing(false);
          },
        }),
      );
    } catch (error) {
      console.log('Error fetching data:', error);
      setRefreshing(false);
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

  const handleViewJob = (item, dispatch, setJobsData) => {
    NavigationService.navigate(StackNav.Interview, {
      id: item.id,
    });
    return;
    setJobsData(prevJobs =>
      prevJobs.map(job => (job.id === item.id ? {...job, loading: true} : job)),
    );

    const formData = new FormData();
    formData.append('candidate_preferable_industry_id', item.id);
    dispatch(
      GET_INVITATIONS_API.request({
        payloadApi: formData,
        cb: res => {
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

  const handldeleteJob = () => {
    setJobsData(prevJobs =>
      prevJobs.map(job =>
        job.id === selecteddeleteid.id ? {...job, jobloading: true} : job,
      ),
    );
    setDeleteModal(false);
    setDeleteId(false);
    dispatch(
      DELETE_PERFERABLE_API.request({
        payloadApi: null,
        params: selecteddeleteid.id,
        cb: res => {
          setJobsData(prevJobs =>
            prevJobs.map(job =>
              job.id === selecteddeleteid.id
                ? {...job, jobloading: false}
                : job,
            ),
          );
          getNotificationData();
        },
      }),
    );
  };

  // Project Item Component
  const ProjectItem = React.memo(({item, dispatch, onPress}) => {
    const isDisabled = !item?.industry || item?.current_location;

    const jobDetails = useMemo(
      () => [
        {label: 'Job Name:', value: item?.job_name || 'N/A'},
        {label: 'Industry:', value: item?.industry || 'N/A'},
        {
          label: 'Position:',
          value: item?.position_looking_for || 'N/A',
        },
      ],
      [item],
    );

    return (
      <View style={styles.projectItemContainer}>
        <View style={styles.projectItemHeader}>
          <View>
            {jobDetails.map(({label, value}, index) => (
              <View key={index} style={styles.flexView}>
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.Black_21}
                  text={label}
                />
                <ScaleText
                  numberOfLines={1}
                  TextStyle={{marginLeft: 10, width: ms(170)}}
                  fontFamily={Fonts.type.Mediu}
                  fontSize={ms(14)}
                  color={Colors.DarkYellow}
                  text={value}
                />
              </View>
            ))}
          </View>

          {!item?.icon && (
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate(StackNav.ProjectNotifications, {
                  id: item.id,
                })
              }>
              <Image
                source={Images.icon.poistion_bell}
                resizeMode="contain"
                style={styles.projectItemImage}
              />
            </TouchableOpacity>
          )}
        </View>

        {isDisabled == true && (
          <TouchableOpacity>
            <ScaleText
              fontSize={ms(15)}
              TextStyle={styles.saveButtonStyle}
              text={'Complete Your Job Details'}
            />
          </TouchableOpacity>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: ms(5),
          }}>
          <AppButton
            disabled={isDisabled == true ? true : false}
            containerStyle={{
              width: ms(90),
              height: ms(40),
            }}
            isloading={item?.loading}
            onPress={onPress}
            title={'View'}
          />
          <AppButton
            containerStyle={{
              width: ms(90),
              height: ms(40),
            }}
            ShowLinear={false}
            // isloading={item?.loading}
            onPress={() =>
              NavigationService.navigate(StackNav.What, {
                perID: item.id,
                isFromKeyFalse: true,
              })
            }
            title={'Edit'}
          />
          <AppButton
            containerStyle={{
              width: ms(90),
              height: ms(40),
            }}
            ShowLinear={false}
            isloading={item?.jobloading}
            onPress={() => {
              setDeleteModal(true);
              setDeleteId(item);
            }}
            title={'Delete'}
          />
        </View>
      </View>
    );
  });

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
      <PopupModal
        isModalVisible={deletemodal}
        GifEnable={true}
        GifSource={Images.icon.warning}
        GifStyle={{width: ms(100), height: ms(100)}}
        title={'Delete'}
        showButtons={true}
        ButtonTitleOne={'Yes'}
        ButtonTitleTwo={'No'}
        ButtonTwoPress={() => {
          setDeleteModal(false);
          setDeleteId(null);
        }}
        ButtonOnePress={() => {
          handldeleteJob();
        }}
        content={'are you shure you want to delete this'}
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
    minHeight: '150@vs',
    marginBottom: '20@vs',
    padding: '20@ms',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  projectItemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  projectItemImage: {
    position: 'absolute',
    right: 10,
    width: '40@ms',
    height: '40@ms',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonStyle: {
    textDecorationLine: 'underline',
    color: Colors.DarkYellow,
    letterSpacing: 1,
    fontFamily: Fonts.type.LightItalic,
    marginRight: '10@ms',
    textAlign: 'center',
    marginTop: '5@ms',
  },
});
