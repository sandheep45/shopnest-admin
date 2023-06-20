import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { FORM_ERROR, ProductForm } from "src/products/components/ProductForm"
import createProduct from "src/products/mutations/createProduct"
import { CreateProductSchema } from "src/products/schemas"

import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Mediatype, Status } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import FormInput from "@src/core/components/common/Input/FormInput"

const initialValue = {
  name: "",
  description: "",
  tags: "",
  status: "DRAFT" as Status,
  rating: 1,
  Category: {
    connect: {
      id: "",
    },
  },
  Variant: {
    create: {
      description: "",
      sku: 1,
      price: 1,
      barcode: 1,
      taxPercent: 1,
      onSelfQuantity: 1,
      inWareHouseQuantity: 1,
      Media: { create: { url: "", type: "IMAGE" as Mediatype } },
    },
  },
  Media: { create: { url: "", type: "IMAGE" as Mediatype } },
  VariantOptions: {
    create: {
      name: "",
      value: "",
    },
  },
}

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
          initialValues={initialValue}
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
        >
          <FormInput
            type="text"
            className="border text-gray-200"
            name="name"
            label="Name"
            placeholder="Name"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="description"
            label="Description"
            placeholder="Description"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="tags"
            label="Tags"
            placeholder="Tags"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="status"
            label="Status"
            placeholder="Status"
          />
          <FormInput
            type="number"
            className="border text-gray-200"
            name="rating"
            label="Rating"
            placeholder="Rating"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="Category.connect.id"
            label="Category"
            placeholder="Category"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="Variant.create.description"
            label="Varinat Desc"
            placeholder="Varinat Desc"
          />
          <FormInput
            type="number"
            className="border text-gray-200"
            name="Variant.create.sku"
            label="SKU"
            placeholder="SKU"
          />
          <FormInput
            type="number"
            className="border text-gray-200"
            name="Variant.create.price"
            label="Variant Price"
            placeholder="Variant Price"
          />
          <FormInput
            type="number"
            className="border text-gray-200"
            name="Variant.create.taxPercent"
            label="TaxPercent"
            placeholder="TaxPercent"
          />
          <FormInput
            type="number"
            className="border text-gray-200"
            name="Variant.create.barcode"
            label="Bar code"
            placeholder="Bar code"
          />
          <FormInput
            type="number"
            className="border text-gray-200"
            name="Variant.create.onSelfQuantity"
            label="onSelfQuantity"
            placeholder="onSelfQuantity"
          />
          <FormInput
            type="number"
            className="border text-gray-200"
            name="Variant.create.inWareHouseQuantity"
            label="inWareHouseQuantity"
            placeholder="inWareHouseQuantity"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="Variant.create.Media.create.url"
            label="Variant Image"
            placeholder="Variant Image"
          />
          <FormInput
            type="file"
            accept="image/*"
            className="border text-gray-200"
            name="Media.create.url"
            label="Producr Image"
            placeholder="Producr Image"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="VariantOptions.create.name"
            label="VariantOptions"
            placeholder="VariantOptions"
          />
          <FormInput
            type="text"
            className="border text-gray-200"
            name="VariantOptions.create.value"
            label="VariantOptions"
            placeholder="VariantOptions"
          />
          <Button className="border text-gray-200 dark:text-gray-700" type="submit">
            Create Category
          </Button>
        </ProductForm>
      </Suspense>
      <p>
        <Link href={Routes.ProductsPage()}>Products</Link>
      </p>
    </Layout>
  )
}

NewProductPage.authenticate = true

export default NewProductPage
