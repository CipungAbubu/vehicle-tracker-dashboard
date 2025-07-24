'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from './../../lib/utils';

export const TooltipProvider = TooltipPrimitive.Provider;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = ({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>) => (
  <TooltipPrimitive.Content
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md bg-black px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95',
      className
    )}
    {...props}
  />
);

export const Tooltip = TooltipPrimitive.Root;
