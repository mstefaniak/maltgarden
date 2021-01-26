import { PostPreview } from './post-preview'

const MoreStories = ({ posts }) => {
  return (
    <section>
      <h2 className="">More Stories</h2>
      <div className="">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}

export { MoreStories }
