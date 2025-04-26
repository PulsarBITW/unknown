import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string({required_error: 'Email is required'}).email('Please enter a valid email'),
  password: z
    .string({required_error: 'Password is required'})
    .min(8, 'Password must be at least 8 characters')
    .regex(/^[A-Za-z0-9]+$/, 'Password must contain only English letters and digits'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
