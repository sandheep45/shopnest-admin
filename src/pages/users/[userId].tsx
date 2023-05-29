import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import deleteUser from "src/users/mutations/deleteUser"
import getUser from "src/users/queries/getUser"

import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"

export const User = () => {
  const router = useRouter()
  const userId = useParam("userId", "string")
  const [deleteUserMutation] = useMutation(deleteUser)
  const [user] = useQuery(getUser, { id: userId })

  return (
    <>
      <Head>
        <title>User {user.id}</title>
      </Head>

      <div>
        <h1>User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>

        <Link href={Routes.EditUserPage({ userId: user.id })}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteUserMutation({ id: user.id })
              await router.push(Routes.UsersPage())
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

const ShowUserPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.UsersPage()}>Users</Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  )
}

ShowUserPage.authenticate = true
ShowUserPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default ShowUserPage
