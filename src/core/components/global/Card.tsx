import React from "react"

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardPrimitive,
  CardTitle,
} from "@src/core/components/common/CardPrimitive"
import { cn } from "@src/lib/utils"

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  footerClassName?: string
  headerClassName?: string
  contentClassName?: string
  titleClassName?: string
}

const Card: React.FC<ICardProps> = ({
  children,
  title,
  className,
  description,
  footerClassName,
  headerClassName,
  contentClassName,
  titleClassName,
  ...restProps
}) => {
  return (
    <CardPrimitive
      className={cn(
        "flex flex-col gap-3 transition-all duration-300 dark:bg-[#1e1e2d] dark:text-gray-300 dark:shadow-slate-950",
        className
      )}
    >
      <CardHeader className={headerClassName}>
        <CardTitle className={`text-xl ${titleClassName}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent className={`${contentClassName}`}>{children}</CardContent>
      <CardFooter
        className={`text-xs dark:text-gray-700 leading-relaxed text-gray-400 ${footerClassName}`}
      >
        {description}
      </CardFooter>
    </CardPrimitive>
  )
}

export default Card
