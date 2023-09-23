import { forwardRef } from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'

interface CustomSelectFormProps {
  form: UseFormReturn<any, any, undefined>
  name: string
  placeholder: string
  options: {
    value: string
    label: string
  }[]
}

export const CustomSelectForm = forwardRef<any, CustomSelectFormProps>(
  ({ form, name, placeholder, options }, _) => (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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
      )}
    />
  )
)
CustomSelectForm.displayName = 'CustomSelectForm'
