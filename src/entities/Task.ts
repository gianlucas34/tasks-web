export interface Task {
  id?: string
  title: string
  description: string
  end_date: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  created_at?: string
  updated_at?: string
}
