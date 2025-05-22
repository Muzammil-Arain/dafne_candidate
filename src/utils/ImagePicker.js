/** @format */

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';

import {ActionSheetIOS, Platform, Alert} from 'react-native';
import {Util} from './index';
import PermissionUtil from './PermissionUtil';

class ImagePicker {
  // compress image size
  defaultCompressImageSize = 400;

  // default image quality
  defaultCompressImageQuality = 0.8;

  mimeTypes = {
    JPG: Platform.OS === 'ios' ? 'image/jpg' : 'image/jpeg',
    PNG: 'image/png',
    GIF: 'image/gif',
  };

  // default options gallery
  defaultGalleryOptions = {
    mediaType: 'photo',
    quality: this.defaultCompressImageQuality,
    maxWidth: this.defaultCompressImageSize,
    maxHeight: this.defaultCompressImageSize,
    selectionLimit: 1,
    includeExtra: false,
    cropping: false,
    croppingOptions: {},
  };

  // default options camera
  defaultCameraOptions = {
    mediaType: 'photo',
    cameraType: 'back',
    quality: this.defaultCompressImageQuality,
    maxWidth: this.defaultCompressImageSize,
    maxHeight: this.defaultCompressImageSize,
    cropping: false,
    croppingOptions: {},
  };

  // show alert message
  showAlert(message) {
    Util.showMessage(message, 'danger', 5000);
  }

  /**
   * Pick image from gallery
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *  1 ) selectionLimit
   *    a) 1 [default value] (can select single)
   *    b) 0 (can select multiple)
   *    c) any integer IOS ONLY (max files user can select)
   *  2 ) quality [default 0.8] (float from 0 to 1)
   *  3 ) maxWidth for compress [default 720] (int like 720)
   *  4 ) maxHeight for compress [default 720]  (int like 720)
   *  5 ) mimeTypesAllowed  array(mimeTypes) (for android) run node_moudles command for ios we will stop after
   *  6 ) includeExtra [default false] (Boolean true /false) (need extra gallery permission , we will have exif data of image )
   *  7 ) cropping [default false] (Boolean true/false) (only work for single image)
   *  8 ) croppingOptions
   *  (https://github.com/ivpusic/react-native-image-crop-picker) select options from here
   *
   * @return  single image object(selectionLimit=1) or array of images(selectionLimit=0)
   */
  pickImageFromGallery = async (callback, options = {}) => {
    // set gallery options
    const galleryOptions = {
      ...this.defaultGalleryOptions,
      ...options,
    };

    // check if permission is required
    if (galleryOptions.includeExtra) {
      PermissionUtil.checkPermission(PermissionUtil.types.GALLERY, () => {
        this.lanuchGallery(galleryOptions, callback);
      });
    } else {
      // lanuch direct gallery
      this.lanuchGallery(galleryOptions, callback);
    }
  };

  /**
   * Pick image from camera
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *  1 ) cameraType [default back] 'back' or 'front'. May not be supported in few android devices
   *  2 ) quality (for compress)[default 0.8] (float from 0 to 1)
   *  3 ) maxWidth (for compress) [default 720] (int like 720)
   *  4 ) maxHeight (for compress) [default 720]  (int like 720))
   *  5 ) cropping [default false] (Boolean true/false) (only work for single image)
   *  6 ) croppingOptions
   *  (https://github.com/ivpusic/react-native-image-crop-picker) select options from here
   *
   * @return  single image object
   */
  captureImageCamera = async (callback, options = {}) => {
    // check permission first
    console.log('captureImageCamera');
    PermissionUtil.checkPermission(PermissionUtil.types.CAMERA, async () => {
      // set camera options
      const cameraOptions = {
        ...this.defaultCameraOptions,
        ...options,
      };

      // lanuch camera
      const result = await launchCamera(cameraOptions);

      // result is ok and image is selected
      if (result.assets) {
        // single image selected
        const imageSelected = result.assets[0];

        // check if cropping is true
        if (cameraOptions.cropping) {
          this.cropImage(
            imageSelected,
            cameraOptions.croppingOptions,
            callback,
          );
        } else {
          // callback with image selected
          callback?.(imageSelected);
        }
      }
    });
  };

