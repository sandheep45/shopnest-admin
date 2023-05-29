import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { FORM_ERROR, ProductForm } from "src/products/components/ProductForm"
import updateProduct from "src/products/mutations/updateProduct"
import getProduct from "src/products/queries/getProduct"
import { UpdateProductSchema } from "src/products/schemas"

import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"

export const EditProduct = () => {
  const router = useRouter()
  const productId = useParam("productId", "string")
  const [product, { setQueryData }] = useQuery(
    getProduct,
    { id: productId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateProductMutation] = useMutation(updateProduct)

  return (
    <>
      <Head>
        <title>Edit Product {product.id}</title>
      </Head>

      <div>
        <h1>Edit Product {product.id}</h1>
        <pre>{JSON.stringify(product, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductForm
            submitText="Update Product"
            schema={UpdateProductSchema}
            initialValues={product}
            onSubmit={async (values) => {
              try {
                const updated = await updateProductMutation({
                  ...values,
                  id: product.id,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowProductPage({ productId: updated.id }))
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

const EditProductPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProduct />
      </Suspense>

      <p>
        <Link href={Routes.ProductsPage()}>Products</Link>
      </p>
    </div>
  )
}

EditProductPage.authenticate = true
EditProductPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default EditProductPage
