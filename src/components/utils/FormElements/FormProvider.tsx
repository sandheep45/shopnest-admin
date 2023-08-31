"use client";

import { type PropsWithoutRef, type ReactNode, useState } from "react";
// import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

import { useForm, type UseFormProps } from "react-hook-form";

import { Form } from "@/components/ui/form";

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  /** All your form fields */
  children?: ReactNode;
  /** Text to display in the submit button */
  submitText?: string;
  schema?: S;
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>;
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"];
}

interface OnSubmitResult {
  FORM_ERROR?: string;
  [prop: string]: any;
}

export const FORM_ERROR = "FORM_ERROR";

const FormProvider = <S extends z.ZodType<any, any>>({
  children,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) => {
  const ctx = useForm<z.infer<S>>({
    mode: "all",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  });
  const [, setFormError] = useState<string | null>(null);

  return (
    <>
      <Form {...ctx}>
        <form
          onSubmit={
            void ctx.handleSubmit(async (values) => {
              const result = (await onSubmit(values)) || {};
              for (const [key, value] of Object.entries(result)) {
                if (key === FORM_ERROR) {
                  setFormError(value as string);
                } else {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  ctx.setError(key as any, { type: "submit", message: value as string });
                }
              }
            })
          }
          className="form"
          {...props}
        >
          {/* Form fields supplied as children are rendered here */}
          {children}
        </form>
      </Form>

      {/* <DevTool control={ctx.control} /> */}
    </>
  );
};

export default FormProvider;
