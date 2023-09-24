'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import cookie from 'js-cookie'
import Logo from '../assets/logo.png'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/custom-input'
import { Loader } from '@/components/loader'
import { Form } from '@/components/ui/form'
import { TOKEN_COOKIE } from '@/constants/cookies'
import { USER_EMAIL_LOCAL_STORAGE } from '@/constants/localstorage'
import { useSignIn } from '@/services/auth/useSignIn'

export default function Login() {
  const formSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido!' }),
    password: z
      .string()
      .nonempty({ message: 'A senha não pode ficar em branco!' }),
  })

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutateAsync, isLoading } = useSignIn({
    onSuccess: (data) => {
      localStorage.setItem(USER_EMAIL_LOCAL_STORAGE, data.email)
      cookie.set(TOKEN_COOKIE, data.access_token)

      router.replace('/tasks')
    },
    onError: (error) => {
      toast(error, { type: 'error' })
    },
  })

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 items-center justify-center">
        <Image priority src={Logo} alt="Logo" width="300" height="300" />
      </div>
      <div className="flex flex-col justify-center w-2/6 bg-zinc-800 px-32">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (values) => await mutateAsync(values)
            )}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <p className="text-xl">Acesso administrativo</p>
              <p className="text-md">Faça login em sua conta</p>
            </div>
            <div className="flex flex-col gap-6 justify-center">
              <CustomInput name="email" placeholder="E-mail" />
              <CustomInput
                name="password"
                placeholder="Senha"
                type="password"
              />
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Loader /> : 'Entrar'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
