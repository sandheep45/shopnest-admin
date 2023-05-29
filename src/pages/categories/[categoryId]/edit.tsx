import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import { CategoryForm, FORM_ERROR } from "src/categories/components/CategoryForm"
import updateCategory from "src/categories/mutations/updateCategory"
import getCategory from "src/categories/queries/getCategory"
import { UpdateCategorySchema } from "src/categories/schemas"
import Layout from "src/core/layouts/Layout"

import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"

export const EditCategory = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "string")
  const [category, { setQueryData }] = useQuery(
    getCategory,
    { id: categoryId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCategoryMutation] = useMutation(updateCategory)

  return (
    <>
      <Head>
        <title>Edit Category {category.id}</title>
      </Head>

      <div>
        <h1>Edit Category {category.id}</h1>
        <pre>{JSON.stringify(category, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoryForm
            submitText="Update Category"
            schema={UpdateCategorySchema}
            initialValues={category}
            onSubmit={async (values) => {
              try {
                const updated = await updateCategoryMutation({
                  ...values,
                  id: category.id,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowCategoryPage({ categoryId: updated.id }))
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}

const EditCategoryPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCategory />
      </Suspense>

      <p>
        <Link href={Routes.CategoriesPage()}>Categories</Link>
      </p>
    </div>
  )
}

EditCategoryPage.authenticate = true
EditCategoryPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default EditCategoryPage
