"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange"> {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

function Select({ value, onValueChange, className, children, ...props }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
}

function SelectItem({ className, ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option className={cn("bg-popover text-popover-foreground", className)} {...props} />
}

function SelectTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <option value="">{placeholder}</option>
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

function SelectGroup({ children }: { children: React.ReactNode }) {
  return <optgroup>{children}</optgroup>
}

function SelectLabel({ className, children }: { className?: string; children: string }) {
  return <optgroup label={children} className={cn("font-semibold", className)} />
}

function SelectSeparator() {
  return null
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
