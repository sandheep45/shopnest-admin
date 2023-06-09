import { useRouter } from "next/router"
import { SignupForm } from "src/auth/components/SignupForm"
import Layout from "src/core/layouts/Layout"

import { BlitzPage, Routes } from "@blitzjs/next"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <SignupForm onSuccess={() => router.push(Routes.Index())} />
    </Layout>
  )
}

export default SignupPage
