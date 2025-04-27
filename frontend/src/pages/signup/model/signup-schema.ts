import {z} from 'zod';

export const signupSchema = z
  .object({
    firstName: z
      .string({required_error: 'First name is required'})
      .min(2, 'First name must be at least 2 characters'),
    lastName: z
      .string({required_error: 'Last name is required'})
      .min(2, 'Last name must be at least 2 characters'),
    email: z.string({required_error: 'Email is required'}).email('Please enter a valid email'),
    password: z
      .string({required_error: 'Password is required'})
      .min(8, 'Password must be at least 8 characters')
      .regex(/^[A-Za-z0-9]+$/, 'Password must contain only English letters and digits'),
    confirmPassword: z.string({required_error: 'Confirm Password is required'}),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
