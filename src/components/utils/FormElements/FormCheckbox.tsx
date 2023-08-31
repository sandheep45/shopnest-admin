"use client";

import React from 'react';

import { useFormContext } from 'react-hook-form';

import { Checkbox } from '@/components/ui/checkbox';
import {
    FormControl, FormDescription, FormField, FormItem, FormLabel,
} from '@/components/ui/form';

interface IFormCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  name: string;
  isLabelHidden?: boolean;
}

const FormCheckbox: React.FC<IFormCheckboxProps> = (props) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field, formState: { isSubmitting } }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              disabled={isSubmitting || props.disabled}
                checked={field.value as boolean}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {!props.isLabelHidden && <FormLabel>{props.label}</FormLabel>}
            <FormDescription>{props.description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default FormCheckbox;
