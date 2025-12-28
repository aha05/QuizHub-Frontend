"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle as CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

// --------- RadioGroup Wrapper ---------
interface RadioGroupProps extends React.ComponentProps<typeof RadioGroupPrimitive.Root> {}

export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-3", className)}
      data-slot="radio-group"
      {...props}
    />
  )
}

// --------- RadioGroupItem Wrapper ---------
interface RadioGroupItemProps extends React.ComponentProps<typeof RadioGroupPrimitive.Item> {}

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "relative flex items-center justify-center aspect-square size-4 rounded-full border-2 border-muted-foreground border-input shadow-xs bg-input/30 text-primary focus-visible:border-ring focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 bg-muted",
        className
      )}
      data-slot="radio-group-item"
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className="absolute flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        data-slot="radio-group-indicator"
      >
        <CircleIcon className="size-2 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
