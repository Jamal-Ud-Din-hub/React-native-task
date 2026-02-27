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
import { signupSchema } from '../../schemas/authSchemas';
import { AuthContext } from '../../context/AuthContext';
import { Input } from '../../components/input';
import { showMessage } from 'react-native-flash-message';
import { colors } from '../../theme/colors';
import { ScreenWrapper } from '../../components/screenWrapper';
import { Button } from '../../components/button';
import { Header } from '../../components/header';

export const SignupScreen = ({ navigation }: any) => {
  
  const { signup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  // Signup submit handler
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await signup(data);
      showMessage({
        message: 'Signup successful!',
        type: 'success',
        icon: 'success',
      });
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
      <Header
        title="Signup"
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.description}>
            Signup to get started with your new account.
          </Text>

          {/* Name */}
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                placeholder="Name"
                value={field.value || ''}
                onChangeText={field.onChange}
                error={errors.name?.message}
              />
            )}
          />

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

          {/* Confirm Password */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Input
                placeholder="Confirm Password"
                secureTextEntry
                value={field.value || ''}
                onChangeText={field.onChange}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {/* Signup Button */}
          <Button
            title="Signup"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
          />

          {/* Login Navigation */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account? Login
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
  },
  title: {
    marginTop: 30,
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  description: {
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
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 14,
  },
});