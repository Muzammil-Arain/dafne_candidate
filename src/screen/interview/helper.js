import firestore from '@react-native-firebase/firestore';
import { FIREBASE_CHAT_KEY } from '../../config/AppConfig';

export const createOrFetchChatroom = async (user1Id, user2Id,projectname) => {
  try {
    // Create a unique chatroom ID based on user IDs
    const chatroomId =
      user1Id < user2Id ? `${user1Id}_${user2Id}` : `${user2Id}_${user1Id}`;
    const chatroomRef = firestore().collection(FIREBASE_CHAT_KEY).doc(chatroomId);

    const doc = await chatroomRef.get();

    if (doc.exists) {
      console.log('Chatroom already exists');
    } else {
      await chatroomRef.set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        users: [user1Id, user2Id],
        unReadCount: 0,
        isRead: true,
        isBlocked: false,
        blockedBy: [],
        project_name:projectname,
        chatroomid: chatroomId,
      });

      console.log('ChatRoom created!');
    }

    return chatroomId;
  } catch (error) {
    console.error('Error creating/fetching chatroom:', error);
  }
};
