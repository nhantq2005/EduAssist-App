import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { MyUserProvider } from './src/utils/providers/MyUserProvider';

const App = () => {
  return (
    <MyUserProvider>
      <AppNavigator />
    </MyUserProvider>
  );
};

export default App;
