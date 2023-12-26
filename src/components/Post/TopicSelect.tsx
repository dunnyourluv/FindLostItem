import { memo, useEffect, useState } from 'react'
import { FieldSelect, FieldWrapperPassThroughProps } from '../Form'
import { PostTypes } from '@/types'
import { TopicApi } from '@/api'
import { SelectOption } from '../Form/FieldSelect'

type Props = FieldWrapperPassThroughProps & {
  className?: string
  onChange: (value: SelectOption) => void
  lisBoxClassName?: string
  value?: SelectOption
}

const TopicSelect = ({ ...props }: Props) => {
  const [topics, setTopics] = useState<PostTypes.Topic[]>([])

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await TopicApi.gets()
        topics.unshift({
          name: 'Chủ đề',
          uuid: '',
          createdAt: '',
          updatedAt: '',
        })
        setTopics(topics)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTopics()
  }, [])

  return (
    <FieldSelect
      {...props}
      options={topics.map((topic) => ({
        label: topic.name,
        value: topic.uuid,
      }))}
    />
  )
}

export default memo(TopicSelect)
