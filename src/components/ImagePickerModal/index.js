import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

const ImagePickerModal = ({
  isVisible,
  onClose,
  onTakePhoto,
  onChooseFromGallery,
}) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Choose an Option</Text>
          <TouchableOpacity style={styles.optionButton} onPress={onTakePhoto}>
            <Text style={styles.optionText}>Open Camera </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={onChooseFromGallery}>
            <Text style={styles.optionText}>Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: Colors.White,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: Fonts.size.size_18,
    fontFamily: Fonts.type.Mediu,
    color: Colors.Black,
    marginBottom: 15,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.Yellow,
    marginBottom: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.Roman,
    color: Colors.White,
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 5,
    backgroundColor: Colors.gray,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: Fonts.size.size_16,
    fontFamily: Fonts.type.Roman,
    color: Colors.Black,
  },
});
