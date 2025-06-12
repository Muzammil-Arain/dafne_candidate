// firebaseUtils.js
import firestore from '@react-native-firebase/firestore';

/**
 * @param {string} clientName - The client's name (used as document ID)
 * @param {object} fileObject - Object containing file data (name, type, base64, uploadedAt)
 */
export const saveFileToFirestore = async (clientName, fileObject) => {
  try {
    await firestore()
      .collection('clients')
      .doc(clientName)
      .collection('documents')
      .add(fileObject);

    console.log("✅ File saved to Firestore successfully");
  } catch (error) {
    console.error("❌ Firestore upload failed:", error.message);
  }
};
