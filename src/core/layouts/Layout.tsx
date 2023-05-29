import Head from "next/head"
import React from "react"

import { BlitzLayout } from "@blitzjs/next"

import { useThemeContext } from "../context/ThemeContext"
import Sidebar from "./MainLayout/Sidebar"
import TopBar from "./MainLayout/TopBar"

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

      <div className={`${isDarkTheme ? "dark" : ""}`}>
        <div className="flex-1 flex gap-6">
          <Sidebar />
          <div className="flex-1">
            <TopBar />
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
