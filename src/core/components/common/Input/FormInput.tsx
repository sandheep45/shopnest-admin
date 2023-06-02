import React from "react"
import { Control, FieldError } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../Form"
import { Input } from "./Input"

interface IFormInputProps {
  name: string
  label: string
  description?: string
  placeholder?: string
  type?: string
  control: Control
  error?: FieldError
}

const FormInput: React.FC<IFormInputProps> = (props) => {
  return (
    <FormField
      control={props.control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{props.label}</FormLabel>
          <FormControl>
            <Input placeholder={props.placeholder} {...field} />
          </FormControl>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage>{props.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}

export default FormInput
