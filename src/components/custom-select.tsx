import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CustomSelectProps {
  placeholder: string
  options: {
    value: string
    label: string
  }[]
}

export const CustomSelect = ({ placeholder, options }: CustomSelectProps) => (
  <div className="space-y-2">
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)
