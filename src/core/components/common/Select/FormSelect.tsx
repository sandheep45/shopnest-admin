import React from "react"
import { useFormContext } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../Form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"

interface IFormSelectProps {
  name: string
  description?: string
  label: string
  isLabelHidden?: boolean
  placeholder?: string
}

const FormSelect: React.FC<IFormSelectProps> = (props) => {
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext()
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field }) => (
        <FormItem>
          {!props.isLabelHidden && <FormLabel>{props.label}</FormLabel>}
          <Select disabled={isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>{props.description}</FormDescription>
          <FormMessage>{errors.root?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}

export default FormSelect
