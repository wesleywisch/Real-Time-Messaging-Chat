import { getUsers } from "../../actions/getUsers"
import { Sidebar } from "../../components/Sidebar"
import { UserList } from "../../components/Users/UserList";

export const metadata = {
  title: 'Chat de mensagem | Users',
  description: 'Chat de mensagem | Users',
}

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />

        {children}
      </div>
    </Sidebar>
  )
}
