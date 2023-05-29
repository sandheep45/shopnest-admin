import Image from "next/image"
import React from "react"

import { Toggle } from "@src/core/components/common/Toggle"

const TopBar = () => {
  return (
    <div className="w-full flex justify-end">
      <Toggle aria-label="toggle-theme"></Toggle>
      <Image alt="" src={""} />
    </div>
  )
}

export default TopBar
