import { Post } from '@/lib/types'
import styles from './single-post.module.scss'
import { Image } from 'react-datocms'
import { PostBody } from '@/components/post-body'
import { ContentBox } from './content-box'

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
        <div className={styles.title}>
          <ContentBox>
            <h1>{data.heading}</h1>
          </ContentBox>
        </div>
      </div>
      <PostBody body={data.body} excerpt={data.excerpt} />
    </div>
  )
}

export { SinglePost }
