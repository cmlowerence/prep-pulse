import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;        // 0–100
  colorClass?: string;  // bar color
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, colorClass = "bg-indigo-600", ...props }, ref) => {
    const cleanValue = Math.min(100, Math.max(0, value)) // clamp

    return (
      <div
        ref={ref}
        className={cn(
          "h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
          className
        )}
        {...props}
      >
        <div
          className={cn("h-full transition-all duration-500 ease-out", colorClass)}
          style={{ width: `${cleanValue}%` }}
        />
      </div>
    )
  }
)
ProgressBar.displayName = "ProgressBar"

export { ProgressBar }