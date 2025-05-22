// @flow
import React from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {View, StatusBar, ActivityIndicator, Image} from 'react-native';
// import {getRequestFlag} from '../../ducks/requestFlags';
import {Colors} from '../../theme';
import styles from './styles';
import { getRequestFlag } from '../../ducks/requestFlags';

const Loader = ({type, showSpinner, showLoading}) => {
  const requestFlags = useSelector(getRequestFlag(type));
  // const requestFlags = false;
  const loading = requestFlags.loading || false;

  return loading || showLoading ? (
    <View>
      <StatusBar networkActivityIndicatorVisible={loading} />
      <Modal
        backdropTransitionOutTiming={0}
        style={styles.modal}
        backdropOpacity={showSpinner ? 0.4 : 0.1}
        animationIn="fadeIn"
        animationOut="fadeOut"
        isVisible={loading || showLoading}>
        <View style={styles.container}>
          {showSpinner && (
            <ActivityIndicator animating size="large" color={Colors.DarkYellow} />
          )}
        </View>
      </Modal>
    </View>
  ) : null;
};

Loader.propTypes = {
  requestFlags: PropTypes.object,
  showSpinner: PropTypes.bool,
};

Loader.defaultProps = {requestFlags: {}, showSpinner: true};

export default React.memo(Loader);
