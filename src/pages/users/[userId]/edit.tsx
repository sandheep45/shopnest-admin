import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import { FORM_ERROR, UserForm } from "src/users/components/UserForm"
import updateUser from "src/users/mutations/updateUser"
import getUser from "src/users/queries/getUser"
import { UpdateUserSchema } from "src/users/schemas"

import { Routes, useParam } from "@blitzjs/next"
import { useMutation, useQuery } from "@blitzjs/rpc"

export const EditUser = () => {
  const router = useRouter()
  const userId = useParam("userId", "string")
  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: userId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateUserMutation] = useMutation(updateUser)

  return (
    <>
      <Head>
        <title>Edit User {user.id}</title>
      </Head>

      <div>
        <h1>Edit User {user.id}</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <UserForm
            submitText="Update User"
            schema={UpdateUserSchema}
            initialValues={user}
            onSubmit={async (values) => {
              try {
                const updated = await updateUserMutation({
                  ...values,
                  id: user.id,
                })
                await setQueryData(updated)
                await router.push(Routes.ShowUserPage({ userId: updated.id }))
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

const EditUserPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditUser />
      </Suspense>

      <p>
        <Link href={Routes.UsersPage()}>Users</Link>
      </p>
    </div>
  )
}

EditUserPage.authenticate = true
EditUserPage.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>

export default EditUserPage
