import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 ease-in-out ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97362]/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-[#F97362] text-white hover:bg-[#f8614f] hover:shadow-md",
        secondary: "bg-[#FDF6F0] text-[#2E2E2E] border border-[#F3E5DC] hover:bg-[#f7ede7]",
        ghost: "bg-transparent text-[#8C3D3D] hover:bg-[#FDF6F0] hover:text-[#A43F3F] border border-transparent hover:border-[#F3E5DC]",
        destructive: "bg-[#A43F3F] text-white hover:bg-[#8C3D3D]",
        outline: "border border-[#8C3D3D] text-[#8C3D3D] bg-transparent hover:bg-[#FDF6F0]",
        link: "text-[#F97362] underline underline-offset-4 hover:text-[#8C3D3D]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 py-1.5 rounded-lg text-sm",
        lg: "h-12 px-6 py-3 text-base rounded-2xl",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
