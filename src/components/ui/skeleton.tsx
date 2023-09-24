import { cn } from '@/utils/cn'

function Skeleton({ className, count, ...props }: React.HTMLAttributes<HTMLDivElement> & { count?: number }) {
  return (
    <>
      {Array.from({ length: count || 1 }, (_, i) => i).map((i) => (
        <div key={i} className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
      ))}
    </>
  )
}

export { Skeleton }
