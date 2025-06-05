import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Animated,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {screenOptions} from '../../naviagtor/config';
import {ScaleText} from '../../common';
import {Colors, Fonts, Images} from '../../theme';
import {ButtonView, Loader} from '../../components';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import datahandler from '../../helper/datahandler';
import {useDispatch, useSelector} from 'react-redux';
import {getUserData} from '../../ducks/auth';
import firestore from '@react-native-firebase/firestore';
import {firebaseformatDate} from './helper';
import {GET_CHATROOM_API} from '../../ducks/app';
import {FIREBASE_CHAT_KEY} from '../../config/AppConfig';
import {ms} from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';

const isDarkMode = datahandler.getAppTheme();

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const chatRoomRef = useRef([]);
  const [searchvalue, setSearchValue] = useState(null);
  const [chatRoms, setChatRooms] = useState([]);
  const formattedChatRooms = [...chatRoomRef.current];
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        {route: null, navigation},
        () => navigation.goBack(),
        isDarkMode,
        'Chats',
        false,
        false,
      ),
    );
  }, [navigation, isDarkMode]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const onRefresh = () => {
    getData();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  const getData = () => {
    chatRoomRef.current = [];
    setChatRooms([]);

    dispatch(
      GET_CHATROOM_API.request({
        payloadApi: {},
        cb: data => {
          data?.data?.rooms?.map(async value => {
            let item = await getFirebaseChatRooms(value);
          });
        },
      }),
    );
  };

  const getFirebaseChatRooms = async value => {
    try {
      const userId = userData?.id;
      const otherUserId = value?.user?.id;
      if (!userId || !otherUserId) return;

      // Reuse your new consistent chatroomId logic
      const chatroomId =
        userId < otherUserId
          ? `${userId}_${otherUserId}`
          : `${otherUserId}_${userId}`;

      const chatroomRef = firestore()
        .collection(FIREBASE_CHAT_KEY)
        .doc(chatroomId);
      const doc = await chatroomRef.get();

      if (!doc.exists) {
        // If chatroom doesn't exist, create one
        await chatroomRef.set({
          createdAt: firestore.FieldValue.serverTimestamp(),
          users: [userId, otherUserId],
          unReadCount: 0,
          isRead: true,
          isBlocked: false,
          blockedBy: [],
          chatroomid: chatroomId,
        });
      }

      const messagesData = await chatroomRef.get();
      const firebaseChat = {
        ...value,
        firebaseKeys: {
          ...messagesData.data(),
          firebaseDocId: chatroomId,
        },
      };

      formattedChatRooms.push(firebaseChat);
      chatRoomRef.current = [...chatRoomRef.current, firebaseChat];
      setChatRooms([...chatRoomRef.current]);
    } catch (error) {
      console.log('🚀 ~ getFirebaseChatRooms ~ error:', error);
    }
  };

  const filteredChatRooms = chatRoms.filter(item => {
    const fullName =
      `${item?.user?.first_name} ${item?.user?.last_name}`.toLowerCase();
    return fullName.includes(searchvalue?.toLowerCase() || '');
  });

  const getTotalUnreadCount = async () => {
    const userId = userData?.id;
    try {
      const snapshot = await firestore()
        .collection(FIREBASE_CHAT_KEY)
        .where(`unreadCount_${userId}`, '>', 0)
        .get();

      let totalUnread = 0;

      snapshot.forEach(doc => {
        const data = doc.data();
        totalUnread += data[`unreadCount_${userId}`] || 0;
      });

      return totalUnread;
    } catch (error) {
      console.log('🚨 Error getting unread count:', error);
      return 0;
    }
  };

  const renderChatItem = ({item, index}) => {
    const slideIn = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          }),
        },
      ],
      opacity: animatedValue,
    };

    if (item.user) {
      const {firebaseKeys} = item;
      let projectName = item?.firebaseKeys?.project_name;
      let updatedTime =
        firebaseKeys?.createdAt && firebaseformatDate(firebaseKeys?.createdAt);
      let lastMsg = firebaseKeys?.lastMsg;
      let unreadCount = firebaseKeys?.[`unreadCount_${userData?.id}`];

      return (
        <Animated.View style={[styles.chatItemContainer, slideIn]}>
          <ButtonView
            onPress={() => {
              NavigationService.navigate(StackNav.GiftChat, {
                data: item.user,
                projectName: projectName,
                chatroom_id: item.firebaseKeys.chatroomid,
              });
            }}>
            <View style={styles.chatItemContent}>
              <Image
                source={{
                  uri: item.user?.profile ?? Images.iconsource.dummyuserimage,
                }}
                resizeMode="cover"
                style={styles.avatar}
              />
              <View style={styles.chatContent}>
                <ScaleText
                  fontFamily={Fonts.type.Mediu}
                  TextStyle={styles.chatName}
                  text={projectName}
                  // text={`${item.user.first_name} ${item?.user?.last_name}`}
                />
                <ScaleText TextStyle={styles.chatMessage} text={lastMsg} />
              </View>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <ScaleText TextStyle={styles.chatTime} text={updatedTime} />
                {unreadCount > 0 && (
                  <View
                    style={{
                      backgroundColor: Colors.orange[500],
                      width: ms(20),
                      height: ms(20),
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <ScaleText
                      fontSize={Fonts.size.size_12}
                      color={Colors.Black_4A}
                      textAlign={'center'}
                      text={String(unreadCount)}
                    />
                  </View>
                )}
              </View>
            </View>
          </ButtonView>
        </Animated.View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loader type={'GET_CHATROOM'} />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={isDarkMode ? Colors.Black_21 : Colors.White}
      />
      <Animated.View style={styles.searchContainer}>
        <TextInput
          value={searchvalue}
          onChangeText={e => setSearchValue(e)}
          placeholderTextColor={isDarkMode ? Colors.Whiite_CC : Colors.Black_42}
          placeholder="Search"
          style={styles.searchInput}
        />
      </Animated.View>
      {filteredChatRooms?.length === 0 && searchvalue ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ScaleText fontSize={ms(17)} text="No Messages Found...!" />
        </View>
      ) : (
        <FlatList
          data={filteredChatRooms}
          renderItem={renderChatItem}
          keyExtractor={item => item.id?.toString()}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
    transform: [{scale: 1}],
  },
  container: {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.Black_21 : Colors.White,
  },
  searchInput: {
    backgroundColor: isDarkMode ? Colors.more_black[900] : Colors.Whiite_FA,
    height: 50,
    borderWidth: 1,
    borderColor: isDarkMode ? Colors.Whiite_B1 : 'rgba(2, 2, 2, 0.15)',
    paddingHorizontal: 15,
    borderRadius: 8,
    color: isDarkMode ? Colors.White : Colors.Black,
    fontSize: Fonts.size.size_14,
  },
  chatList: {
    paddingHorizontal: 20,
  },
  chatItemContainer: {
    marginBottom: 10,
  },
  chatItemContent: {
    backgroundColor: Colors.OffYellow,
    borderRadius: 10,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
  },
  chatContent: {
    flex: 1,
    marginLeft: 15,
  },
  chatName: {
    fontSize: Fonts.size.size_14,
    fontWeight: '500',
    color: Colors.Black,
  },
  chatMessage: {
    fontSize: Fonts.size.size_12,
    color: Colors.Back_70,
    marginTop: -2,
  },
  chatTime: {
    fontSize: Fonts.size.size_12,
    color: Colors.DarkYellow,
  },
});
