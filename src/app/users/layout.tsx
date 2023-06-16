import { Sidebar } from "../../components/Sidebar"

export const metadata = {
  title: 'Chat de mensagem | Users',
  description: 'Chat de mensagem | Users',
}

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Sidebar>
      <div className="h-full">
        {children}
      </div>
    </Sidebar>
  )
}
