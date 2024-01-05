import { AuthLayout, MainLayout } from '@/components/Layouts'
import { FieldBox } from './components'
import { FieldInput, FieldText, FieldUploadImage } from '@/components/Form'
import {
  MapPinIcon,
  PencilSquareIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline'
import { TopicSelect } from '@/components/Post'
import { Button } from '@/components/Elements'
import { useFormValidator } from '@/hooks'
import { validateUpload } from './validators'
import { useCallback, useEffect, useState } from 'react'
import { Alter } from '@/components/Alter'
import { PostApi } from '@/api'
import { SelectOption } from '@/components/Form/FieldSelect'

const UploadPost = () => {
  const { getFieldProps, getFormValidationResult, resetForm, getSetFieldFunc } =
    useFormValidator(validateUpload)

  const [topic, setTopic] = useState<SelectOption>({} as SelectOption)
  const [images, setImages] = useState<File[]>([])
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  }>({
    type: 'error',
    message: '',
  })
  const [isUpload, setIsUpload] = useState(false)

  const handleUpload = async () => {
    setIsUpload(true)
    const result = getFormValidationResult()
    if (!result.isValid) {
      setNotification({
        message: 'Vui lòng điền đầy đủ thông tin',
        type: 'error',
      })
      window.scrollTo(0, 0)
      setIsUpload(false)
      return
    }

    if (!topic) {
      setNotification({
        message: 'Vui lòng chọn chủ đề',
        type: 'error',
      })

      window.scrollTo(0, 0)
      setIsUpload(false)
      return
    }

    setNotification({
      message: '',
      type: 'success',
    })

    try {
      await PostApi.upload({
        title: result.fields.title,
        content: result.fields.content,
        location: result.fields.location,
        topic: topic?.value,
        images,
      })
      setNotification({
        message: 'Đăng tin thành công, vui lòng chờ quản trị viên phê duyệt!',
        type: 'success',
      })

      resetForm()
      setImages([])
      setTopic({} as SelectOption)
    } catch (error: any) {
      setNotification({
        message: error.error || 'Có lỗi xảy ra, vui lòng thử lại sau',
        type: 'error',
      })
    }
    window.scrollTo(0, 0)
    setIsUpload(false)
  }

  const handleTopicChange = useCallback((value: SelectOption) => {
    setTopic(value)
  }, [])

  const handleImagesUpload = useCallback((files: File[]) => {
    setImages(files)
  }, [])

  useEffect(() => {
    return () => {
      setNotification({
        message: '',
        type: 'error',
      })
    }
  }, [])

  return (
    <AuthLayout>
      <MainLayout className="bg-gray-100">
        <main className="container ">
          <h1 className="text-center pt-10 pb-6">
            <span className="text-2xl font-bold">Tạo bài viết</span>
          </h1>
          {notification.message && (
            <div className="mb-4">
              <Alter {...notification} />
            </div>
          )}
          <FieldBox
            title="Geneal"
            logo={<PencilSquareIcon height={22} color="white" />}
            className="mb-6"
          >
            <FieldBox.Item title="Tiêu đề">
              <FieldInput {...getFieldProps('title')} />
            </FieldBox.Item>
            <FieldBox.Item title="Chủ đề">
              <TopicSelect value={topic} onChange={handleTopicChange} />
            </FieldBox.Item>
            <FieldBox.Item title="Mô tả">
              <FieldText
                value={getFieldProps('content').value}
                onChange={(e) => getSetFieldFunc('content')(e.target.value)}
              />
            </FieldBox.Item>
          </FieldBox>
          <FieldBox
            className="mb-6"
            logo={<MapPinIcon height={22} color="white" />}
            title="Địa chỉ"
          >
            <FieldBox.Item title="Địa chỉ">
              <FieldInput {...getFieldProps('location')} />
            </FieldBox.Item>
          </FieldBox>
          <FieldBox
            logo={<PhotoIcon height={22} color="white" />}
            className="mb-6"
            title="Ảnh"
          >
            <FieldBox.Item title="Ảnh đồ thất lạc">
              <FieldUploadImage
                value={images}
                multiple
                setValue={handleImagesUpload}
              />
            </FieldBox.Item>
          </FieldBox>
          <Button className="w-full" loading={isUpload} onClick={handleUpload}>
            Đăng tin
          </Button>
        </main>
      </MainLayout>
    </AuthLayout>
  )
}

export default UploadPost
