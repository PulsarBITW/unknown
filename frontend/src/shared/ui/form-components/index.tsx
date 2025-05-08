import * as React from 'react';
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import {Slot, Text} from '@radix-ui/themes';
import clsx from 'clsx';

import styles from './form-components.module.css';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{name: props.name}}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const {getFieldState, formState} = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const {id} = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{id}}>
        <div ref={ref} className={clsx(styles.item, className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({className, color, ...props}, ref) => {
    const {error, formItemId} = useFormField();

    return (
      <Text
        ref={ref}
        as="label"
        size="2"
        className={clsx(styles.label, error && styles.error, className)}
        htmlFor={formItemId}
        {...props}
      />
    );
  },
);
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => {
    const {error, formItemId, formDescriptionId, formMessageId} = useFormField();

    return (
      <Slot
        ref={ref}
        id={formItemId}
        className={clsx(styles.control, className)}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({className, color, ...props}, ref) => {
  const {formDescriptionId} = useFormField();

  return (
    <Text
      ref={ref}
      as="p"
      size="1"
      color="gray"
      id={formDescriptionId}
      className={clsx(styles.description, className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({className, color, children, ...props}, ref) => {
  const {error, formMessageId} = useFormField();

  const body = error ? String(error?.message ?? '') : children;

  // if (!body) {
  //   return null;
  // }

  return (
    <Text
      ref={ref}
      as="p"
      size="1"
      color="red"
      id={formMessageId}
      className={clsx(styles.message, className)}
      data-visible={!!body}
      {...props}
    >
      {body}
    </Text>
  );
});
FormMessage.displayName = 'FormMessage';

/* eslint-disable react-refresh/only-export-components */
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
