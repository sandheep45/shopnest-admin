import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import deleteCategory from "src/categories/mutations/deleteCategory"
import getCategory from "src/categories/queries/getCategory"
import Layout from "src/core/layouts/Layout"

import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"

export const Category = () => {
  const router = useRouter()
  const categoryId = useParam("categoryId", "string")
  const [deleteCategoryMutation] = useMutation(deleteCategory)
  const [category] = useQuery(getCategory, { id: categoryId })

  return (
    <>
      <Head>
        <title>Category {category.id}</title>
      </Head>

      <div>
        <h1>Category {category.id}</h1>
        <pre>{JSON.stringify(category, null, 2)}</pre>

        <Link href={Routes.EditCategoryPage({ categoryId: category.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCategoryMutation({ id: category.id })
              await router.push(Routes.CategoriesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCategoryPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CategoriesPage()}>Categories</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Category />
      </Suspense>
    </div>
  )
}

ShowCategoryPage.authenticate = true
ShowCategoryPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default ShowCategoryPage
