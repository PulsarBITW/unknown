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

import {type LoginFormData, loginPageModel, loginSchema} from '../model';
import {ServerErrorMessage} from './ServerErrorMessage';

import styles from './login.module.css';

const INITIAL_VALUES: LoginFormData = {
  email: 'john@example.com',
  password: 'password123',
};

export function LoginForm() {
  const [isLoading, submitForm] = useUnit([
    loginPageModel.$isLoading,
    loginPageModel.formSubmitted,
  ]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: INITIAL_VALUES,
  });

  const onSubmit = (data: LoginFormData) => {
    submitForm(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles['form-container']} noValidate>
        <Flex direction="column" gap="3">
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
                    autoComplete="current-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Sign In
          </Button>
          <ServerErrorMessage />
        </Flex>
      </form>
    </Form>
  );
}
