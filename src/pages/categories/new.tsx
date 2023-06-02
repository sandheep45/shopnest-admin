import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import { CategoryForm, FORM_ERROR } from "src/categories/components/CategoryForm"
import createCategory from "src/categories/mutations/createCategory"
import { CreateCategorySchema } from "src/categories/schemas"
import Layout from "src/core/layouts/Layout"

import { BlitzPage } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Mediatype, Status } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import FormInput from "@src/core/components/common/Input/FormInput"
import LoadingOverlay from "@src/core/components/global/LoadingOverlay"

const initialValues = {
  description: "",
  name: "",
  status: "DRAFT" as Status,
  tags: "",
  Media: { create: { url: "", type: "IMAGE" as Mediatype } },
}

const NewCategoryPage: BlitzPage = () => {
  const router = useRouter()
  const [createCategoryMutation, { isLoading }] = useMutation(createCategory)

  return (
    <Layout title={"Create New Category"}>
      <h1>Create New Category</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LoadingOverlay isOpen={isLoading} />
        <CategoryForm
          submitText="Create Category"
          schema={CreateCategorySchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              const category = await createCategoryMutation(values)
              await router.push(Routes.ShowCategoryPage({ categoryId: category.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        >
          <FormInput type="text" className="border" name="name" label="Name" placeholder="Name" />
          <FormInput
            type="text"
            className="border"
            name="description"
            label="Description"
            placeholder="Name"
          />
          <FormInput
            type="text"
            className="border"
            name="status"
            label="Status"
            placeholder="Name"
          />
          <FormInput type="text" className="border" name="tags" label="Tags" placeholder="Name" />
          <FormInput
            type="file"
            className="border"
            name="Media.create.url"
            label="Url"
            placeholder="Name"
          />
          <Button className="border" type="submit">
            Create Category
          </Button>
        </CategoryForm>
      </Suspense>
      <p>
        <Link href={Routes.CategoriesPage()}>Categories</Link>
      </p>
    </Layout>
  )
}

NewCategoryPage.authenticate = true

export default NewCategoryPage
