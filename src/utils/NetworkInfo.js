import NetInfo from '@react-native-community/netinfo';

import { updateNetWorkInfo } from '../ducks/network';
import datahandler from '../helper/datahandler';

let unsubscribe;
let timer;

function addNetInfoListener() {
  unsubscribe = NetInfo.addEventListener(state => {
    //remove old timer
    if (timer) {
      clearTimeout(timer);
    }

    // set timer for 1 seconds to remove duplicate actions
    timer = setTimeout(() => {
      const isInternetConnected = state.isConnected;

      if (isInternetConnected) {
        // do what ever you want to do if re-internet is connected
      }

      // set internet connected in datahandler
      datahandler.setInternetConnected(isInternetConnected);

      // set state in redux
      datahandler.dispatchAction(
        updateNetWorkInfo({ isNetworkConnected: isInternetConnected }),
      );
    }, 1000);
  });
}

function removeNetInfoListener(enable) {
  // clear subsribe
  if (unsubscribe) {
    unsubscribe();
  }
  // clear timer
  if (timer) {
    clearTimeout(timer);
  }
}

export default {
  addNetInfoListener,
  removeNetInfoListener,
};
