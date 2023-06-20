import Head from "next/head"
import React from "react"

import { BlitzLayout } from "@blitzjs/next"

import Footer from "./MainLayout/Footer"
import Sidebar from "./MainLayout/Sidebar"
import TopBar from "./MainLayout/TopBar"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title ?? "Test"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="flex-1 flex bg-[#f5f8fa] dark:bg-[#151521]">
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-y-auto">
            <TopBar />
            <div className="flex flex-1 p-5 bg-gray-200 dark:bg-[#151521]">{children}</div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
