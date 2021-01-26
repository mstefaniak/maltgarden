type PostBodyProps = {
  content: string
}

const PostBody = ({ content }: PostBodyProps) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export { PostBody }
