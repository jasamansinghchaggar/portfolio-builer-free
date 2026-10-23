'use client';

import * as React from 'react';
import * as Slot from '@radix-ui/react-slot';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';
import { cn } from '@/lib/utils';

const Form = React.forwardRef<HTMLFormElement, React.ComponentPropsWithoutRef<'form'>>(
  ({ ...props }, ref) => <form {...props} ref={ref} />
);
Form.displayName = 'Form';

interface FormFieldContextValue<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
}

const FormFieldContext = React.createContext<FormFieldContextValue<FieldValues> | undefined>(
  undefined
);

function useFormField<TFieldValues extends FieldValues>() {
  const fieldContext = React.useContext(FormFieldContext);
  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }
  return fieldContext;
}

interface FormFieldProps<TFieldValues extends FieldValues> extends ControllerProps<
  UseFormReturn<TFieldValues>
> {}

function FormField<TFieldValues extends FieldValues>({ ...props }: FormFieldProps<TFieldValues>) {
  return (
    <Controller {...props}>
      {({ field, fieldState, formState }) => (
        <FormFieldContext.Provider value={{ name: field.name }}>
          {props.children({ field, fieldState, formState })}
        </FormFieldContext.Provider>
      )}
    </Controller>
  );
}

FormField.displayName = 'FormField';

interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('space-y-2', className)} {...props} />
));
FormItem.displayName = 'FormItem';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
);
FormLabel.displayName = 'FormLabel';

interface FormControlProps extends React.ComponentPropsWithoutRef<typeof Slot.Slot> {}

const FormControl = React.forwardRef<React.ElementRef<typeof Slot.Slot>, FormControlProps>(
  ({ ...props }, ref) => {
    const { name } = useFormField();
    return <Slot.Slot ref={ref} id={name} name={name} {...props} />;
  }
);
FormControl.displayName = 'FormControl';

interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
FormDescription.displayName = 'FormDescription';

interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const { fieldState } = useFormField();
    if (!fieldState.error) return null;
    return (
      <p ref={ref} className={cn('text-sm font-medium text-destructive', className)} {...props}>
        {children ?? fieldState.error.message}
      </p>
    );
  }
);
FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  useFormField,
};
