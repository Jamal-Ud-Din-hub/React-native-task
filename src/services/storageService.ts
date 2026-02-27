import { createMMKV } from 'react-native-mmkv';
import { User } from '../types/user';

const USER_KEY = 'auth_user';
const ENCRYPTION_KEY = 'secret_key';

// Encrypted storage for user / tokens
export const secureStorage = createMMKV({
  id: 'secure-auth',
  encryptionKey: ENCRYPTION_KEY, // enables AES encryption
});

export const setUser = (user: User) => {
  secureStorage.set(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const data = secureStorage.getString(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const deleteUser = async () => {
  secureStorage.remove(USER_KEY);
};

// Fast non-encrypted storage (use for non-sensitive things)
export const fastStorage = createMMKV({
  id: 'fast-storage',
  // encryptionKey: undefined,  // no encryption = fastest
});