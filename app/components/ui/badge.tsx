import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--color-navy-premium)] text-white hover:bg-[var(--color-crimson-rich)]",
        secondary: "border-transparent bg-[var(--color-neutral-slate)] text-[var(--color-neutral-charcoal)]",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground border-border bg-background hover:bg-accent hover:text-accent-foreground",
        critical: "border-transparent bg-[var(--color-crimson-rich)] text-white shadow-sm font-bold uppercase tracking-wider text-xs",
        high: "border-transparent bg-[var(--color-gold-refined)] text-white shadow-sm font-bold uppercase tracking-wider text-xs",
        medium: "border-transparent bg-[var(--color-neutral-slate)] text-[var(--color-neutral-charcoal)] font-bold uppercase tracking-wider text-xs",
        low: "border-[var(--color-navy-premium)]/20 bg-[var(--color-navy-premium)]/10 text-[var(--color-navy-premium)] font-bold uppercase tracking-wider text-xs",
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
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
