import Image from "next/image"
import { BsCloudMoonFill, BsCloudSunFill } from "react-icons/bs"

import { Toggle } from "@src/core/components/common/Toggle"
import { useThemeContext } from "@src/core/context/ThemeContext"

const TopBar = () => {
  const { isDarkTheme, setIsDarkTheme } = useThemeContext()

  const toggleTheme = () => {
    localStorage.setItem("isDarkTheme", JSON.stringify(!isDarkTheme))
    setIsDarkTheme((currentValue) => !currentValue)
  }

  return (
    <header className="w-full sticky top-0 flex items-center justify-end dark:bg-[#1e1e2d] dark:text-gray-500 h-16 px-5 z-[999] transition-all duration-300">
      <Toggle onClick={toggleTheme} aria-label="toggle-theme">
        <BsCloudSunFill
          className={`transition-all duration-700 ease-in-out ${
            isDarkTheme ? "w-10 h-10" : "w-0 h-0"
          }`}
        />
        <BsCloudMoonFill
          className={`transition-all duration-700 ease-in-out ${
            !isDarkTheme ? "w-10 h-10" : "w-0 h-0"
          }`}
        />
      </Toggle>
      <Image alt="" src={""} />
    </header>
  )
}

export default TopBar
