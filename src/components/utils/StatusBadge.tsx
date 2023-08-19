import React from 'react';

import { cn } from '@/lib/utils';
import { Status } from '@prisma/client';

import { Badge } from '../ui/badge';

interface IStatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status;
}

const StatusBadge: React.FC<IStatusBadgeProps> = ({
  status,
  className,
  ...restProps
}) => {
  let badgeClassName = cn(className);

  // Apply different styles based on the status
  switch (status) {
    case Status.PUBLISHED:
      badgeClassName += " bg-green-500/20 text-green-500/60";
      break;
    case Status.DRAFT:
      badgeClassName += " bg-yellow-500/20 text-yellow-500/60";
      break;
    case Status.INACTIVE:
      badgeClassName += " bg-gray-500/20 text-gray-500/60";
      break;
    case Status.SCHEDULED:
      badgeClassName += " bg-blue-500/20 text-blue-500/60";
      break;
    default:
      break;
  }

  return (
    <Badge className={badgeClassName} {...restProps}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
