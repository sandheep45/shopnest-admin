import React, { Suspense } from "react"
import { z } from "zod"

import Form, { FormProps } from "@src/core/components/global/Form"

export { FORM_ERROR } from "@src/core/components/global/Form"

export function ProductForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      {/* template: <__component__ name="__fieldName__" label="__Field_Name__" placeholder="__Field_Name__"  type="__inputType__" /> */}
    </Form>
  )
}
