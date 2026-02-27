import { z } from 'zod';

// Login validation
export const loginSchema = z.object({
  email: z.string({error: 'Email is required'}).trim().min(1, "Email is required").email('Invalid email').toLowerCase(),
  password: z.string({error: "Password is required"}).min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

// Signup validation
export const signupSchema = z
  .object({
    name: z.string({error: "Name is required"}).trim().min(1, 'Name is required'),
    email: z.string({error: "Email is required"}).trim().min(1, "Email is required").email('Invalid email format').toLowerCase(),
    password: z.string({error: "Password is required"}).min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string({error: "Confirm Password is required"}).min(1, 'Confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// generate form types from zod validation schema
export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;