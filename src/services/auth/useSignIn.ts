import { useMutation, UseMutationOptions } from 'react-query'
import { api } from '@/lib/axios'

interface SignInProps {
  email: string
  password: string
}

interface SignInReturnProps {
  email: string
  access_token: string
}

const signIn = async ({ email, password }: SignInProps) => {
  try {
    const { data } = await api.post('/signin', { email, password })

    return data
  } catch (error: any) {
    throw error.response.data.error
  }
}

export const useSignIn = (
  options?: Pick<
    UseMutationOptions<SignInReturnProps, string, SignInProps>,
    'onSuccess' | 'onError'
  >
) => useMutation<SignInReturnProps, string, SignInProps>(signIn, options)
