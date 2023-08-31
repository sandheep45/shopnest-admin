"use client";

import React from "react";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";

interface IFormTextAreaProps extends TextareaProps {
  name: string;
  description?: string;
  label: string;
  isLabelHidden?: boolean;
}

const FormTextArea: React.FC<IFormTextAreaProps> = ({
  description,
  name,
  label,
  isLabelHidden,
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState: { isSubmitting, errors } }) => (
        <FormItem>
          {!isLabelHidden && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              disabled={isSubmitting || props.disabled}
              placeholder="Tell us a little bit about yourself"
              className="resize-none"
              {...field}
              {...props}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage>{errors.root?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormTextArea;
