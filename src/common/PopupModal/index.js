import React from 'react';
import AppButton from '../AppButton';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {Colors, Fonts} from '../../theme';
import {ScaledSheet} from 'react-native-size-matters';

const PopupModal = ({
  onClose,
  title,
  content,
  children,
  GifEnable,
  GifStyle,
  GifSource,
  // ButtonTitle = 'Close',
  ButtonTitle,
  showButtons,
  description,
  LottieStyle,
  LottieSource,
  LottieEnable,
  ButtonTitleOne,
  ButtonTitleTwo,
  ButtonOnePress,
  ButtonTwoPress,
  childrenStyle,
  isModalVisible,
  ShowActivityIndicator,
  ButtonLoading,
  ButtonOneLoading,
  ButtonTwoLoading,
}) => {
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={600}
      animationOutTiming={600}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {LottieEnable && (
            <Lottie
              loop
              autoPlay
              source={LottieSource}
              style={[LottieStyle, styles.lottieStyle]}
            />
          )}
          {GifEnable && (
            <Image
              source={GifSource}
              resizeMode="contain"
              style={[GifStyle, styles.gifStyle]}
            />
          )}
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{content}</Text>
          {description && (
            <Text style={styles.modalDescription}>{description}</Text>
          )}
          {children && <View style={childrenStyle}>{children}</View>}
          <View style={styles.buttonContainer}>
            {ButtonTitle && (
              <AppButton
                isloading={ButtonLoading}
                onPressButton={onClose}
                btnTextStyle={styles.btnTextStyle}
                title={ButtonTitle}
                btnViewStyle={styles.btnViewStyle}
              />
            )}
            {showButtons && (
              <View style={styles.flexViewStyle}>
                <AppButton
                  isloading={ButtonOneLoading}
                  title={ButtonTitleOne}
                  onPress={ButtonOnePress}
                  containerStyle={styles.flexBtnViewStyle}
                />
                <AppButton
                  isloading={ButtonTwoLoading}
                  title={ButtonTitleTwo}
                  ShowLinear={false}
                  onPress={ButtonTwoPress}
                  containerStyle={styles.flexBtnViewStyle}
                />
              </View>
            )}
            {ShowActivityIndicator && (
              <ActivityIndicator size="large" color={Colors.BlueColor} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(PopupModal);

const styles = ScaledSheet.create({
  modalContainer: {
    flex: 1,
    width: '100%',
    minHeight: '320@ms',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: '20@ms',
    borderRadius: '10@s',
  },
  modalTitle: {
    fontSize: '20@ms',
    textAlign: 'center',
    color: Colors.Black,
    fontFamily: Fonts.type.Mediu,
  },
  modalText: {
    fontSize: '13@ms',
    lineHeight: '22@ms',
    textAlign: 'center',
    fontFamily: Fonts.type.Roman,
    color: Colors.Black_8b,
  },
  modalDescription: {
    fontSize: '12@ms',
    lineHeight: '15@ms',
    textAlign: 'center',
    color: Colors.borderColor,
    textTransform: 'capitalize',
    marginBottom: '10@ms',
  },
  buttonContainer: {
    marginTop: '15@ms',
  },
  btnViewStyle: {
    height: '45@ms',
    borderRadius: '10@s',
    width: '60%',
    alignSelf: 'center',
  },
  flexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '-15@ms',
    justifyContent: 'space-between',
  },
  flexBtnViewStyle: {
    height: '40@ms',
    borderRadius: 100,
    width: '115@ms',
    alignSelf: 'center',
  },
  lottieStyle: {
    alignSelf: 'center',
  },
  gifStyle: {
    alignSelf: 'center',
  },
  btnTextStyle: {
    fontSize: '15@ms',
  },
});
