import { Button } from '@/components/Elements'
import { AuthLayout, MainLayout } from '@/components/Layouts'
import { Table } from '@/components/Table'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { AddTopicForm } from './components'
import { PostTypes } from '@/types'
import { TopicApi } from '@/api'
import { useGlobalNotification } from '@/hooks'

const ManagerTopics = () => {
  const [showForm, setShowForm] = useState(false)
  const [topics, setTopics] = useState<PostTypes.Topic[]>([])
  const { showNotification, hiddenNotification } = useGlobalNotification()
  const fetchTopics = async () => {
    try {
      const topics = await TopicApi.gets()
      setTopics(topics)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTopics()
  }, [])

  const handleCloseForm = () => {
    setShowForm(false)
  }

  const handleOpenForm = () => {
    setShowForm(true)
  }

  const handleSubmitForm = async (topicName: string) => {
    try {
      await TopicApi.add(topicName)
      setShowForm(false)
      await fetchTopics()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteTopic = (topicId: string) => {
    showNotification({
      title: 'Xoá chủ đề',
      message: 'Bạn có chắc muốn xoá chủ đề này?',
      isConfirm: true,
      onConfirm: async () => {
        try {
          await TopicApi.remove(topicId)
          await fetchTopics()
        } catch (error) {
          console.log(error)
        } finally {
          hiddenNotification()
        }
      },
      confirmText: 'Xoá',
    })
  }

  return (
    <AuthLayout>
      <MainLayout>
        <main className="bg-gray-100">
          <h1 className="text-2xl font-semibold pt-2 container">
            Quản lý chủ đề
          </h1>
          <div className="container">
            <div className="mb-4 flex justify-end">
              <Button className="" onClick={handleOpenForm}>
                Thêm chủ đề
              </Button>
            </div>
            <div className="bg-white py-4 rounded-md">
              <Table>
                <Table.Head>
                  <Table.Row className="border-b border-gray-200">
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Tên chủ đề</Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {topics.map((topic) => (
                    <Table.Row
                      className="border-b border-gray-200"
                      key={topic.uuid}
                    >
                      <Table.Cell>{topic.uuid}</Table.Cell>
                      <Table.Cell>{topic.name}</Table.Cell>
                      <Table.Cell>
                        <Button
                          size="sm"
                          color="reverse"
                          className="hover:bg-red-500 hover:text-white text-red-500"
                          onClick={() => handleDeleteTopic(topic.uuid)}
                        >
                          Xoá
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
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
                      Thêm chủ đề
                    </Dialog.Title>
                    <div className="">
                      <AddTopicForm onSubmit={handleSubmitForm} />
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

export default ManagerTopics
