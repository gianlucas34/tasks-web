import { forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'

interface CustomDatePickerProps {
  name: string
  placeholder: string
}

export const CustomDatePicker = forwardRef<any, CustomDatePickerProps>(
  ({ name, placeholder }, _) => {
    const { control } = useFormContext()

    return (
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            <Popover>
              <PopoverTrigger
                asChild
                data-selected={!!field.value}
                className="hover:bg-transparent hover:text-muted-foreground hover:data-[selected=true]:text-white"
              >
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full border-muted-foreground pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'dd-MM-yyyy')
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  initialFocus
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
            <FormMessage className="text-red-600" />
          </FormItem>
        )}
      />
    )
  }
)
CustomDatePicker.displayName = 'CustomDatePicker'
