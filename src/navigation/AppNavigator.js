import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TasksScreen from '../screens/TasksScreen';
import AddOrEditTaskScreen from '../screens/AddOrEditTaskScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="TasksScreen"
          component={TasksScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddOrEditTaskScreen"
          component={AddOrEditTaskScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
