import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'

interface CustomSelectFormProps {
  name: string
  placeholder: string
  options: {
    value: string
    label: string
  }[]
}

export const CustomSelectForm = forwardRef<any, CustomSelectFormProps>(
  ({ name, placeholder, options }, _) => {
    const { control } = useFormContext()

    return (
      <FormField
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <Select
                key={`select-${field.value}`}
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    data-selected={!!field.value}
                    className="data-[selected=true]:text-white"
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-600" />
            </FormItem>
          )
        }}
      />
    )
  }
)
CustomSelectForm.displayName = 'CustomSelectForm'
