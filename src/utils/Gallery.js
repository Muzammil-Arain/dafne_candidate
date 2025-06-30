import PermissionUtil from './PermissionUtil';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const TakeCameraPicture = (media) => {
  return new Promise((resolve, reject) => {
    const mediaType = media === true ? 'video' : 'image'; 
    const options = {
      title: 'Select Image',
      maxWidth: 720,
      maxHeight: 720,
      mediaType: mediaType, 
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path:mediaType,
      },
    };

    PermissionUtil.checkPermission(PermissionUtil.types.CAMERA, () => {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          reject('User cancelled image picker');
        } else if (response.error) {
          console.log(`ImagePicker Error: ${response.error}`);
          reject(`ImagePicker Error: ${response.error}`);
        } else if (response.customButton) {
          alert(response.customButton);
        } else {
          const asset = response?.assets?.[0];
          if (asset) {
            console.log('Image selected:', asset);
            resolve({
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName,
            });
          } else {
            console.log('No image selected');
            reject('No image selected');
          }
        }
      });
    });
  });
};

export const PickImageFromGallery = (media) => {
  return new Promise((resolve, reject) => {
    const mediaType = media === true ? 'video' : 'image'; 
    const options = {
      title: 'Select Image',
      maxWidth: 720,
      maxHeight: 720,
      mediaType: mediaType, 
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: mediaType,
      },
    };

    PermissionUtil.checkPermission(PermissionUtil.types.PHOTO_LIBRARY, () => {
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          reject('User cancelled image picker');
        } else if (response.error) {
          console.log(`ImagePicker Error: ${response.error}`);
          reject(`ImagePicker Error: ${response.error}`);
        } else if (response.customButton) {
          alert(response.customButton);
        } else {
          const asset = response?.assets?.[0];
          if (asset) {
            console.log('Image selected:', asset);
            resolve({
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName,
            });
          } else {
            console.log('No image selected');
            reject('No image selected');
          }
        }
      });
    });
  });
};
