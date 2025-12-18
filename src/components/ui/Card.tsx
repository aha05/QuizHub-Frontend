import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type CardProps = {
  children: React.ReactNode
  asChild?: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export function Card({ children, asChild = false, className, ...props }: CardProps) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      className={cn("bg-white rounded-xl shadow p-5 space-y-3", className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
