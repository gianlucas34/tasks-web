import { UseQueryOptions, useQuery } from 'react-query'
import { api } from '@/lib/axios'
import { Task } from '@/entities/Task'

const getTasks = async (id?: string) => {
  try {
    const { data } = await api.get('/tasks' + (id ? `/${id}` : ''))

    return data
  } catch (error: any) {
    throw error.response.data.error
  }
}

export function useGetTasks<T = 'list' | 'show'>(
  id?: string,
  options?: Pick<
    UseQueryOptions<T extends 'list' ? Task[] : Task, string>,
    'onSuccess' | 'onError' | 'enabled'
  >
) {
  const tasksCallback = async () => await getTasks(id)

  return useQuery<T extends 'list' ? Task[] : Task, string>(
    'tasks',
    tasksCallback,
    options
  )
}
