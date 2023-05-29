import React from "react"

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: "",
  },
  {
    name: "Users",
    path: "/users",
    icon: "",
  },
  {
    name: "Categories",
    path: "/categories",
    icon: "",
  },
  {
    name: "Add Category",
    path: "/add-category",
    icon: "",
  },
  {
    name: "Products",
    path: "/products",
    icon: "",
  },
  {
    name: "Add Product",
    path: "/add-product",
    icon: "",
  },
]

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-5 py-5 w-64">
      {routes.map((route, index) => {
        return (
          <div
            key={route.name}
            className="flex items-center gap-5 px-5 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
          >
            <span>{route.name}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Sidebar
