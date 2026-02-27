import { User } from '../types/user';

// Simulated network delay
const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// Simulate signup API
export const signupApi = async (user: User) => {
  await delay(1000);
  return { success: true, data: user };
};

// Simulate login API
export const loginApi = async (
  email: string,
  password: string,
  storedUser: User | null
) => {
  await delay(1000);

  if (!storedUser)
    throw new Error('User not found. Please signup.');

  if (
    storedUser.email !== email ||
    storedUser.password !== password
  ) {
    throw new Error('Invalid credentials');
  }

  return { success: true, data: storedUser };
};