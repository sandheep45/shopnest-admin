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
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IFormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  description?: string;
  label: string;
  isLabelHidden?: boolean;
}

const FormSelect: React.FC<IFormSelectProps> = (props) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field, formState: { isSubmitting, errors } }) => (
        <FormItem>
          {!props.isLabelHidden && <FormLabel>{props.label}</FormLabel>}
          <Select
            disabled={isSubmitting || props.disabled}
            onValueChange={field.onChange}
            defaultValue={field.value as string}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{props.children}</SelectContent>
          </Select>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage>{errors.root?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
