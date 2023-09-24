import { cva } from 'class-variance-authority'
import React from 'react'
import { cn } from '@/utils/cn'
import { omit } from 'lodash'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  wrapperClassName?: string
  label?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  error?: string | React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const rest = omit(props, ['wrapperClassName', 'label', 'defaultValue', 'customPrefix', 'customSuffix', 'error'])

  return (
    <div className={`mb-4 w-full ${props.wrapperClassName}`}>
      {props.label && (
        <div className="mb-2">
          <label htmlFor={props.name}>
            <span className="font-medium">{props.label}</span>
          </label>
        </div>
      )}

      <div className={`relative h-full w-full`}>
        {props.prefix && (
          <div className="pointer-events-none absolute top-2/4 flex -translate-y-2/4 items-center pl-5">
            {props.prefix}
          </div>
        )}
        <input
          ref={ref}
          {...rest}
          type={props.type ?? 'text'}
          prefix={''} // cheat to remove prefix from rest
          className={cn(
            inputVariants({
              state: props.disabled ? 'disabled' : props.error ? 'error' : 'normalize',
              extra: props.prefix ? 'prefix' : props.prefix ? 'suffix' : 'normalize'
            }),
            props.className
          )}
        />
        {props.suffix && (
          <div className="absolute right-0 top-2/4 flex -translate-y-2/4 items-center pr-5">{props.suffix}</div>
        )}
      </div>
      <p className={'mt-1 text-sm text-state-negative'}>{props.error}</p>
    </div>
  )
})

Input.displayName = 'Input'

export default Input

export const inputVariants = cva(
  'placeholder:text-neutral-tints transition-all duration-200 w-full border border-neutral-lighter outline-none hover:border-primary focus:border-primary',
  {
    variants: {
      size: {
        sm: 'text-sm rounded-sm h-[40px]',
        md: 'text-base rounded h-[52px]',
        lg: 'px-4 py-3 text-lg rounded-lg h-[64px]'
      },
      extra: {
        prefix: '!pl-14',
        suffix: '!pr-14',
        normalize: ''
      },

      state: {
        error: '!border-state-negative focus:ring-state-negative/30 focus:ring-2',
        normalize: 'focus:ring-primary/30 focus:ring-2',
        disabled: 'border-neutral-lighter bg-neutral-lighter text-neutral-tints'
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
