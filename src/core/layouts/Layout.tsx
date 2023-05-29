import Head from "next/head"
import React from "react"

import { BlitzLayout } from "@blitzjs/next"

import { useThemeContext } from "../context/ThemeContext"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  const { isDarkTheme } = useThemeContext()
  return (
    <>
      <Head>
        <title>{title ?? "Test"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`${isDarkTheme ? "dark" : ""}`}>{children}</div>
    </>
  )
}

export default Layout
