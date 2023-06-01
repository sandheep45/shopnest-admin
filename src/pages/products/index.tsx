import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import getProducts from "src/products/queries/getProducts"

import { usePaginatedQuery } from "@blitzjs/rpc"
import { Button } from "@src/core/components/common/Button"
import { Input } from "@src/core/components/common/Input"
import { ScrollArea, ScrollBar } from "@src/core/components/common/ScrollArea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/core/components/common/Select"
import ProductTable from "@src/products/components/ProductTable"

const ITEMS_PER_PAGE = 10

export const ProductsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ products, hasMore }] = usePaginatedQuery(getProducts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="flex flex-col gap-8 w-full">
      <ScrollArea className="h-[calc(100vh-220px)] w-full overflow-x-auto">
        <ProductTable products={products} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center justify-between">
        <Button disabled={page === 0} onClick={goToPreviousPage}>
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={goToNextPage}>
          Next
        </Button>
      </div>
    </div>
  )
}

const ProductsPage = () => {
  return (
    <Layout title="Product List">
      <div className="flex flex-col gap-5 w-full">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 px-2">
          Product Listing
        </h1>
        <div className="w-full flex flex-col gap-7 p-5 dark:bg-[#1e1e2d] bg-[#f5f8fa] rounded-md">
          <div className="flex items-center justify-between flex-col sm:flex-row w-full gap-2">
            <Input className="sm:w-[140px] md:w-auto" placeholder="Search" />

            <div className="flex items-center justify-end w-full gap-1 lg:gap-3">
              <Select>
                <SelectTrigger className="w-full sm:w-[150px] dark:bg-[#1e1e2d] dark:text-gray-400">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full sm:w-fit">Filter</Button>
              <Button className="w-full sm:w-fit">Export</Button>
            </div>
          </div>

          <Suspense fallback={<>Loading...</>}>
            <ProductsList />
          </Suspense>
        </div>
      </div>
    </Layout>
  )
}

export default ProductsPage
