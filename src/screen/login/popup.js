import React, {useState} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Colors } from '../../theme';
import { ScaledSheet } from 'react-native-size-matters';

const AccountReviewModal = ({visible, onClose}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Your account is in review</Text>
          <Text style={styles.message}>
            We're currently reviewing your account. You’ll be notified once the
            review is complete.
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AccountReviewModal;

const styles = ScaledSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '20@ms',
    alignItems: 'center',
  },
  title: {
    fontSize: '18@ms',
    fontWeight: 'bold',
    marginBottom: '10@ms',
    textAlign: 'center',
    color:Colors.Black
  },
  message: {
    fontSize: '14@ms',
    textAlign: 'center',
    marginBottom: '20@ms',
    color: '#666',
  },
  button: {
    backgroundColor: Colors.DarkYellow,
    paddingHorizontal: '20@ms',
    paddingVertical: '10@ms',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
