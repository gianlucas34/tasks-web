import { useMutation, UseMutationOptions } from 'react-query'
import { api } from '@/lib/axios'
import { Task } from '@/entities/Task'

const createOrUpdateTask = async (task: Task) => {
  try {
    const route = task.id ? `/tasks/${task.id}` : '/tasks'
    const method = task.id ? api.put : api.post
    const { data } = await method(route, task)

    return data
  } catch (error: any) {
    throw error.response.data.error
  }
}

export const useCreateOrUpdateTask = (
  options?: Pick<
    UseMutationOptions<Task, string, Task>,
    'onSuccess' | 'onError'
  >
) => useMutation<Task, string, Task>(createOrUpdateTask, options)
