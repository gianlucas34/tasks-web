'use client'
import { z } from 'zod'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { CustomInput } from '@/components/custom-input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CustomSelectForm } from '@/components/custom-select-form'
import { useCreateTask } from '@/services/tasks/useCreateTask'
import { Form } from '@/components/ui/form'
import { CustomDatePicker } from '@/components/custom-date-picker'
import { Loader } from '@/components/loader'

export default function CreateTaskPage() {
  const formSchema = z.object({
    title: z
      .string()
      .nonempty({ message: 'O título não pode ficar em branco!' }),
    description: z
      .string()
      .nonempty({ message: 'A descrição não pode ficar em branco!' }),
    end_date: z.date({
      required_error: 'A data de vencimento não pode ficar em branco!',
    }),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
      required_error: 'A prioridade não pode ficar em branco!',
    }),
  })

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { mutateAsync, isLoading } = useCreateTask({
    onSuccess: () => {
      toast('Tarefa criada com sucesso!', { type: 'success' })

      router.push('/tasks')
    },
    onError: (error) => {
      toast(error, { type: 'error' })
    },
  })

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col w-3/12 gap-3 bg-zinc-800 p-8 rounded-md">
        <Label className="text-xl">Criar tarefa</Label>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (values) =>
                await mutateAsync({
                  ...values,
                  end_date: format(values.end_date, 'dd-MM-yyyy'),
                })
            )}
            className="flex flex-col gap-6"
          >
            <CustomInput form={form} name="title" placeholder="Título" />
            <CustomInput
              form={form}
              name="description"
              placeholder="Descrição"
            />
            <CustomDatePicker
              form={form}
              name="end_date"
              placeholder="Data de vencimento"
            />
            <CustomSelectForm
              form={form}
              name="priority"
              placeholder="Prioridade"
              options={[
                { value: 'LOW', label: 'Baixa' },
                { value: 'MEDIUM', label: 'Média' },
                { value: 'HIGH', label: 'Alta' },
              ]}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loader /> : 'Salvar'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
