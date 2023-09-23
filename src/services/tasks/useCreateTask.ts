import { useMutation, UseMutationOptions } from 'react-query'
import { api } from '@/lib/axios'
import { Task } from '@/entities/Task'

const createTask = async (task: Task) => {
  try {
    const { data } = await api.post('/tasks', task)

    return data
  } catch (error: any) {
    throw error.response.data.error
  }
}

export const useCreateTask = (
  options?: Pick<
    UseMutationOptions<Task, string, Task>,
    'onSuccess' | 'onError'
  >
) => useMutation<Task, string, Task>(createTask, options)
