import { UserApi } from '@/api'
import { Button } from '@/components/Elements'
import { AuthLayout, MainLayout } from '@/components/Layouts'
import { Table } from '@/components/Table'
import { User } from '@/components/User'
import { UserTypes } from '@/types'
import { Dialog, Transition } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'
import { UserForm } from './components'
import { useGlobalNotification } from '@/hooks'

const ManagerUsers = () => {
  const [users, setUsers] = useState<UserTypes.Instance[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formError, setFormError] = useState<string>('')
  const { showNotification, hiddenNotification } = useGlobalNotification()
  const fetchUsers = async () => {
    try {
      const users = await UserApi.gets()
      setUsers(users)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleOpenForm = () => {
    setShowForm(true)
  }

  const handleAddUser = async (user: UserTypes.Create) => {
    try {
      await UserApi.add(user)
      fetchUsers()
      handleCloseForm()
    } catch (error: any) {
      setFormError(error.error)
    }
  }

  const handleDeleteUser = (uuid: string) => {
    showNotification({
      isConfirm: true,
      title: 'Xoá người dùng',
      message: 'Bạn có chắc chắn muốn xoá người dùng này?',
      onConfirm: async () => {
        try {
          await UserApi.remove(uuid)
          fetchUsers()
          hiddenNotification()
        } catch (error) {
          console.log(error)
        }
      },
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <AuthLayout>
      <MainLayout>
        <main className="bg-gray-100">
          <div className="container flex pt-4 items-center">
            <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
            <Button
              size="sm"
              color="border"
              className="border-primary text-primary ml-2"
            >
              <ArrowPathIcon height={24} /> Làm mới
            </Button>
          </div>
          <div className="flex justify-end container mb-4">
            <Button onClick={handleOpenForm}>Thêm người dùng</Button>
          </div>
          <div className="container bg-white py-4">
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>ID</Table.HeadCell>
                  <Table.HeadCell>Người dùng</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Quyền</Table.HeadCell>
                  <Table.HeadCell></Table.HeadCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {users.map((user) => (
                  <Table.Row
                    key={user.uuid}
                    className="border-b border-gray-100"
                  >
                    <Table.Cell>{user.uuid}</Table.Cell>
                    <Table.Cell>
                      <User
                        src={user.avatar}
                        name={user.username}
                        alt={user.username}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <span className="text-blue-500">{user.email}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <button className="cursor-pointer px-2 py-1 border rounded-md w-full hover:bg-gray-200 transition">
                        {user.isAdmin ? 'Admin' : 'Người dùng'}
                      </button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        size="sm"
                        color="reverse"
                        className="hover:bg-red-500 hover:text-white text-red-500"
                        onClick={() => handleDeleteUser(user.uuid)}
                      >
                        Xoá
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </main>
        <Transition as={Fragment} show={showForm}>
          <Dialog as="div" onClose={handleCloseForm}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-xl font-medium leading-6 text-gray-900"
                    >
                      Thêm người dùng
                    </Dialog.Title>
                    <div className="mt-2">
                      <UserForm onAdd={handleAddUser} error={formError} />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </MainLayout>
    </AuthLayout>
  )
}

export default ManagerUsers
