import * as React from 'react';
import BottomTab from '../bottom';
import CustomDrawer from './CustomDrawer';
import {Colors, Metrics} from '../../theme';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {DrawerContentScrollView} from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();
function MyDrawer(props) {
  return (
    <View />
    // <DrawerContentScrollView
    //   contentContainerStyle={{flex: 1}}
    //   scrollEnabled={false}
    //   showsVerticalScrollIndicator={false}
    //   {...props}>
    //   <CustomDrawer {...props} />
    // </DrawerContentScrollView>
  );
}
// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       drawerContentContainerStyle={{DrawerContentScrollView: false}}
//       screenOptions={{
//         headerShown: false,
//         drawerType: 'front',
//         swipeEdgeWidth: 0,
//         swipeEnabled: false,
//         drawerStyle: {
//           width: Metrics.ratio(220),
//           backgroundColor: Colors.DrawerBg,
//         },
//       }}
//       drawerContent={props => <CustomDrawerContent {...props} />}
//       initialRouteName={'BottomTab'}
//       // initialRouteName={usertype}
//     >
//       <Drawer.Screen
//         color="white"
//         options={{
//           headerShown: false,
//           swipeEnabled: false,
//         }}
//         name="BottomTab"
//         component={BottomTab}
//       />
//     </Drawer.Navigator>
//   );
// }

export default MyDrawer;
