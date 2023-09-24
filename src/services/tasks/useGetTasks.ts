import { UseQueryOptions, useQuery } from 'react-query'
import { api } from '@/lib/axios'
import { Task } from '@/entities/Task'

interface GetTasksProps {
  id?: string
  priority?: Task['priority']
}

const getTasks = async (params?: GetTasksProps) => {
  try {
    const { data } = await api.get(
      '/tasks' +
        (params?.id ? `/${params.id}` : '') +
        (params?.priority ? `?priority=${params.priority}` : '')
    )

    return data
  } catch (error: any) {
    throw error.response.data.error
  }
}

export function useGetTasks<T = 'list' | 'show'>(
  params?: GetTasksProps,
  options?: Pick<
    UseQueryOptions<T extends 'list' ? Task[] : Task, string>,
    'onSuccess' | 'onError' | 'enabled'
  >
) {
  const tasksCallback = async () => await getTasks(params)

  return useQuery<T extends 'list' ? Task[] : Task, string>(
    ['tasks', params?.priority],
    tasksCallback,
    options
  )
}
