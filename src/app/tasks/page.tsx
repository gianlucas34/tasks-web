'use client'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CustomSelect } from '@/components/custom-select'
import { useGetTasks } from '@/services/tasks/useGetTasks'

export default function TasksPage() {
  const { data } = useGetTasks<'list'>()

  return (
    <div className="flex flex-col min-h-screen flex-1 items-center justify-center">
      <div className="w-5/12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Label className="text-xl">Minhas tarefas</Label>
            <CustomSelect
              placeholder="Prioridade"
              options={[
                { value: 'LOW', label: 'Baixa' },
                { value: 'MEDIUM', label: 'Média' },
                { value: 'HIGH', label: 'Alta' },
              ]}
            />
          </div>
          <Button>
            CRIAR <Plus className="w-4 h-4" />
          </Button>
        </div>
        {data?.map((task) => (
          <div key={task.id} className="bg-zinc-700 h-52 rounded-md">
            <div className="bg-zinc-800 h-10 rounded-t-md"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
