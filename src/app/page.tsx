import Image from 'next/image'
import Logo from '../assets/logo.png'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function Login() {
  return (
    <div className="min-h-screen flex flex-row">
      <div className="flex flex-1 items-center justify-center">
        <Image src={Logo} alt="Logo" width="300" height="300" />
      </div>
      <form className="flex flex-col justify-center gap-4 w-2/6 bg-zinc-800 px-24">
        <div className="flex flex-col gap-2">
          <p className="text-xl">Acesso administrativo</p>
          <p className="text-md">Faça login em sua conta</p>
        </div>
        <div className="flex flex-col gap-6 items-center justify-center">
          <Input placeholder="E-mail" />
          <Input placeholder="Senha" />
          <Button className="w-full rounded-xl" size="lg">
            Entrar
          </Button>
        </div>
      </form>
    </div>
  )
}
