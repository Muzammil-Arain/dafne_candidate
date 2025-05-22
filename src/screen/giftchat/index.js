import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Actions,
} from 'react-native-gifted-chat';
import {Colors, Fonts, Images} from '../../theme';
import {NavigationService} from '../../utils';
import {VectorIcon} from '../../common';
import {ButtonView} from '../../components';
import {ms} from 'react-native-size-matters';
import {TakeCameraPicture, PickImageFromGallery} from '../../utils/Gallery';
import Clipboard from '@react-native-clipboard/clipboard';
import {useToast} from 'react-native-toast-notifications';
import {styles} from './styles';
import firestore from '@react-native-firebase/firestore';
import {getUserData} from '../../ducks/auth';
import {useDispatch, useSelector} from 'react-redux';
import {FIREBASE_CHAT_KEY} from '../../config/AppConfig';
import {SEND_NOTIFICATION_API, UPLOAD_MEDIA_API} from '../../ducks/app';
import {handleSendNotification} from '../../utils/Notification';

const {width, height} = Dimensions.get('window');

const App = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userData = useSelector(getUserData);
  const selectedUserdata = route?.params?.data;

  const chatroomid = route?.params?.chatroom_id;
  const [allMsg, setAllMsg] = useState([]);
  console.log('🚀 ~ App ~ allMsg:', allMsg);
  const [unreadmsg, setunredMsg] = useState(0);
  const [textMessage, setTextMessage] = useState('');
  const [photo, setPhoto] = useState(null);
  const [sendmodal, setSendModal] = useState(false);
  const [msgsendloading, setMsgSendLoading] = useState(false);

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 15;
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const chatCollectionIdRef = useRef();
  const chatRoomDetailsRef = useRef();
  const saveCollectionId = id => (chatCollectionIdRef.current = id);
  const getSavedCollectionId = chatref => chatref.current;

  const UploadImageOnFirebase = photo => {
    console.log('🚀 ~ photo:', photo);

    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('media', photo);

      dispatch(
        UPLOAD_MEDIA_API.request({
          payloadApi: formData,
          cb: response => {
            if (response?.media_url) {
              resolve({uri: response.media_url});
            } else {
              reject('Upload failed');
            }
          },
        }),
      );
    });
  };

  useEffect(() => {
    getMsgs();
    let unsubscribe;

    const initListeners = async () => {
      unsubscribe = await getRealTimeMessages();
    };

    initListeners();

    return () => {
      if (unsubscribe) unsubscribe();
      chatCollectionIdRef.current = null;
      chatRoomDetailsRef.current = null;
    };
  }, [navigation]);

  const getMsgs = useCallback(async () => {
    const userId = selectedUserdata?.id;
    if (!userId) return;
    try {
      setIsLoading(true);
      let chatMesasges = [];

      const firstQueryResult = await firestore()
        .collection(FIREBASE_CHAT_KEY)
        .where('chatroomid', '==', chatroomid)
        .get();

      if (firstQueryResult.empty) {
        setIsLoading(false);
        return;
      }

      firstQueryResult.forEach(doc => {
        saveCollectionId(doc.id);
        firestore()
          .collection(FIREBASE_CHAT_KEY)
          .doc(doc.id)
          .collection('msg')
          .orderBy('createdAt', 'asc')
          .get()
          .then(snapshot => {
            snapshot.forEach(eachMessage => {
              // chatMesasges.push(eachMessage.data());
            });
            if (chatMesasges.length) {
              setAllMsg(chatMesasges);
            }
            setIsLoading(false);
          });
        getRealTimeMessages();
      });
    } catch (error) {
      console.log('🚀 Error in getMsgs:', error);
      setIsLoading(false);
    }
  }, [chatroomid, selectedUserdata?.id]);

  const getRealTimeMessages = useCallback(async () => {
    const userId = selectedUserdata?.id;
    const isChatExist = getSavedCollectionId(chatCollectionIdRef);

    if (!userId || !isChatExist) return;

    try {
      const unsubscribeChatDetails = firestore()
        .collection(FIREBASE_CHAT_KEY)
        .doc(isChatExist)
        .onSnapshot(res => {
          chatRoomDetailsRef.current = res?.data();
        });

      const unsubscribeMessages = firestore()
        .collection(FIREBASE_CHAT_KEY)
        .doc(isChatExist)
        .collection('msg')
        .orderBy('createdAt', 'desc')
        .onSnapshot(
          res => {
            const nextMsg = [];

            res.forEach(doc => {
              const data = doc.data();

              if (
                data.createdAt &&
                typeof data.createdAt.toDate === 'function'
              ) {
                nextMsg.push({
                  _id: data._id || doc.id,
                  text: data.text || '',
                  createdAt: data.createdAt.toDate(),
                  user: {
                    _id: data.user?._id,
                    name: data.user?.name || 'Unknown',
                    avatar: data.user?.avatar || '',
                  },
                  image: data.image || null,
                  video: data.video || null,
                });
              }
            });

            if (nextMsg.length > 0 && nextMsg[0]?.createdAt) {
              setAllMsg(nextMsg);
              setIsLoading(false);
            }
          },
          err => {
            console.log('🚀 Error in Firestore onSnapshot:', err);
          },
        );

      return () => {
        unsubscribeChatDetails();
        unsubscribeMessages();
      };
    } catch (error) {
      console.log('🚀 Error in getRealTimeMessages:', error);
    }
  }, [selectedUserdata?.id]);

  const handleSent = async (msg, pic) => {
    const textMessage = msg[0]?.text || '';
    const isChatExist = getSavedCollectionId(chatCollectionIdRef);
    const userId = userData?.id;
    if (!userId || !isChatExist || (!textMessage && !pic)) return;

    setMsgSendLoading(true);
    const uploadedMedia = pic ? await UploadImageOnFirebase(pic) : null;

    const payload = {
      _id: firestore().collection(FIREBASE_CHAT_KEY).doc().id,
      text: textMessage,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: userId,
        name: userData?.name || 'Unknown',
        avatar: userData?.profilePic || '',
      },
      image: uploadedMedia?.uri ? uploadedMedia?.uri : null,
      video: pic?.type?.startsWith('video') ? uploadedMedia : null,
    };
    let chatRoomObj = {
      lastMsg: textMessage == '' ? 'attachment' : textMessage,
      createdAt: firestore.FieldValue.serverTimestamp(),
      senderunredmsg: unreadmsg,
      isRead: false,
      senderId: userId,
      reciverId: selectedUserdata?.id,
    };

    chatRoomObj[selectedUserdata?.id] = firestore.FieldValue.increment(1);

    try {
      firestore()
        .collection(FIREBASE_CHAT_KEY)
        .doc(isChatExist)
        .set({...chatRoomObj}, {merge: true})
        .then(res => {
          firestore()
            .collection(FIREBASE_CHAT_KEY)
            .doc(isChatExist)
            .collection('msg')
            .add(payload);
        });
      setTextMessage('');
      setPhoto(null);

     await handleSendNotification(
        dispatch,
        selectedUserdata?.id,
        userData?.name,
        textMessage == '' ? 'attachment' : textMessage,
      );

      if (sendmodal) {
        setSendModal(false);
      }
      setMsgSendLoading(false);
    } catch (error) {
      setMsgSendLoading(false);
      console.log('🚀 ~ file: index.js ~ line 69 ~ handleSent ~ error', error);
    }
  };

  const renderTicks = currentMessage => {
    return (
      <View style={{alignSelf: 'flex-end'}}>
        {currentMessage.loading ? (
          <ActivityIndicator size="small" color={Colors.White} />
        ) : currentMessage.isfailed ? (
          <VectorIcon
            color={Colors.Red}
            size={ms(18)}
            name="alert-circle-outline"
            type="Ionicons"
          />
        ) : (
          <VectorIcon
            color={Colors.White}
            size={ms(18)}
            name="checkmark-done"
            type="Ionicons"
          />
        )}
      </View>
    );
  };

  const onLongPress = msg => {
    Clipboard.setString(msg);
    toast.show('Message copied to clipboard');
  };

  const renderBubble = props => {
    const {currentMessage} = props;

    return (
      <Bubble
        {...props}
        onLongPress={() => onLongPress(currentMessage.text)}
        renderTicks={() => renderTicks(currentMessage)}
        wrapperStyle={{
          right: {
            backgroundColor: '#FFC107',
            borderRadius: 10,
            padding: width * 0.015,
            marginBottom: 5,
          },
          left: {
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            padding: width * 0.015,
            marginBottom: 5,
          },
        }}
        textStyle={{
          right: {
            color: '#FFF',
          },
          left: {
            color: '#000',
          },
        }}
      />
    );
  };

  const onSend = useCallback((messages = []) => {
    if (!messages.length) return;

    const messagesWithLoading = messages.map(message => ({
      ...message,
      loading: true,
    }));

    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, messagesWithLoading),
    // );

    // setTimeout(() => {
    //   setMessages(previousMessages =>
    //     previousMessages.map(msg =>
    //       msg._id === messagesWithLoading[0]._id
    //         ? {...msg, loading: false}
    //         : msg,
    //     ),
    //   );
    // }, 2000);
  }, []);

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputContainer}
      />
    );
  };

  const renderSendButton = props => (
    <TouchableOpacity onPress={() => props.onSend({text: props.text}, true)}>
      {msgsendloading ? (
        <ActivityIndicator size={'small'} color={Colors.DarkYellow} />
      ) : (
        <VectorIcon
          color={Colors.DarkYellow}
          size={ms(24)}
          name="send"
          type="MaterialIcons"
        />
      )}
    </TouchableOpacity>
  );

  const handleCameraPicker = async () => {
    const image = await TakeCameraPicture();
    if (image) {
      handleSent([], image);
    }
    // setMessages(previousMessages =>
    //   GiftedChat.append(previousMessages, [newMessage]),
    // );

    // setTimeout(() => {
    //   setMessages(previousMessages =>
    //     previousMessages.map(msg =>
    //       msg._id === newMessage._id ? {...msg, loading: false} : msg,
    //     ),
    //   );
    // }, 5000); // Simulate a delay
  };

  const handleImagePicker = async () => {
    const image = await PickImageFromGallery();
    if (image) {
      handleSent([], image);
    }
  };

  const renderActions = props => {
    return (
      <Actions
        {...props}
        options={{
          ['Camera']: handleCameraPicker,
          ['Gallery']: handleImagePicker,
        }}
        icon={() => (
          <VectorIcon
            color={Colors.Yellow}
            size={ms(23)}
            name="photo-library"
            type="MaterialIcons"
          />
        )}
        onSend={args => console.log(args, 'args')}
      />
    );
  };

  const scrollToBottomComponent = () => (
    <VectorIcon
      color={Colors.more_black[800]}
      size={ms(12)}
      name="angle-dobule-down"
      type="Fontisto"
    />
  );

  const openDialer = phoneNumber => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          Alert.alert(
            'Dialer Not Supported',
            'Phone calling is not supported on this device.',
          );
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('Error opening dialer:', err));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.App_Background} />
      {/* <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}> */}
      {/* Header */}
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
              source={{
                uri:
                  selectedUserdata?.profile ?? Images.iconsource.dummyuserimage,
              }}
              style={styles.profileImage}
            />
            <View>
              <Text
                style={
                  styles.profileName
                }>{`${selectedUserdata.first_name} ${selectedUserdata.last_name}`}</Text>
            </View>
          </View>
        </View>
        <ButtonView
          onPress={() => {
            openDialer(selectedUserdata?.phone);
          }}>
          <VectorIcon
            type="FontAwesome"
            name="phone"
            color={Colors.Black_21}
            size={Fonts.size.size_25}
          />
        </ButtonView>
      </View>

      {/* GiftedChat */}
      <View style={styles.chatList}>
        <GiftedChat
          showUserAvatar={false}
          showAvatarForEveryMessage={false}
          renderAvatar={null}
          renderSend={renderSendButton}
          messages={allMsg || []}
          onSend={messages => handleSent(messages)}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderActions}
          isCustomViewBottom={true}
          user={{
            _id: userData?.id,
          }}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
        />
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default App;
