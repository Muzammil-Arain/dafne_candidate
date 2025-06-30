import React from 'react';
import ImagePickerModal from '../ImagePickerModal';
import {PickImageFromGallery, TakeCameraPicture} from '../../utils/Gallery';

const HandleImagePicker = ({onImagePicked, onClose, media, modalVisible}) => {
  const handleTakePhoto = async () => {
    modalVisible = false;
    try {
      const image = await TakeCameraPicture(media);
      if (image) {
        // Only proceed if an image is successfully selected
        onImagePicked(image);
      } else {
        console.log('User cancelled the camera');
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleChooseFromGallery = async () => {
    modalVisible = false;
    try {
      const image = await PickImageFromGallery(media);
      if (image) {
        // Only proceed if an image is successfully selected
        onImagePicked(image);
      } else {
        console.log('User cancelled image picker from gallery');
      }
    } catch (error) {
      if (error.message === 'User cancelled image picker') {
        console.log('User cancelled the image picker');
      } else {
        console.error('Error picking image from gallery:', error);
      }
    }
  };

  return (
    <ImagePickerModal
      isVisible={modalVisible}
      onClose={onClose}
      onTakePhoto={handleTakePhoto}
      onChooseFromGallery={handleChooseFromGallery}
    />
  );
};

export default HandleImagePicker;
