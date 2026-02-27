import React, { useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../theme/colors';
import { ScreenWrapper } from '../../components/screenWrapper';
import { Button } from '../../components/button';

export const HomeScreen = () => {
  const { user, logout } = useContext(AuthContext);

  // Logout confirmation
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();

            showMessage({
              message: 'Logged out successfully',
              type: 'success',
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome 👋</Text>

        <Text style={styles.infoText}>
          Name: {user?.name}
        </Text>

        <Text style={styles.infoText}>
          Email: {user?.email}
        </Text>

        <View style={styles.logoutContainer}>
          <Button
            title="Logout"
            type="danger"
            onPress={handleLogout}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  welcome: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 20,
  },

  infoText: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  logoutContainer: {
    marginTop: 30,
    width: '100%',
  },
});