import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';
import { Ionicons } from '@react-native-vector-icons/ionicons';

interface Props {
  title: string;
  onBack?: () => void;
}

export const Header = ({ title, onBack }: Props) => {
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.left}>
        {onBack && (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backBtn}
            activeOpacity={0.7}
          >
            <Ionicons name={"chevron-back"} color={colors.black} size={22} />
          </TouchableOpacity>
        )}
      </View>

      {/* Title (Always Centered) */}
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Spacer */}
      <View style={styles.right} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },

  left: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  center: {
    flex: 1,
    alignItems: 'center',
  },

  right: {
    width: 60,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderWidth: 0.5,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  backIcon: {
    fontSize: 22,
    color: colors.primary,
    lineHeight: 24,
  },
});