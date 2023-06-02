import React from "react"
import { useFormContext } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../Form"
import { Checkbox } from "./Checkbox"

interface IFormCheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  name: string
  isLabelHidden?: boolean
}

const FormCheckbox: React.FC<IFormCheckboxProps> = (props) => {
  const { control } = useFormContext()
  return (
    <FormField
      control={control}
      name={props.name}
      render={({ field, formState: { isSubmitting } }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              disabled={isSubmitting}
              checked={field.value}
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
  )
}

export default FormCheckbox
