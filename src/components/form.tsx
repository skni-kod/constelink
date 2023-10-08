"use client";

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type HTMLAttributes,
} from "react";
import {
  Controller,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues as ReactHookFormFieldValues,
} from "react-hook-form";

import { Slot } from "@radix-ui/react-slot";
import { cx } from "cva";

import { Label } from "@/components/label";

export { FormProvider as Form } from "react-hook-form";

export type FormControlProps = ComponentPropsWithoutRef<typeof Slot> & {
  hasDescription?: boolean;
};

type FormFieldContextValue<
  FieldValues extends ReactHookFormFieldValues = ReactHookFormFieldValues,
  Name extends FieldPath<FieldValues> = FieldPath<FieldValues>,
> = {
  name: Name;
};

export type FormFieldProps<
  FieldValues extends ReactHookFormFieldValues = ReactHookFormFieldValues,
  Name extends FieldPath<FieldValues> = FieldPath<FieldValues>,
> = Omit<ControllerProps<FieldValues, Name>, "render"> & {
  children: ControllerProps<FieldValues, Name>["render"];
};

export type FormItemProps = HTMLAttributes<HTMLDivElement> & {
  unstyled?: boolean;
};

type FormItemContextValue = {
  id: string;
};

const FormFieldContext = createContext({} as FormFieldContextValue);
const FormItemContext = createContext({} as FormItemContextValue);

export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  FormControlProps
>(({ hasDescription = true, ...props }, ref) => {
  const { error, formDescriptionId, formItemId, formMessageId } =
    useFormField();

  const describedByArray = [
    hasDescription && formDescriptionId,
    Boolean(error) && formMessageId,
  ].filter(Boolean);

  return (
    <Slot
      aria-describedby={
        describedByArray.length ? describedByArray.join(" ") : undefined
      }
      aria-invalid={Boolean(error)}
      id={formItemId}
      ref={ref}
      {...props}
    />
  );
});

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { error, formDescriptionId } = useFormField();

  if (error) return null;

  return (
    <p
      className={cx("text-sm text-muted-foreground", className)}
      id={formDescriptionId}
      ref={ref}
      {...props}
    />
  );
});

export const FormField = <
  FieldValues extends ReactHookFormFieldValues = ReactHookFormFieldValues,
  Name extends FieldPath<FieldValues> = FieldPath<FieldValues>,
>({
  children,
  name,
  ...props
}: FormFieldProps<FieldValues, Name>) => (
  <FormFieldContext.Provider value={{ name }}>
    <Controller name={name} render={children} {...props} />
  </FormFieldContext.Provider>
);

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, unstyled, ...props }, ref) => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          className={cx(!unstyled && "flex flex-col gap-2", className)}
          ref={ref}
          {...props}
        />
      </FormItemContext.Provider>
    );
  },
);

export const FormLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      className={cx(error && "text-destructive", className)}
      htmlFor={formItemId}
      ref={ref}
      {...props}
    />
  );
});

export const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      className={cx(
        "text-sm font-medium",
        error ? "text-destructive" : "text-muted-foreground",
        className,
      )}
      id={formMessageId}
      ref={ref}
      {...props}
    >
      {body}
    </p>
  );
});

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const { id } = useContext(FormItemContext);
  const { formState, getFieldState } = useFormContext();

  if (!fieldContext) {
    throw new Error("`useFormField()` should be used within `<FormField>`");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    formDescriptionId: `${id}-form-item-description`,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    id,
    name: fieldContext.name,
    ...fieldState,
  };
};

FormControl.displayName = "FormControl";
FormDescription.displayName = "FormDescription";
FormItem.displayName = "FormItem";
FormLabel.displayName = "FormLabel";
FormMessage.displayName = "FormMessage";
