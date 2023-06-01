import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { BsDatabaseFillAdd, BsFillBox2HeartFill } from "react-icons/bs"
import { GiHamburgerMenu } from "react-icons/gi"
import { MdAssignmentAdd, MdCategory, MdSpaceDashboard } from "react-icons/md"
import { RiAdminFill } from "react-icons/ri"

import { Routes } from "@blitzjs/next"
import { Sheet, SheetContent, SheetTrigger } from "@src/core/components/common/Drawer"
import { useThemeContext } from "@src/core/context/ThemeContext"
import { cn } from "@src/lib/utils"

const routes = [
  {
    name: "Dashboard",
    path: Routes.Index(),
    icon: <MdSpaceDashboard />,
  },
  {
    name: "Users",
    path: Routes.UsersPage(),
    icon: <RiAdminFill />,
  },
  {
    name: "Categories",
    path: Routes.CategoriesPage(),
    icon: <MdCategory />,
  },
  {
    name: "Add Category",
    path: Routes.NewCategoryPage(),
    icon: <MdAssignmentAdd />,
  },
  {
    name: "Products",
    path: Routes.ProductsPage(),
    icon: <BsFillBox2HeartFill />,
  },
  {
    name: "Add Product",
    path: Routes.NewProductPage(),
    icon: <BsDatabaseFillAdd />,
  },
]

const Sidebar = () => {
  const router = useRouter()
  const { isDarkTheme } = useThemeContext()
  return (
    <div className="relative">
      <aside className="p-5 hidden md:block w-56 lg:w-64 dark:bg-[#1e1e2d] dark:text-gray-500 h-screen transition-all duration-300">
        <nav className="flex flex-col w-full gap-5">
          {routes.map((route, index) => {
            return (
              <Link
                href={route.path}
                key={route.name}
                className={cn(
                  "transition-all duration-100 flex items-center gap-5 px-5 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-300",
                  router.pathname === route.path.href &&
                    "bg-gray-200 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-800 dark:text-gray-300 shadow-lg"
                )}
              >
                {route.icon}
                <span>{route.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>
      <Sheet>
        <SheetTrigger className="absolute top-4 left-4 z-20 md:hidden dark:text-gray-500">
          <GiHamburgerMenu size={30} />
        </SheetTrigger>
        <SheetContent size="content" position="left" className={isDarkTheme ? "dark" : ""}>
          <aside className="p-2 w-56 dark:bg-[#1e1e2d] dark:text-gray-500 h-screen transition-all duration-300">
            <nav className="flex flex-col w-full gap-5">
              {routes.map((route, index) => {
                return (
                  <Link
                    href={route.path}
                    key={route.name}
                    className={cn(
                      "transition-all duration-100 flex items-center gap-5 px-5 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-300",
                      router.pathname === route.path.href &&
                        "bg-gray-200 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-800 dark:text-gray-300 shadow-lg"
                    )}
                  >
                    {route.icon}
                    <span>{route.name}</span>
                  </Link>
                )
              })}
            </nav>
          </aside>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Sidebar
