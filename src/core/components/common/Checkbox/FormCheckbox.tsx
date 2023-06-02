import React from "react"
import { Control } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../Form"
import { Checkbox } from "./Checkbox"

interface IFormCheckboxProps {
  control: Control
}

const FormCheckbox: React.FC<IFormCheckboxProps> = (props) => {
  return (
    <FormField
      control={props.control}
      name="mobile"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Use different settings for my mobile devices</FormLabel>
            <FormDescription>You can manage your mobile notifications in the </FormDescription>
          </div>
        </FormItem>
      )}
    />
  )
}

export default FormCheckbox
