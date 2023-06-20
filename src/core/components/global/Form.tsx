"use client"

import { PropsWithoutRef, ReactNode, useState } from "react"
import { useForm, UseFormProps } from "react-hook-form"
import { z } from "zod"

import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormProvider } from "../common/Form"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode
  /** Text to display in the submit button */
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

const Form = <S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) => {
  const ctx = useForm<z.infer<S>>({
    mode: "onBlur",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <>
      <FormProvider {...ctx}>
        <form
          onSubmit={ctx.handleSubmit(async (values) => {
            const result = (await onSubmit(values)) || {}
            for (const [key, value] of Object.entries(result)) {
              if (key === FORM_ERROR) {
                setFormError(value)
              } else {
                ctx.setError(key as any, { type: "submit", message: value })
              }
            }
          })}
          className="form"
          {...props}
        >
          {/* Form fields supplied as children are rendered here */}
          {children}
        </form>
      </FormProvider>

      <DevTool control={ctx.control} />
    </>
  )
}

export default Form
