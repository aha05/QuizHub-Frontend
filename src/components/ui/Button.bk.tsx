import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "success" | "danger"
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const base = "px-4 py-2 rounded-lg font-medium transition"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    // primary_dark: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  }

  return (
    <Comp
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], disabled ? "opacity-50 cursor-not-allowed" : "", className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
