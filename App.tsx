import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import FlashMessage from 'react-native-flash-message';

const App = () => (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar barStyle={'dark-content'} />
          <AppNavigator />
          <FlashMessage position="top" style={styles.flashMessage} />
      </NavigationContainer>
    </AuthProvider>
);

export default App;

const styles = StyleSheet.create({
  flashMessage: {
    marginTop: 50,
    borderRadius: 8,
    marginHorizontal: 20,
  },
});
