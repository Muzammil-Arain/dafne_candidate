/** @format */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {screenOptions} from '../../config';
import {StackNav} from '../../stackkeys';
import {StackRoute} from '../../../screen';

const Stack = createStackNavigator();
function InterViewStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen
        name={StackNav.Projects}
        options={{
          headerShown: false,
        }}
        component={StackRoute.Projects}
      />
      <Stack.Screen
        name={StackNav.Interview}
        component={StackRoute.Interview}
      />
      <Stack.Screen
        name={StackNav.JobDescription}
        component={StackRoute.JobDescription}
      />
      <Stack.Screen
        name={StackNav.InterviewInvitations}
        component={StackRoute.InterviewInvitations}
      />
      <Stack.Screen
        name={StackNav.ProjectNotifications}
        component={StackRoute.ProjectNotifications}
      />
    </Stack.Navigator>
  );
}
function NotificationStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen
        name={StackNav.Notifications}
        component={StackRoute.Notifications}
      />
    </Stack.Navigator>
  );
}
function ProfileStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen
        name={StackNav.Profile}
        component={StackRoute.Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={StackNav.WebViewScreen}
        component={StackRoute.WebViewScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name={StackNav.MyBackground}
        component={StackRoute.MyBackground}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
function ChatStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen name={StackNav.Chat} component={StackRoute.Chat} />
    </Stack.Navigator>
  );
}

function MoreStack() {
  return (
    <Stack.Navigator {...{screenOptions}}>
      <Stack.Screen name={StackNav.More} component={StackRoute.More} />
      <Stack.Screen name={StackNav.Setting} component={StackRoute.Setting} />
      <Stack.Screen
        name={StackNav.TermsandConditionScreen}
        component={StackRoute.TermsandConditionScreen}
      />
      <Stack.Screen
        name={StackNav.ChangePassword}
        component={StackRoute.ChangePassword}
      />
    </Stack.Navigator>
  );
}

export {InterViewStack, MoreStack, ProfileStack, ChatStack, NotificationStack};
