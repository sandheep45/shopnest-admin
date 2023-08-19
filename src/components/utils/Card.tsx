import React from 'react';

import { cn } from '@/lib/utils';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface ICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footerClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
}

const CardWrapper: React.FC<ICardProps> = ({
  children,
  title,
  className,
  description,
  footerClassName,
  headerClassName,
  contentClassName,
  titleClassName,
  ..._restProps
}) => {
  return (
    <Card
      className={cn(
        "flex flex-col gap-3 transition-all duration-300 dark:bg-[#1e1e2d] dark:text-gray-300 dark:shadow-slate-950",
        className
      )}
    >
      {title && (
        <CardHeader className={`${headerClassName}`}>
          <CardTitle className={`text-xl ${titleClassName}`}>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={`${contentClassName}`}>{children}</CardContent>

      {description && (
        <CardFooter
          className={`text-xs dark:text-gray-700 leading-relaxed text-gray-400 ${footerClassName}`}
        >
          {description}
        </CardFooter>
      )}
    </Card>
  );
};

export default CardWrapper;
