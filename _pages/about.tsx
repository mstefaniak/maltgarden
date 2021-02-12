import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from '@/components/layout'
import { PostBody } from '@/components/post-body'
import { getAbout } from '@/lib/api'
import { markdownToHtml } from '@/lib/markdownToHtml'

type AboutProps = {
  title: string
  content: string
  photo: any
  paragraph2: string
}

const About = ({ title, content, photo, paragraph2 }: AboutProps) => {
  return (
    <Layout>
      <Head>
        <meta name="og:title" content="About" />
      </Head>
      <h2>{title}</h2>
      <PostBody content={content} />
      <img src={photo?.responsiveImage?.src} />
      <p>{paragraph2}</p>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const data = await getAbout(context.locale as string)
  const content = await markdownToHtml(data?.paragraph1)

  return {
    props: {
      ...data,
      content,
    },
  }
}

export default About
export { getStaticProps }
