'use client';

import * as React from 'react';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = React.forwardRef(function CollapsibleTrigger(
  {
    className,
    children,
    ...props
  }: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  ref: React.Ref<React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>>
) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between rounded-md px-4 py-2 text-left font-medium transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
});

const CollapsibleContent = React.forwardRef(function CollapsibleContent(
  {
    className,
    ...props
  }: React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  ref: React.Ref<React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>>
) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      ref={ref}
      className={cn(
        'data-[state=closed]:slide-up-2 data-[state=open]:slide-down-2 overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out',
        className
      )}
      {...props}
    />
  );
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
