import Image from "next/image"
import { BsCloudMoonFill, BsCloudSunFill } from "react-icons/bs"

import { Toggle } from "@src/core/components/common/Toggle"
import { useThemeContext } from "@src/core/context/ThemeContext"

const TopBar = () => {
  const { isDarkTheme, setIsDarkTheme } = useThemeContext()
  return (
    <div className="w-full flex justify-end">
      <Toggle onClick={() => setIsDarkTheme(!isDarkTheme)} aria-label="toggle-theme">
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
    </div>
  )
}

export default TopBar
