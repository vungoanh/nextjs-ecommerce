import * as React from 'react'
import { cn } from '@/utils/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'w-full resize-none rounded-md border border-neutral-lighter outline-none transition-all duration-200 placeholder:text-muted-foreground hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/30',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
