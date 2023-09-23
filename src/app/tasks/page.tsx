'use client'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader } from '@/components/loader'
import { useGetTasks } from '@/services/tasks/useGetTasks'
import { handlePriorities } from '@/utils/handlePriorities'

export default function TasksPage() {
  const router = useRouter()
  const { data, isLoading } = useGetTasks<'list'>()

  return isLoading ? (
    <Loader isLarge />
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center w-6/12 bg-zinc-800 p-6 rounded-md gap-4">
        <div className="flex items-center justify-between">
          <Label className="text-xl">Minhas tarefas</Label>
          <Button onClick={() => router.push('/tasks/create')}>
            CRIAR <Plus className="w-4 h-4 ml-2" />
          </Button>
        </div>
        {data?.map((task) => (
          <div key={task.id} className="flex flex-col rounded-md">
            <div className="flex items-center bg-zinc-700 h-10 rounded-t-md gap-4 px-6">
              <Label className="text-md">{task.title}</Label>
              <div
                className={`${
                  handlePriorities[task.priority].bgColor
                } rounded-full`}
              >
                <p className="text-xs px-2 py-1 text-black">
                  {handlePriorities[task.priority].translatedName}
                </p>
              </div>
              <div className="bg-yellow-500 rounded-full">
                <p className="text-xs px-2 py-1 text-black">
                  {format(parseISO(task.created_at || ''), 'dd-MM-yyyy')}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-3 bg-zinc-600">
              <div className="flex flex-col gap-2">
                <p className="text-md">{task.description}</p>
                <div className="flex flex-col gap-1">
                  <p className="flex text-sm gap-1">
                    Atualizada pela última vez em:{' '}
                    <span className="font-bold">
                      {format(parseISO(task.updated_at || ''), 'dd-MM-yyyy')}
                    </span>
                  </p>
                  <p className="flex text-sm gap-1">
                    Data de vencimento:{' '}
                    <span className="font-bold">{task.end_date}</span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-green-600 text-black hover:bg-green-600/80">
                  Editar
                </Button>
                <Button className="bg-red-600 text-black hover:bg-red-600/80">
                  Deletar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
