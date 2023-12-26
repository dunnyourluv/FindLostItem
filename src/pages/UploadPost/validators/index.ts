import { ValidateRules } from '@/hooks'
import { PostTypes } from '@/types'

export type UploadFields = Omit<PostTypes.Upload, 'images' | 'topic'>

export const validateUpload: ValidateRules<UploadFields> = [
  {
    field: 'title',
    validate(value) {
      if (!value) {
        return 'Title is required'
      }
      return null
    },
  },
  {
    field: 'content',
    validate() {
      return null
    },
  },
  {
    field: 'location',
    validate(value) {
      if (!value) {
        return 'Location is required'
      }
      return null
    },
  },
]
