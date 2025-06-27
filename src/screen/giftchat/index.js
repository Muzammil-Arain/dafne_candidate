import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Linking,
  Alert,
  Dimensions,
  ActivityIndicator,
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
import FastImageComponent from '../../components/FastImage';
import {handleSendNotification} from '../../utils/Notification';
import ImageViewing from 'react-native-image-viewing';
import {Image} from 'react-native';

const {width, height} = Dimensions.get('window');

const App = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const userData = useSelector(getUserData);
  const selectedUserdata = route?.params?.data;

  const chatroomid = route?.params?.chatroom_id;
  const projectName = route?.params?.projectName;
  const [allMsg, setAllMsg] = useState([]);
  const [sendmodal, setSendModal] = useState(false);
  const [msgsendloading, setMsgSendLoading] = useState(false);
  const [visible, setIsVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const chatCollectionIdRef = useRef();
  const chatRoomDetailsRef = useRef();
  const saveCollectionId = id => (chatCollectionIdRef.current = id);
  const getSavedCollectionId = chatref => chatref.current;

  const UploadImageOnFirebase = photo => {
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

  // useEffect(() => {
  //   // getMsgs();
  //   let unsubscribe;

  //   const initListeners = async () => {
  //     unsubscribe = await getRealTimeMessages();
  //   };

  //   return () => {
  //     if (unsubscribe) unsubscribe();
  //     chatCollectionIdRef.current = null;
  //     chatRoomDetailsRef.current = null;
  //   };
  // }, [navigation]);

  useEffect(() => {
    const getMessagesAndListen = async () => {
      const userId = selectedUserdata?.id;
      if (!userId || !chatroomid) return;

      const firstQueryResult = await firestore()
        .collection(FIREBASE_CHAT_KEY)
        .where('chatroomid', '==', chatroomid)
        .get();

      if (firstQueryResult.empty) {
        return;
      }

      const docId = firstQueryResult.docs[0].id;
      saveCollectionId(docId);

      // Set up real-time listener
      const unsubscribe = firestore()
        .collection(FIREBASE_CHAT_KEY)
        .doc(docId)
        .collection('msg')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const nextMsg = [];
          snapshot.forEach(doc => {
            const data = doc.data();
            if (data.createdAt?.toDate) {
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

          if (nextMsg.length > 0) {
            setAllMsg(nextMsg);

            // Reset unread count for current user if viewing
            firestore()
              .collection(FIREBASE_CHAT_KEY)
              .doc(docId)
              .update({
                [`unreadCount_${userData?.id}`]: 0,
              });
          }
        });

      // Save ref to unsubscribe
      chatRoomDetailsRef.current = unsubscribe;
    };

    getMessagesAndListen();

    return () => {
      if (chatRoomDetailsRef.current) chatRoomDetailsRef.current();
      chatCollectionIdRef.current = null;
      chatRoomDetailsRef.current = null;
    };
  }, [chatroomid, selectedUserdata?.id]);

  const getMsgs = useCallback(async () => {
    const userId = selectedUserdata?.id;
    if (!userId) return;
    try {
      let chatMesasges = [];

      const firstQueryResult = await firestore()
        .collection(FIREBASE_CHAT_KEY)
        .where('chatroomid', '==', chatroomid)
        .get();

      if (firstQueryResult.empty) {
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
          });
        getRealTimeMessages();
      });
    } catch (error) {
      console.log('🚀 Error in getMsgs:', error);
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
              const lastSenderId = nextMsg[0]?.user?._id;

              firestore()
                .collection(FIREBASE_CHAT_KEY)
                .doc(isChatExist)
                .update({
                  [`unreadCount_${userData?.id}`]: 'jjjjj',
                });
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
    const senderId = userData?.id;
    const receiverId = selectedUserdata?.id;

    if (!senderId || !isChatExist || (!textMessage && !pic)) return;

    setMsgSendLoading(true);
    const uploadedMedia = pic ? await UploadImageOnFirebase(pic) : null;

    const payload = {
      _id: firestore().collection(FIREBASE_CHAT_KEY).doc().id,
      text: textMessage,
      createdAt: firestore.FieldValue.serverTimestamp(),
      user: {
        _id: senderId,
        name: userData?.name || 'Unknown',
        avatar: userData?.profilePic || '',
      },
      image: uploadedMedia?.uri || null,
      video: pic?.type?.startsWith('video') ? uploadedMedia : null,
    };

    try {
      // ✅ update instead of set
      await firestore()
        .collection(FIREBASE_CHAT_KEY)
        .doc(isChatExist)
        .update({
          lastMsg: textMessage === '' ? 'attachment' : textMessage,
          createdAt: firestore.FieldValue.serverTimestamp(),
          senderId,
          reciverId: receiverId,
          [`unreadCount_${receiverId}`]: firestore.FieldValue.increment(1),
        });

      await firestore()
        .collection(FIREBASE_CHAT_KEY)
        .doc(isChatExist)
        .collection('msg')
        .add(payload);

      await handleSendNotification(
        dispatch,
        receiverId,
        projectName,
        textMessage === '' ? 'attachment' : textMessage,
        // {
        //   id: userData.id,
        //   profile: userData?.profile,
        //   project_name: projectName,
        //   screen_name: 'Chat',
        //   chatroom_id: chatroomid,
        // },
      );

      if (sendmodal) setSendModal(false);
      setMsgSendLoading(false);
    } catch (error) {
      setMsgSendLoading(false);
      console.log('🚀 ~ handleSent error', error);
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
            {/* <Image
              source={{
                uri:
                  selectedUserdata?.profile ?? Images.iconsource.dummyuserimage,
              }}
              style={styles.profileImage}
            /> */}
            <FastImageComponent
              uri={selectedUserdata?.profile ?? ''}
              style={styles.profileImage}
              resizeMode="cover"
              fallbackImage={Images.images.dummyprofile}
            />
            <View>
              <Text style={styles.profileName}>
                {projectName}
                {/* {`${selectedUserdata.first_name} ${selectedUserdata.last_name}`} */}
              </Text>
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
          renderMessageImage={props => (
            <TouchableOpacity
              onPress={() => {
                if (props?.currentMessage?.image) {
                  setImageUri(props?.currentMessage.image);
                  setIsVisible(true);
                }
              }}>
              <Image
                source={{uri: props.currentMessage.image}}
                style={{
                  width: ms(200),
                  height: ms(130),
                  borderRadius: 10,
                  marginBottom: ms(5),
                }}
              />
            </TouchableOpacity>
          )}
          renderInputToolbar={renderInputToolbar}
          renderActions={renderActions}
          isCustomViewBottom={true}
          user={{
            _id: userData?.id,
          }}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          textInputStyle={{
            color: Colors.Black,
          }}
        />
        <ImageViewing
          images={[{uri: imageUri}]}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default App;
