import React from "react"
import { Control } from "react-hook-form"

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../Form"
import { Textarea, TextareaProps } from "./TextArea"

interface IFormTextAreaProps extends TextareaProps {
  control: Control
}

const FormTextArea: React.FC<IFormTextAreaProps> = ({ control, ...restProps }) => {
  return (
    <FormField
      control={control}
      name="bio"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell us a little bit about yourself"
              className="resize-none"
              {...field}
              {...restProps}
            />
          </FormControl>
          <FormDescription>
            You can <span>@mention</span> other users and organizations.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormTextArea
