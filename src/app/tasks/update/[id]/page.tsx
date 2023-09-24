'use client'
import CreateTaskPage from '../../create/page'

export default function UpdateTaskPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return <CreateTaskPage id={id} />
}
