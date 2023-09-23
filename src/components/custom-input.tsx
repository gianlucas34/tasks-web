import { HTMLInputTypeAttribute, forwardRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Input } from './ui/input'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'

interface CustomInputProps {
  form: UseFormReturn<any, any, undefined>
  name: string
  placeholder: string
  type?: HTMLInputTypeAttribute
}

export const CustomInput = forwardRef<any, CustomInputProps>(
  ({ form, name, placeholder, type }, _) => (
    <FormField
      name={name}
      control={form.control}
      defaultValue=""
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage className="text-red-600" />
        </FormItem>
      )}
    />
  )
)
CustomInput.displayName = 'CustomInput'
