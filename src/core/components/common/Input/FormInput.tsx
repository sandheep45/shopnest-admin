import React from "react"
import { useFormContext } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../Form"
import { Input } from "./Input"

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  description?: string
  type: string
}

const FormInput: React.FC<IFormInputProps> = ({ label, description, ...props }) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field, formState: { isSubmitting, errors } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input disabled={isSubmitting} placeholder={props.placeholder} {...field} {...props} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage>{errors.root?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}

export default FormInput
