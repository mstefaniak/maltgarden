import { Layout } from '@/components/layout'
import { PostBody } from '@/components/post-body'
import { getAbout } from '@/lib/api'
import { markdownToHtml } from '@/lib/markdownToHtml'

type AboutProps = {
  title: string,
  content: string,
  photo: any,
  paragraph2: string,
}

const About = ({ title, content, photo, paragraph2 }: AboutProps) => {

  return (
    <Layout>
      <p>{title}</p>
      <PostBody content={content} />
      <img src={photo?.responsiveImage?.src} />
      <p>{paragraph2}</p>
    </Layout>
  )
}

const getStaticProps = async () => {
  const data = await getAbout()
  const content = await markdownToHtml(data?.paragraph1)

  return {
    props: {
      ...data,
      content,
    }
  }
}

export default About
export { getStaticProps }
