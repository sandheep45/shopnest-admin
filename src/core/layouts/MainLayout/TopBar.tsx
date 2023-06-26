import { useTheme } from "next-themes"
import Image from "next/image"
import { BsCloudMoonFill, BsCloudSunFill } from "react-icons/bs"

import { useSession } from "@blitzjs/auth"
import { Toggle } from "@src/core/components/common/Toggle"

const TopBar = () => {
  const { theme, setTheme } = useTheme()
  const session = useSession()

  return (
    <header className="w-full sticky top-0 z-10 flex gap-3 items-center justify-end bg-[#f5f8fa] dark:bg-[#1e1e2d] dark:text-gray-500 py-3 px-5">
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
      <Image
        className="w-10 h-10 rounded-full"
        alt="user-logo"
        width={40}
        height={40}
        src={session.imageUrl ?? "/svg/no-profile-picture-icon.svg"}
      />
    </header>
  )
}

export default TopBar
