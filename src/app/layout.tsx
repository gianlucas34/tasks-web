import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import { ReactQueryProvider } from '@/components/providers/react-query-provider'

const workSans = Work_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tasks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={workSans.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
