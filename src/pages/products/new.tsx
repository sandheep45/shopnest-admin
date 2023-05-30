import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { FORM_ERROR, ProductForm } from "src/products/components/ProductForm"
import createProduct from "src/products/mutations/createProduct"
import { CreateProductSchema } from "src/products/schemas"

import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"

const NewProductPage = () => {
  const router = useRouter()
  const [createProductMutation] = useMutation(createProduct)

  return (
    <Layout title={"Create New Product"}>
      <h1>Create New Product</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductForm
          submitText="Create Product"
          schema={CreateProductSchema}
          // initialValues={{}}
          onSubmit={async (values) => {
            try {
              const product = await createProductMutation(values)
              await router.push(Routes.ShowProductPage({ productId: product.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </Suspense>
      <p>
        <Link href={Routes.ProductsPage()}>Products</Link>
      </p>
    </Layout>
  )
}

NewProductPage.authenticate = true

export default NewProductPage
