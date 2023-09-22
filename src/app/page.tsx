'use client'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import cookie from 'js-cookie'
import Logo from '../assets/logo.png'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/custom-input'
import { Loader } from '@/components/loader'
import { TOKEN_COOKIE } from '@/constants/cookies'
import { USER_EMAIL_LOCAL_STORAGE } from '@/constants/localstorage'
import { SignInProps, useSignIn } from '@/services/auth/useSignIn'

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>()
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
    <div className="min-h-screen flex flex-row">
      <div className="flex flex-1 items-center justify-center">
        <Image priority src={Logo} alt="Logo" width="300" height="300" />
      </div>
      <form
        onSubmit={handleSubmit(async (values) => await mutateAsync(values))}
        className="flex flex-col justify-center gap-4 w-2/6 bg-zinc-800 px-32"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xl">Acesso administrativo</p>
          <p className="text-md">Faça login em sua conta</p>
        </div>
        <div className="flex flex-col gap-6 items-center justify-center">
          <CustomInput
            placeholder="E-mail"
            type="email"
            error={errors.email?.message}
            {...register('email', {
              required: 'O e-mail não pode ficar em branco!',
            })}
          />
          <CustomInput
            placeholder="Senha"
            type="password"
            error={errors.email?.message}
            {...register('password', {
              required: 'O e-mail não pode ficar em branco!',
            })}
          />
          <Button disabled={isLoading} type="submit" className="w-full">
            {isLoading ? <Loader /> : 'Entrar'}
          </Button>
        </div>
      </form>
    </div>
  )
}
