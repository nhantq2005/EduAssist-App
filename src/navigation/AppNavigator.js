import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import EditSubject from '../screens/subject/EditSubject';
import Home from '../screens/subject/Home';
import EditQuiz from '../screens/quiz/EditQuiz';
import TabNavigation from './TabNavigation';
import Subject from '../screens/subject/Subject';
import Chat from '../screens/chat/Chat';
import TakeQuiz from '../screens/quiz/TakeQuiz';
import QuizResult from '../screens/quiz/QuizResult';
import Question from '../screens/question/Question';
import EditDocument from '../screens/document/EditDocument';
import DocumentView from '../screens/document/DocumentView';
import EditQuestion from '../screens/question/EditQuestion';
import QuizAttempt from '../screens/quiz/QuizAttempt';
import EditUser from '../screens/auth/EditUser';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigation" component={TabNavigation} />
        <Stack.Screen name="TakeQuiz" component={TakeQuiz} />
        <Stack.Screen name="QuizResult" component={QuizResult} />
        <Stack.Screen name="EditQuiz" component={EditQuiz} />
        <Stack.Screen name="EditSubject" component={EditSubject} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Subject" component={Subject} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="EditDocument" component={EditDocument} />
        <Stack.Screen name="DocumentView" component={DocumentView} />
        <Stack.Screen name="EditQuestion" component={EditQuestion} />
        <Stack.Screen name="QuizAttempt" component={QuizAttempt} />
        <Stack.Screen name="EditUser" component={EditUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default AppNavigator;