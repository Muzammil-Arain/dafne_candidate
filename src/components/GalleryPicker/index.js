/** @format */

import React, {useImperativeHandle, useState} from 'react';
import {Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {ButtonView} from '../../components';
import styles from './styles';

const Item = ({item, onPress, key}) => {
  return (
    <ButtonView
      key={key}
      style={styles.buttonStyle}
      onPress={() => {
        onPress(item.text);
      }}>
      <Text style={[styles.textStyle]}>{item.text}</Text>
    </ButtonView>
  );
};

const GalleryPicker = (props, forwardedRef) => {
  const {onPress} = props;
  const [data, setData] = useState({
    data: [],
    isVisible: false,
    title: undefined,
    onPress: () => {},
  });

  // hide modal function
  const hideModal = () => {
    setData({...data, isVisible: false});
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (options = data) => {
      setData({...options, isVisible: true, title: 'Total Amount'});
    },
    hide: hideModal,
  }));

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={() => hideModal()}
      isVisible={data.isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={styles.mainContainer}>
      <View>
        <View style={[styles.itemContainer]}>
          {data.data?.map((item, index) => (
            <React.Fragment key={item.identifier}>
              <Item
                key={index}
                item={item}
                onPress={item => {
                  hideModal();
                  setTimeout(() => {
                    data.onPress && data.onPress(item);
                  }, 500);
                }}
              />
            </React.Fragment>
          ))}
          <ButtonView style={styles.cancelButton} onPress={() => hideModal()}>
            <Text style={[styles.textStyleCancel]}>Cancel</Text>
          </ButtonView>
        </View>
      </View>
    </Modal>
  );
};

export default React.forwardRef(GalleryPicker);
