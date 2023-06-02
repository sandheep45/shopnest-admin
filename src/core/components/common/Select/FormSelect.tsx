import React from "react"
import { Control } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../Form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"

interface IFormSelectProps {
  control: Control
}

const FormSelect: React.FC<IFormSelectProps> = (props) => {
  return (
    <FormField
      control={props.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a verified email to display" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="m@example.com">m@example.com</SelectItem>
              <SelectItem value="m@google.com">m@google.com</SelectItem>
              <SelectItem value="m@support.com">m@support.com</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>You can manage email addresses in your </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormSelect
