import { PostPreview } from './post-preview'
import { Post } from '@/lib/types'

const MoreStories = ({ posts }: { posts: Post[] }) => {
  return (
    <section>
      <h2 className="">More Stories</h2>
      <div className="">
        {posts.map((post) => (
          <PostPreview {...post} key={post.slug} />
        ))}
      </div>
    </section>
  )
}

export { MoreStories }
