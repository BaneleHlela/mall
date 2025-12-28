import { forwardRef } from "react"

export interface SpacerProps {
  className?: string
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`tiptap-spacer flex-1 ${className || ""}`}
        {...props}
      />
    )
  }
)

Spacer.displayName = "Spacer"
