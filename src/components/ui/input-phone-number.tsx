import React from 'react'
import { Controller } from 'react-hook-form'
import { FieldPath, FieldPathValue, FieldValues } from 'react-hook-form/dist/types'
import { Control } from 'react-hook-form/dist/types/form'
import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import PhoneInput from 'react-phone-number-input/input'
import { cn } from '@/utils/cn'
import { inputVariants } from '@/components/ui/input'

type Props<T extends FieldValues> = {
  control: Control<T>
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
  defaultValue?: FieldPathValue<T, FieldPath<T>>
  shouldUnregister?: boolean
  name: FieldPath<T>
  label?: string
  placeholder?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  className?: string
  disabled?: boolean
  type?: 'text' | 'password'
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  wrapperClassName?: string
  maxLength?: number
}

function InputPhoneNumber<T extends FieldValues>(props: Props<T>) {
  return (
    <div className={`mb-4 w-full ${props.wrapperClassName}`}>
      {props.label && (
        <div className="mb-2">
          <label htmlFor={props.name}>
            <span className="font-medium">{props.label}</span>
          </label>
        </div>
      )}

      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        name={props.name}
        rules={props.rules}
        render={({ field, fieldState }) => {
          return (
            <>
              <div className={`relative h-full w-full`}>
                {props.prefix && (
                  <div className="pointer-events-none absolute top-2/4 flex -translate-y-2/4 items-center pl-5">
                    {props.prefix}
                  </div>
                )}
                <PhoneInput
                  {...field}
                  disabled={props.disabled}
                  maxLength={props.maxLength}
                  onBlur={() => {
                    // props.onBlur && props.onBlur(e);
                    field.onBlur()
                  }}
                  type={props.type ?? 'text'}
                  name={props.name}
                  placeholder={props.placeholder}
                  className={cn(
                    inputVariants({
                      state: fieldState.invalid ? 'error' : 'normalize',
                      extra: props.prefix ? 'prefix' : 'normalize'
                    }),
                    props.className,
                    'disabled:bg-slate-50'
                  )}
                  international={false}
                  defaultCountry="US"
                />
                {props.suffix && (
                  <div className="pointer-events-none absolute right-0 top-2/4 flex -translate-y-2/4 items-center pr-5">
                    {props.suffix}
                  </div>
                )}
              </div>
              <p className={'mt-1 text-sm text-state-negative'}>{fieldState.error && fieldState.error.message}</p>
            </>
          )
        }}
      />
    </div>
  )
}

export default InputPhoneNumber
