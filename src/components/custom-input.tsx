import { InputHTMLAttributes, forwardRef } from 'react'
import { Input } from './ui/input'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string | undefined
}

export const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ error, ...rest }, ref) => (
    <div ref={ref} className="w-full flex flex-col gap-1">
      <Input {...rest} />
      {!!error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
)
CustomInput.displayName = 'CustomInput'
