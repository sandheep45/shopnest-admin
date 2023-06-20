import { useTheme } from "next-themes"
import Image from "next/image"
import { BsCloudMoonFill, BsCloudSunFill } from "react-icons/bs"

import { Toggle } from "@src/core/components/common/Toggle"

const TopBar = () => {
  const { theme, setTheme } = useTheme()

  return (
    <header className="w-full sticky top-0 z-10 flex items-center justify-end bg-[#f5f8fa] dark:bg-[#1e1e2d] dark:text-gray-500 py-3 px-5 transition-all duration-300">
      <Toggle
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="toggle-theme"
      >
        <BsCloudSunFill
          className={`transition-all duration-700 ease-in-out ${
            theme === "dark" ? "w-10 h-10" : "w-0 h-0"
          }`}
        />
        <BsCloudMoonFill
          className={`transition-all duration-700 ease-in-out ${
            theme !== "dark" ? "w-10 h-10" : "w-0 h-0"
          }`}
        />
      </Toggle>
      <Image alt="" src={""} />
    </header>
  )
}

export default TopBar
