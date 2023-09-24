import { useMutation, UseMutationOptions } from 'react-query'
import { api } from '@/lib/axios'

const deleteTask = async (id: string) => {
  try {
    const { data } = await api.delete(`/tasks/${id}`)

    return data
  } catch (error: any) {
    throw error.response.data.error
  }
}

export const useDeleteTask = (
  options?: Pick<
    UseMutationOptions<string, string, string>,
    'onSuccess' | 'onError'
  >
) => useMutation<string, string, string>((id) => deleteTask(id), options)
