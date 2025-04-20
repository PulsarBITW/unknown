import {z} from 'zod';

const emailSchema = z
  .string({required_error: 'Email is required'})
  .email('Please enter a valid email');

const passwordSchema = z
  .string({required_error: 'Password is required'})
  .min(6, 'Password must be at least 6 characters');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormData = z.infer<typeof loginSchema>;
