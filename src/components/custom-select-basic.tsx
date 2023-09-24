import { forwardRef } from 'react'
import { Task } from '@/entities/Task'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CustomSelectBasicProps {
  value?: Task['priority']
  placeholder: string
  options: {
    value: string
    label: string
  }[]
  onChange: (value: Task['priority']) => void
}

export const CustomSelectBasic = forwardRef<any, CustomSelectBasicProps>(
  ({ value, placeholder, options, onChange }, _) => (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger
        data-selected={!!value}
        className="data-[selected=true]:text-white"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
)
CustomSelectBasic.displayName = 'CustomSelectBasic'
