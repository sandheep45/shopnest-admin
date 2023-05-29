import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import deleteProduct from "src/products/mutations/deleteProduct"
import getProduct from "src/products/queries/getProduct"

import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"

export const Product = () => {
  const router = useRouter()
  const productId = useParam("productId", "string")
  const [deleteProductMutation] = useMutation(deleteProduct)
  const [product] = useQuery(getProduct, { id: productId })

  return (
    <>
      <Head>
        <title>Product {product.id}</title>
      </Head>

      <div>
        <h1>Product {product.id}</h1>
        <pre>{JSON.stringify(product, null, 2)}</pre>

        <Link href={Routes.EditProductPage({ productId: product.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProductMutation({ id: product.id })
              await router.push(Routes.ProductsPage())
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

const ShowProductPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ProductsPage()}>Products</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Product />
      </Suspense>
    </div>
  )
}

ShowProductPage.authenticate = true
ShowProductPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default ShowProductPage
