import { ClockIcon } from "lucide-react"

export function Clock({ size = 16, className = "", ...props }) {
  return <ClockIcon size={size} className={className} {...props} />
}
