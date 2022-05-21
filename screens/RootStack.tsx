import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import MainTab, {MainTabNavigationScreenParams} from './MainTab';
import WriteScreen from './WriteScreen';
import {Log} from '../contexts/LogContext';
import {RouteProp} from '@react-navigation/native';

type RootStackParamList = {
  MainTab: MainTabNavigationScreenParams;
  WriteScreen:
    | {
        log: Log;
      }
    | undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type WriteScreenRouteProp = RouteProp<RootStackParamList, 'WriteScreen'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WriteScreen"
        component={WriteScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default RootStack;
