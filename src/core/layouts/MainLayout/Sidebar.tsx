import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { BsDatabaseFillAdd, BsFillBox2HeartFill } from "react-icons/bs"
import { MdAssignmentAdd, MdCategory, MdSpaceDashboard } from "react-icons/md"
import { RiAdminFill } from "react-icons/ri"

import { Routes } from "@blitzjs/next"

const routes = [
  {
    name: "Dashboard",
    path: Routes.Index(),
    icon: <MdSpaceDashboard />,
  },
  {
    name: "Users",
    path: "/users",
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
  return (
    <div className="flex flex-col gap-5 p-5 w-64">
      {routes.map((route, index) => {
        return (
          <Link
            href={route.path}
            key={route.name}
            className="flex items-center gap-5 px-5 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer dark:hover:text-gray-300"
          >
            {route.icon}
            <span>{route.name}</span>
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar
