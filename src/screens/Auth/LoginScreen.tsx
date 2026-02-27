import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/authSchemas';
import { AuthContext } from '../../context/AuthContext';
import { Input } from '../../components/input';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../theme/colors';
import { ScreenWrapper } from '../../components/screenWrapper';
import { Button } from '../../components/button';
import { Header } from '../../components/header';

export const LoginScreen = ({ navigation }: any) => {
  
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  // Submit handler
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      showMessage({
        message: 'Login successful!',
        type: 'success',
        icon: 'success',
      });
      reset();
    } catch (err: any) {
      showMessage({
        message: err.message,
        type: 'danger',
        icon: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>

      <Header title="Login" />

      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >

          <Text style={styles.title}>Welcome!</Text>

          <Text style={styles.description}>
            Please login to continue using your account.
          </Text>

          {/* Email */}
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                placeholder="Email"
                value={field.value || ''}
                onChangeText={field.onChange}
                error={errors.email?.message}
              />
            )}
          />

          {/* Password */}
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                value={field.value || ''}
                onChangeText={field.onChange}
                error={errors.password?.message}
              />
            )}
          />

          {/* Login Button */}
          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
          />

          {/* Signup Navigation */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signup')
              // Clear form on navigation
              reset();
            }}
            style={styles.signupLink}
            activeOpacity={0.7}
          >
            <Text style={styles.signupText}>
              Don't have an account? Signup
            </Text>
          </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  description: {
    marginTop: 30,
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  signupLink: {
    marginTop: 20,
  },
  signupText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 14,
  },
});