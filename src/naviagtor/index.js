// lib import
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// local import
import {screenOptions} from './config';
import {NavigationService} from '../utils';
import {getUserToken} from '../ducks/user';

//screens import
import {StackRoute} from '../screen';
import {StackNav} from './stackkeys';
import BottomTab from './bottom';
import {loginAccessToken, sessionMantainAccessToken} from '../ducks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {preloadGetAPIs} from '../utils/preloadGetAPIs';

const Stack = createStackNavigator();

function StackScreens(loginUser) {
  const isUserExist = useSelector(sessionMantainAccessToken);

  return (
    <Stack.Navigator
      initialRouteName={isUserExist ? 'AppStack' : 'Welcome'}
      {...{screenOptions}}>
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
        name={StackNav.GiftChat}
        component={StackRoute.GiftChat}
        options={{headerShown: false}}
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
        options={{headerShown: true, gestureEnabled: false}}
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
       options={{headerShown: true, gestureEnabled: false}}
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
        name={StackNav.ProjectNotifications}
        component={StackRoute.ProjectNotifications}
        options={{headerShown: true}}
      />
       <Stack.Screen
        name={StackNav.TermsandConditionScreen}
        component={StackRoute.TermsandConditionScreen}
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
      <Stack.Screen
        name={StackNav.Setting}
        component={StackRoute.Setting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={StackNav.ChangePassword}
        component={StackRoute.ChangePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const AppContainer = () => {
  const [loginUser, setLoginUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLoginData = async () => {
      const loginuser = await AsyncStorage.getItem('LOGIN');
      if (loginUser == 'AppStack') {
        // preloadGetAPIs(dispatch);
        setLoginUser(loginuser);
      }
    };
    fetchLoginData();
  }, []);

  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <StackScreens loginUser={loginUser} />
    </NavigationContainer>
  );
};

export default AppContainer;