  /**
   * Pick image from gallery or capture image
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *  1 ) cameraType [camera] [default back] 'back' or 'front'. May not be supported in few android devices
   *  2 ) selectionLimit
   *    a) 1 [default value] (can select single)
   *    b) 0 (can select multiple)
   *    c) any integer IOS ONLY (max files user can select)
   *  2 ) quality (for compress)[default 0.8] (float from 0 to 1)
   *  3 ) maxWidth (for compress) [default 720] (int like 720)
   *  4 ) maxHeight (for compress) [default 720]  (int like 720)
   *  5 ) mimeTypesAllowed [gallery] array(mimeTypes) (for android) run node_moudles command for ios we will stop after
   *  6 ) includeExtra [gallery] [default false] (Boolean true /false) (need extra gallery permission , we will have exif data of image )
   *  7 ) cropping [default false] (Boolean true/false) (only work for single image)
   *  8 ) croppingOptions
   *  (https://github.com/ivpusic/react-native-image-crop-picker) select options from here
   *
   * @return  single image object
   */
  showGalleryAndCameraOptions = async (callback, options = {}) => {
    if (Platform.OS === 'ios') {
      // show options for ios
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Camera', 'Gallery'],
          cancelButtonIndex: 0,
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            this.captureImageCamera(callback, options);
          } else if (buttonIndex === 2) {
            this.pickImageFromGallery(callback, options);
          }
        },
      );
    } else {
      // show options for android
      Alert.alert('Select Option', '', [
        {
          text: 'Camera',
          onPress: () => {
            this.captureImageCamera(callback, options);
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            this.pickImageFromGallery(callback, options);
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
      ]);
    }
  };

  // lanuch Images from gallery
  lanuchGallery = async (galleryOptions, callback) => {
    // open image picker
    const result = await launchImageLibrary(galleryOptions);
    console.log('lanuchGallery', result);
    // result is ok and images are selected
    if (result.assets) {
      const imagesSelected = result.assets;

      // check image extension allowed
      const {mimeTypesAllowed} = galleryOptions;
      if (mimeTypesAllowed && mimeTypesAllowed.length > 0) {
        // loop through images to check have valid images
        let containInvalidImage = false;
        imagesSelected.forEach(imageItem => {
          if (!mimeTypesAllowed.includes(imageItem.type)) {
            containInvalidImage = true;
          }
        });
        // if we have invalid images show alert
        if (containInvalidImage) {
          this.showAlert('You have select an invalid Image');
          return;
        }
      }

      // if it is single selection
      if (galleryOptions.selectionLimit === 1) {
        // single image selected
        const imageSelected = imagesSelected[0];

        // check if cropping is true
        if (galleryOptions.cropping) {
          this.cropImage(
            imageSelected,
            galleryOptions.croppingOptions,
            callback,
          );
        } else {
          // callback with image selected
          callback?.(imageSelected);
        }
      } else {
        // callback with images array selected
        callback?.(imagesSelected);
      }
    }
  };

  // crop image
  cropImage = (image, croppingOptions, callback) => {
    // show cropper after 400 millseconds
    setTimeout(
      () => {
        ImageCropPicker.openCropper({
          path: image.uri,
          ...croppingOptions,
        })
          .then(cropped => {
            // image obj
            const imageObj = this.getImageObjectFromCropImage(cropped);
            // callback with image selected if issue in cropping
            callback?.(imageObj);
          })
          .catch(error => {
            // callback with image selected if issue in cropping
            callback?.(image);
          });
      },
      Platform.OS === 'ios' ? 500 : 0,
    );
  };

  // get crop image object
  getImageObjectFromCropImage(cropImage) {
    const uri = `file://${cropImage?.path ?? ''}`;
    const fileName = uri.replace(/^.*[\\\/]/, '');
    const extension = fileName.substr(fileName.lastIndexOf('.') + 1);

    return {
      fileSize: cropImage?.size ?? 0,
      height: cropImage?.height ?? 0,
      width: cropImage?.width ?? 0,
      uri: uri,
      type: `image/${extension}`,
      fileName: fileName,
    };
  }
}

export default new ImagePicker();
