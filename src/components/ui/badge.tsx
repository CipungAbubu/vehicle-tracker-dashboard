import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium transition-colors shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-[#F97362] text-white hover:bg-[#f45c51]", 
        success: "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30", 
        inactive: "bg-[#FDF6F0] text-[#A43F3F] border border-[#F3E5DC]", 
        outline: "border border-[#8C3D3D] text-[#8C3D3D] bg-transparent hover:bg-[#FDF6F0]", 
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
