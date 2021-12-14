import { memo } from 'react'

import { Post } from '@/lib/types'
import { PostBody } from '@/components/post-body'
import styles from './post-preview.module.scss'

interface IPostPreviewProps {
  post: Post
}

const PostPreview = memo(({ post }: IPostPreviewProps) => {
  const { heading, body, excerpt } = post

  return (
    <div className={styles.postPreview}>
      <h3>{heading}</h3>
      <PostBody body={body} excerpt={excerpt} />
    </div>
  )
})

export { PostPreview }
