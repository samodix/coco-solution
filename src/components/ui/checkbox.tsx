"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

function Checkbox({ className, checked, onCheckedChange, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={cn(
        "h-4 w-4 shrink-0 rounded-[4px] border border-primary bg-transparent text-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 accent-primary",
        className
      )}
      {...props}
    />
  )
}

export { Checkbox }
