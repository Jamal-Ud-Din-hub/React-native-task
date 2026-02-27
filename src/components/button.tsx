import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'danger';
  loading?: boolean;
  disabled?: boolean;
}

export const Button = ({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
}: Props) => {
  const isDisabled = loading || disabled;

  const backgroundColor =
    type === 'danger'
      ? colors.danger
      : colors.primary;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor },
        isDisabled && styles.disabled,
      ]}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={colors.white}
        />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 45,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  text: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },

  disabled: {
    opacity: 0.7,
  },
});