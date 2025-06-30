import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import {Colors, Fonts} from '../../theme';
import {ButtonView} from '../../components';
import {NavigationService} from '../../utils';
import {StackNav} from '../../naviagtor/stackkeys';
import datahandler from '../../helper/datahandler';

const isDarkMode  = true || datahandler.getAppTheme();

const chatData = [
  {
    id: '1',
    name: 'John Doe',
    message: 'That sounds like a lot of fun!',
    time: '5mins',
    avatar:
      'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2280',
  },
  {
    id: '2',
    name: 'John Doe',
    message: 'That sounds like a lot of fun!',
    time: '5mins',
    avatar:
      'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2280',
  },
  {
    id: '3',
    name: 'John Doe',
    message: 'That sounds like a lot of fun!',
    time: '5mins',
    avatar:
      'https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2280',
  },
];

const Chat = ({navigation}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [refreshing, setRefreshing] = useState(false);


  useLayoutEffect(() => {
    navigation.setOptions(
      screenOptions(
        { route: null, navigation },
        () => navigation.goBack(),
        isDarkMode,
        'Chats',
      )
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
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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

    return (
      <Animated.View style={[styles.chatItemContainer, slideIn]}>
        <ButtonView
          onPress={() => NavigationService.navigate(StackNav.Message)}>
          <View style={styles.chatItemContent}>
            <Image
              source={{uri: item.avatar}}
              resizeMode="cover"
              style={styles.avatar}
            />
            <View style={styles.chatContent}>
              <ScaleText
                fontFamily={Fonts.type.Mediu}
                TextStyle={styles.chatName}
                text={item.name}
              />
              <ScaleText TextStyle={styles.chatMessage} text={item.message} />
            </View>
            <ScaleText TextStyle={styles.chatTime} text={item.time} />
          </View>
        </ButtonView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={isDarkMode ? Colors.Black_21 : Colors.White} />
      <Animated.View style={styles.searchContainer}>
        <TextInput
          placeholderTextColor={isDarkMode ? Colors.Whiite_CC : Colors.Black_42}
          placeholder="Search"
          style={styles.searchInput}
        />
      </Animated.View>
      <FlatList
        data={chatData}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chatList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
    color: isDarkMode ? Colors.White :Colors.Black,
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
    marginLeft: 10,
  },
});
