'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { cn } from '@/utils/cn'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: string | React.ReactNode }
>(({ className, children, ...props }, ref) => {
  return (
    <>
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          select({
            state: props.error ? 'error' : 'normalize'
          }),
          'ring-offset-background flex w-full items-center justify-between rounded border bg-transparent placeholder:text-muted-foreground focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <p className={'mt-1 text-sm text-state-negative'}>{props.error}</p>
    </>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded border bg-white shadow-md animate-in fade-in-80',
        position === 'popper' && 'translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-none  border-b border-b-neutral-lightest px-4 py-3 pr-2 text-base text-neutral-tints outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    {/*<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">*/}
    {/*  <SelectPrimitive.ItemIndicator>*/}
    {/*    <Check className="h-4 w-4" />*/}
    {/*  </SelectPrimitive.ItemIndicator>*/}
    {/*</span>*/}

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator }

const select = cva(
  'placeholder:text-neutral-tints transition-all duration-200 w-full border border-neutral-lighter outline-none hover:border-primary focus:border-primary',
  {
    variants: {
      size: {
        sm: 'text-sm rounded-sm h-[40px]',
        md: 'text-base rounded h-[52px]',
        lg: 'px-4 py-3 text-lg rounded-lg h-[64px]'
      },
      state: {
        error: 'border-state-negative',
        normalize: 'border-neutral-lighter'
      }
    },
    compoundVariants: [
      {
        size: ['sm', 'md'],
        class: 'px-5 py-1'
      }
    ],
    defaultVariants: {
      size: 'md'
    }
  }
)
