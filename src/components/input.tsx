import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@react-native-vector-icons/ionicons';

export const Input = ({
  placeholder,
  error,
  secureTextEntry,
  value,
  onChangeText,
}: any) => {
  const [secure, setSecure] = useState(secureTextEntry);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrapper,
          error && { borderColor: colors.danger },
        ]}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secure}
          placeholderTextColor={colors.textSecondary}
          style={styles.input}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setSecure(!secure)}
            style={styles.iconWrapper}
          >
            <Ionicons name={secure ? "eye" : "eye-off"} color={colors.textSecondary} size={20} />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
  },
  iconWrapper: {
    paddingHorizontal: 8,
  },
  errorText: {
    color: colors.danger,
    marginTop: 4,
    fontSize: 13,
  },
});