/** @format */

import React from 'react';
import {Image, Text, Animated, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors, Images, Metrics} from '../../theme';
import {Util} from '../../utils';
import {styles} from './styles';
import {
  MoreStack,
  NotificationStack,
  ProfileStack,
  InterViewStack,
  ChatStack,
} from './Stacks';
import { ms } from 'react-native-size-matters';
import datahandler from '../../helper/datahandler';

const isDarkMode = datahandler.getAppTheme();
const {width, height} = Dimensions.get('window');

const navigationItemsFreelancer = [
  {
    label: 'Jobs',
    icon: Images.icon.footer_interview,
    component: InterViewStack,
    customIconStyles: {},
  },
  {
    label: 'Notifications',
    icon: Images.icon.footer_bell,
    component: NotificationStack,
    customIconStyles: {height: ms(26), width: ms(26)},
  },
  {
    label: 'Profile',
    icon: Images.icon.footer_profile,
    component: ProfileStack,
    customIconStyles: {},
  },
  {
    label: 'Chat',
    icon: Images.icon.footer_chat,
    component: ChatStack,
    customIconStyles: {},
  },
  {
    label: 'More',
    icon: Images.icon.footer_more,
    component: MoreStack,
    customIconStyles: {},
  },
];

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.DarkYellow,
        tabBarStyle: {
          height: Util.isPlatformIOS()
            ? height * 0.1
            : Metrics.ratio(80),
          backgroundColor: isDarkMode ? Colors.Black_21 : Colors.Whiite_FA,
        },
      }}>
      {navigationItemsFreelancer.map(
        ({label, icon, component, customIconStyles}) => {
          return (
            <Tab.Screen
              key={label}
              name={label}
              component={component}
              options={{
                headerShown: false,
                tabBarIcon: ({focused}) => (
                  <Animated.View
                    style={[
                      styles.iconContainer,
                      focused && styles.focusedIcon,
                    ]}>
                    <Image
                      source={icon}
                      resizeMode="contain"
                      style={[
                        styles.icon,
                        customIconStyles,
                        {
                          tintColor: focused
                            ? Colors.DarkYellow
                            : Colors.Black_57,
                        },
                      ]}
                    />
                  </Animated.View>
                ),
                tabBarLabel: ({focused}) => (
                  <Text
                    style={[
                      styles.labelFont,
                      {
                        color: focused ? Colors.DarkYellow : Colors.Black_57,
                      },
                    ]}>
                    {label}
                  </Text>
                ),
              }}
            />
          );
        },
      )}
    </Tab.Navigator>
  );
}
