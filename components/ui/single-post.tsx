import { Post } from '@/lib/types'
import styles from './single-post.module.scss'
import { Image } from 'react-datocms'
import { PostBody } from '@/components/post-body'

interface IPostProps {
  data: Post
}

const SinglePost = ({ data }: IPostProps) => {
  return (
    <div className={styles.postBox}>
      <div className={styles.heading}>
        <Image
          data={data.headingImage.responsiveImage}
          pictureClassName={styles.headingImg}
          className={styles.headingImgBox}
        />
        <h1>{data.heading}</h1>
      </div>
      <PostBody body={data.body} excerpt={data.excerpt} />
    </div>
  )
}

export { SinglePost }
