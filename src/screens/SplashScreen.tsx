import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../theme/colors';

// Splash shown while restoring auth
export const SplashScreen = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <ActivityIndicator size="large" color={colors.primary} />
  </View>
);