"use client";

import React from "react";
import {
  type ControllerRenderProps,
  type FieldValues,
  useFormContext,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  description?: string;
  type: string;
}

const FormInput: React.FC<IFormInputProps> = ({
  label,
  description,
  ...props
}) => {
  const { control } = useFormContext();

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FieldValues, string>,
    type: string,
    _accept?: string
  ) => {
    if (type === "number") return field.onChange(e.target.valueAsNumber);
    if (type === "checkbox") return field.onChange(e.target.checked);
    if (type === "date" || type === "time")
      return field.onChange(e.target.valueAsDate);

    return field.onChange(e.target.value);
  };

  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field, formState: { isSubmitting, errors } }) => (
        <FormItem>
          <FormLabel className="dark:text-gray-400">{label}</FormLabel>
          <FormControl>
            <Input
              {...props}
              {...field}
              disabled={isSubmitting || props.disabled}
              placeholder={props.placeholder}
              onChange={(e) =>
                onChangeHandler(e, field, props.type, props.accept)
              }
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage>{errors.root?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
