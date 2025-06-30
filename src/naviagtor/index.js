// lib import
import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// local import
import DrawerNavigator from './drawer';
import {screenOptions} from './config';
import {NavigationService} from '../utils';
import {getUserToken} from '../ducks/user';

//screens import
import {StackRoute} from '../screen';
import {StackNav} from './stackkeys';
import BottomTab from './bottom';

const Stack = createStackNavigator();

function StackScreens() {
  const isUserExist = useSelector(getUserToken);
  return (
    <Stack.Navigator initialRouteName={'Welcome'} {...{screenOptions}}>
      <Stack.Screen
        name="AppStack"
        options={{
          headerShown: false,
        }}
        component={BottomTab}
      />
      <Stack.Screen
        name={StackNav.Login}
        component={StackRoute.Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.EditProfile}
        component={StackRoute.EditProfile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.Welcome}
        component={StackRoute.Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.SignUp}
        component={StackRoute.SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.Terms}
        component={StackRoute.Terms}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.VerifyOtp}
        component={StackRoute.VerifyOtp}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name={StackNav.ForgotPassword}
        component={StackRoute.ForgotPassword}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.ResetPassword}
        component={StackRoute.ResetPassword}
        options={{headerShown: true}}
      />

      {/* APP STACK  */}
      <Stack.Screen
        name={StackNav.CompleteProfile}
        component={StackRoute.CompleteProfile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.ProjectName}
        component={StackRoute.ProjectName}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.SelectOne}
        component={StackRoute.SelectOne}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.What}
        component={StackRoute.What}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.AuthProfile}
        component={StackRoute.AuthProfile}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name={StackNav.Where}
        component={StackRoute.Where}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.UploadProfile}
        component={StackRoute.UploadProfile}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.AuthPictureUpload}
        component={StackRoute.AuthPictureUpload}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.AuthVideoUpload}
        component={StackRoute.AuthVideoUpload}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.Profile}
        component={StackRoute.Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.Projects}
        component={StackRoute.Projects}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.Notifications}
        component={StackRoute.Notifications}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.Chat}
        component={StackRoute.Chat}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.Interview}
        component={StackRoute.Interview}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.More}
        component={StackRoute.More}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.CreateProject}
        component={StackRoute.CreateProject}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.CreateProjectDetails}
        component={StackRoute.CreateProjectDetails}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={StackNav.Message}
        component={StackRoute.Message}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.InterviewInvitations}
        component={StackRoute.InterviewInvitations}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.ProjectDescription}
        component={StackRoute.ProjectDescription}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const AppContainer = () => {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <StackScreens />
    </NavigationContainer>
  );
};

export default AppContainer;
