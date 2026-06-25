"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

interface DialogContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue>({
  open: false,
  onOpenChange: () => {},
})

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const handleOpenChange = React.useCallback(
    (value: boolean) => {
      setInternalOpen(value)
      onOpenChange?.(value)
    },
    [onOpenChange]
  )

  return (
    <DialogContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <button
      type="button"
      className={className}
      onClick={() => onOpenChange(true)}
      {...props}
    >
      {children}
    </button>
  )
}

function DialogContent({
  children,
  className,
  ...props
}: React.DialogHTMLAttributes<HTMLDialogElement>) {
  const { open, onOpenChange } = React.useContext(DialogContext)
  const ref = React.useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    if (ref.current) {
      if (open) {
        ref.current.showModal()
      } else {
        ref.current.close()
      }
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      className={cn(
        "backdrop:bg-black/60 rounded-xl border bg-popover p-0 shadow-lg open:animate-in open:fade-in-0 open:zoom-in-95 open:data-[state=closed]:animate-out open:data-[state=closed]:fade-out-0 open:data-[state=closed]:zoom-out-95",
        className
      )}
      onClose={() => onOpenChange(false)}
      onClick={(e) => {
        if (e.target === ref.current) onOpenChange(false)
      }}
      {...props}
    >
      <div className="p-4">
        {children}
      </div>
    </dialog>
  )
}

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("font-heading text-base leading-none font-medium", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function DialogClose({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { onOpenChange } = React.useContext(DialogContext)
  return (
    <button
      type="button"
      className={className}
      onClick={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </button>
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}
