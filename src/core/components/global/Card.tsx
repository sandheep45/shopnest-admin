import React from "react"

import {
  CardContent,
  CardHeader,
  CardPrimitive,
  CardTitle,
} from "@src/core/components/common/CardPrimitive"
import { cn } from "@src/lib/utils"

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

const Card: React.FC<ICardProps> = ({ children, title, className, ...restProps }) => {
  return (
    <CardPrimitive
      className={cn(
        "flex flex-col gap-3 transition-all duration-300 dark:bg-[#1e1e2d] dark:text-gray-300 dark:shadow-slate-950",
        className
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardPrimitive>
  )
}

export default Card
