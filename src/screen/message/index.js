import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors, Fonts} from '../../theme';
import {VectorIcon} from '../../common';
import {ButtonView} from '../../components';
import {NavigationService} from '../../utils';
import HandleImagePicker from '../../components/HandleImagePicker';
import firestore from '@react-native-firebase/firestore';
import {getUserData} from '../../ducks/auth';

const {width, height} = Dimensions.get('window');
export const Firebase_Chat_Key = 'Firebase-Chat';

const Message = () => {
  const value = {user: {id: '002'}};
  const userData = useSelector(getUserData);
  const chatRoomRef = useRef([]);
  const [chatRoms, setChatRooms] = useState([]);
  const formattedChatRooms = [...chatRoomRef.current];
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Lorem ipsum dolor sit amet',
      time: '12:00PM',
      isSent: true,
    },
    {
      id: '2',
      text: 'Lorem ipsum dolor sit amet',
      time: '12:00PM',
      isSent: true,
    },
    {
      id: '3',
      text: 'Lorem ipsum dolor sit amet',
      time: '12:00PM',
      isSent: true,
    },
    {id: '4', text: 'Ok...', time: '12:00PM', isSent: false},
  ]);

  const [statedata, setStateData] = useState({
    showModal: false,
  });

  useEffect(() => {
    getFirebaseChatRooms();
  }, []);

  const getFirebaseChatRooms = async () => {
    const chatroom_id = `${value.user.id}${userData?.id}`;
    const userId = userData?.id;
    console.log('🚀 ~ getFirebaseChatRooms ~ chatroom_id:', chatroom_id);
    if (!userId) return;
    try {
      let getChatWithFirstQuery = firestore().collection(Firebase_Chat_Key);
      getChatWithFirstQuery = await getChatWithFirstQuery.where(
        'chatroomid',
        '==',
        chatroom_id,
      );
      let firstQueryResult = await getChatWithFirstQuery.get();

      if (firstQueryResult._docs.length === 0) {
        let getChatWithSecondQuery = await firestore()
          .collection(Firebase_Chat_Key)
          .where('reciverId', 'in', [`${value.user.id}`, `${userData?.id}`])
          .where('senderId', '==', `${value.user.id}`)
          .get();

        if (getChatWithSecondQuery._docs.length == 0) return;
        getChatWithSecondQuery.forEach(async doc => {
          let messagesData = await firestore()
            .collection(Firebase_Chat_Key)
            .doc(doc.id)
            .get();
          console.log(messagesData._data, 'doc.id');
          formattedChatRooms.push({
            ...value,
            firebaseKeys: {...messagesData._data, firebaseDocId: doc.id},
          });
          chatRoomRef.current = [
            ...chatRoomRef.current,
            {
              ...value,
              firebaseKeys: {...messagesData._data, firebaseDocId: doc.id},
            },
          ];
          setChatRooms([...chatRoomRef.current]);
        });
      } else {
        firstQueryResult.forEach(async doc => {
          let messagesData = await firestore()
            .collection(Firebase_Chat_Key)
            .doc(doc.id)
            .get();

          formattedChatRooms.push({
            ...value,
            firebaseKeys: {...messagesData._data, firebaseDocId: doc.id},
          });
          chatRoomRef.current = [
            ...chatRoomRef.current,
            {
              ...value,
              firebaseKeys: {...messagesData._data, firebaseDocId: doc.id},
            },
          ];
          setChatRooms([...chatRoomRef.current]);
        });
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 21 ~ getMsgs ~ error', error);
    }
  };

  const onImagePicked = image => {
    let imageUri = image.uri;
    setStateData(prev => ({...prev, showModal: false}));
  };

  const renderMessage = ({item}) => (
    <View style={item.isSent ? styles.sentMessage : styles.receivedMessage}>
      <Text
        style={[
          styles.messageText,
          {color: item.isSent ? Colors.White : Colors.Black_21},
        ]}>
        {item.text}
      </Text>
      <Text style={styles.timeText}>{item.time}</Text>
      {item.isSent && (
        <MaterialIcons name="done-all" size={16} color="lightgray" />
      )}
    </View>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.App_Background} />
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <ButtonView onPress={() => NavigationService.goBack()}>
              <VectorIcon
                type="Entypo"
                name="chevron-left"
                color={Colors.Black_21}
                size={Fonts.size.size_25}
              />
            </ButtonView>
            <View style={styles.profileContainer}>
              <Image
                source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.profileName}>John Doe</Text>
                <Text style={styles.onlineStatus}>Online</Text>
              </View>
            </View>
          </View>
          <ButtonView>
            <VectorIcon
              type="FontAwesome"
              name="phone"
              color={Colors.Black_21}
              size={Fonts.size.size_25}
            />
          </ButtonView>
        </View>

        {/* Chat Messages */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.chatList}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <View style={styles.addButton}>
            <ButtonView
              onPress={() =>
                setStateData(prev => ({...prev, showModal: true}))
              }>
              <VectorIcon
                type="Entypo"
                name="plus"
                color={Colors.Black}
                size={Fonts.size.size_25}
              />
            </ButtonView>
          </View>
          <TextInput
            multiline={true}
            placeholderTextColor={Colors.Black_02}
            style={styles.textInput}
            placeholder="Type Here..."
          />
          <ButtonView>
            <View
              style={{
                backgroundColor: Colors.Whiite_FA,
                width: 45,
                height: 45,
                borderRadius: 100,
                marginLeft: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <VectorIcon
                type="Ionicons"
                name="send"
                color={Colors.DarkYellow}
                size={Fonts.size.size_22}
              />
            </View>
          </ButtonView>
        </View>

        <HandleImagePicker
          modalVisible={statedata.showModal}
          onClose={() => setStateData(prev => ({...prev, showModal: false}))}
          onImagePicked={onImagePicked}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.04,
    backgroundColor: Colors.App_Background,
    elevation: 5,
    justifyContent: 'space-between',
    height: Platform.OS == 'android' ? height * 0.15 : height * 0.1,
    paddingBottom: height * 0.05,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.4,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    marginRight: width * 0.03,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: Fonts.size.size_16,
    color: Colors.Black_02,
  },
  onlineStatus: {
    fontSize: Fonts.size.size_12,
    color: 'green',
  },
  chatList: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    backgroundColor: Colors.White,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -30,
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.DarkYellow,
    padding: width * 0.03,
    borderRadius: 10,
    marginBottom: height * 0.01,
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F1F1F1',
    padding: width * 0.03,
    borderRadius: 10,
    marginBottom: height * 0.01,
  },
  messageText: {
    fontSize: Fonts.size.size_14,
  },
  timeText: {
    fontSize: Fonts.size.size_10,
    color: 'gray',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.025,
    backgroundColor: Colors.White,
    borderTopColor: '#F1F1F1',
    borderTopWidth: 1,
  },
  addButton: {
    backgroundColor: '#FFC107',
    padding: width * 0.02,
    borderRadius: width * 0.125,
    marginRight: width * 0.03,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.White_F6,
    paddingHorizontal: width * 0.02,
    paddingTop: 10,
    height: height * 0.06,
    borderRadius: 8,
    color: Colors.Black_02,
  },
});

export default Message;
