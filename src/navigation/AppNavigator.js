import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import EditSubject from '../screens/subject/EditSubject';
import Home from '../screens/subject/Home';
import EditQuiz from '../screens/quiz/EditQuiz';
import TabNavigation from './TabNavigation';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="EditQuiz" component={EditQuiz} />
        <Stack.Screen name="EditSubject" component={EditSubject} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigator;