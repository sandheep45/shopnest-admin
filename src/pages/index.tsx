import React from "react"

import { BlitzPage } from "@blitzjs/auth"
import Layout from "@src/core/layouts/Layout"

const Index: BlitzPage = () => {
  return (
    <Layout title="Dashboard">
      <a href="/api/auth/google">Log In With Google</a>
      <a href="/api/auth/facebook">Log In With Facebook</a>
    </Layout>
  )
}

export default Index
