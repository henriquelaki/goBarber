import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import AuthRoutes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar
      barStyle="light-content"
      translucent
      backgroundColor="transparent"
    />
    <AuthRoutes>
      <View style={{flex: 1, backgroundColor: '#312e38'}}>
        <AuthRoutes />
      </View>
    </AuthRoutes>
  </NavigationContainer>
);

export default App;
