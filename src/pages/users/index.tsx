import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import getUsers from "src/users/queries/getUsers"

import { Routes } from "@blitzjs/next"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { Button } from "@src/core/components/common/Button"
import { ScrollArea } from "@src/core/components/common/ScrollArea"

const ITEMS_PER_PAGE = 100

export const UsersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ users, hasMore }] = usePaginatedQuery(getUsers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="flex flex-col gap-4 w-full">
      <ScrollArea className="h-[calc(100vh-220px)] w-full">
        <ul className="h-full overflow-y-auto">
          {users.map((user) => (
            <li key={user.id}>
              <Link href={Routes.ShowUserPage({ userId: user.id })}>{user.name}</Link>
            </li>
          ))}
        </ul>
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

const UsersPage = () => {
  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>

      <div className="w-full p-5 dark:bg-[#1e1e2d] bg-[#f5f8fa] rounded-md">
        <p>
          <Link href={Routes.NewUserPage()}>Create User</Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <UsersList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default UsersPage
