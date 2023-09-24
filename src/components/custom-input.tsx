import { HTMLInputTypeAttribute, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from './ui/input'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'

interface CustomInputProps {
  name: string
  placeholder: string
  type?: HTMLInputTypeAttribute
}

export const CustomInput = forwardRef<any, CustomInputProps>(
  ({ name, placeholder, type }, _) => {
    const { control } = useFormContext()

    return (
      <FormField
        name={name}
        control={control}
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
  }
)
CustomInput.displayName = 'CustomInput'
