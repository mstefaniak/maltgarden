import { Date } from './date'
import { CoverImage } from './cover-image'
import Link from 'next/link'
import { RoundLink } from '@/components/ui/round-link'
import useTranslation from 'next-translate/useTranslation'
import { Post } from '@/lib/types'
import { PostBody } from '@/components/post-body'
import styles from './post-preview.module.scss'

interface IPostPreviewProps {
  post: Post
}

const PostPreview = ({ post }: IPostPreviewProps) => {
  const { heading, body, excerpt } = post

  return (
    <div className={styles.postPreview}>
      <h3>{heading}</h3>
      <PostBody body={body} excerpt={excerpt} />
    </div>
  )
}

export { PostPreview }
