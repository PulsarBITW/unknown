import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button, Flex, TextField} from '@radix-ui/themes';
import {useUnit} from 'effector-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form-components';

import {type SignupFormData, signupPageModel, signupSchema} from '../model';
import {ServerErrorMessage} from './ServerErrorMessage';

import styles from './signup.module.css';

export function SignupForm() {
  const [isLoading, submitForm] = useUnit([
    signupPageModel.$isLoading,
    signupPageModel.formSubmitted,
  ]);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: SignupFormData) => {
    submitForm(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles['form-container']} noValidate>
        <Flex direction="column" gap="3">
          <FormField
            control={form.control}
            name="firstName"
            render={({field}) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <TextField.Root type="text" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <TextField.Root type="text" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <TextField.Root type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <TextField.Root
                    type="password"
                    placeholder="••••••"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <TextField.Root
                    type="password"
                    placeholder="••••••"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Sign Up
          </Button>
          <ServerErrorMessage />
        </Flex>
      </form>
    </Form>
  );
}
