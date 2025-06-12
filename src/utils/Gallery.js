import PermissionUtil from './PermissionUtil';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Alert, Linking } from 'react-native';

export const TakeCameraPicture = media => {
  return new Promise((resolve, reject) => {
    const options = {
      mediaType: media ? 'video' : 'photo',
      presentationStyle: 'fullScreen',
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      selectionLimit: 1,
      storageOptions: {
        skipBackup: true,
        path: 'image',
      },
      videoStabilizationMode: 'auto',
    };

    PermissionUtil.checkPermission(PermissionUtil.types.CAMERA, () => {
      launchCamera(options, response => {
        console.log("🚀 ~ PermissionUtil.checkPermission ~ response:", response)
        if (response.didCancel) {
          reject('User cancelled media capture');
        } else if (response.errorCode) {
          reject(`Image Picker Error: ${response.errorCode}`);
        } else {
          const asset = response?.assets?.[0];
          if (asset) {
            resolve({
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName || (media ? 'video.mp4' : 'image.jpg'),
            });
          } else {
            reject('No media captured');
          }
        }
      });
    });
  });
};

export const PickImageFromGallery = media => {
  return new Promise((resolve, reject) => {
    const mediaType = media ? 'video' : 'photo';

    const options = {
      mediaType,
      selectionLimit: 1,
      presentationStyle: 'popover',
      storageOptions: {
        skipBackup: true,
        path: media ? 'video' : 'image',
      },
    };

    if (!media) {
      options.quality = 0.7;
      options.maxWidth = 720;
      options.maxHeight = 720;
    } else {
      options.videoQuality = 'medium';
    }

    PermissionUtil.checkPermission(PermissionUtil.types.GALLERY, () => {
      launchImageLibrary(options, response => {
        console.log("🚀 ~ PermissionUtil.checkPermission options ~ response:", response)

        if (response.didCancel) {
          // alertLimitedAccess();
          reject('User cancelled image picker');
        } else if (response.errorCode) {
          handleError(response.errorCode, reject);
        } else {
          const asset = response?.assets?.[0];
          if (asset) {
            resolve({
              uri: asset.uri,
              type: asset.type,
              name: asset.fileName,
            });
          } else {
            // alertLimitedAccess();
            reject('No file selected');
          }
        }
      });
    });
  });
};

// Helper Function to Handle Errors
const handleError = (errorCode, reject) => {
  if (errorCode === 'camera_unavailable') {
    console.log('Camera is not available on this device');
    reject('Camera is not available on this device');
  } else if (errorCode === 'permission') {
    console.log('Permission not granted');
    alert(
      'You need to grant permissions to access the library or camera. Please enable them in settings.',
    );
    reject('Permission not granted');
  } else {
    console.log(`Unknown error: ${errorCode}`);
    reject(`Unknown error: ${errorCode}`);
  }
};

// Helper Function for Limited Access Alert
const alertLimitedAccess = () => {
  Alert.alert(
    'Limited Access',
    'You have allowed limited access to photos. Please select photos from your allowed list or enable full access in your device settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Open Settings',
        onPress: () => Linking.openSettings(),
      },
    ],
  );
};





