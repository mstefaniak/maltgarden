import { GetStaticProps } from 'next'
import { Image, ResponsiveImageType } from 'react-datocms'
import { Meta } from '@/components/meta'
import { Layout } from '@/components/layout'
import { getAbout } from '@/lib/api'
import { markdownToHtml } from '@/lib/markdownToHtml'
import styles from './about.module.scss'

type AboutProps = {
  title1: string
  content1: string
  photo1: {
    responsiveImage: ResponsiveImageType
  }
  title2: string
  content2: string
  title3: string
  content3: string
  photo3: {
    responsiveImage: ResponsiveImageType
  }
  seo: {
    description: string
    title: string
  }
}

const About = ({
  title1,
  content1,
  photo1,
  title2,
  content2,
  title3,
  content3,
  photo3,
  seo,
}: AboutProps) => {
  return (
    <Layout>
      <Meta title={seo.title} description={seo.description} />
      <section className={styles.darkSection}>
        <div className={styles.content}>
          <h1>{title1}</h1>
          <div dangerouslySetInnerHTML={{ __html: content1 }} />
        </div>
        <Image className={styles.photo} data={photo1.responsiveImage} />
      </section>
      <section className={styles.paleSection}>
        <div className={styles.content}>
          <h1>{title2}</h1>
          <div dangerouslySetInnerHTML={{ __html: content2 }} />
        </div>
      </section>
      <section className={styles.darkSection}>
        <Image className={styles.photo} data={photo3.responsiveImage} />
        <div className={styles.content}>
          <h1>{title3}</h1>
          <div dangerouslySetInnerHTML={{ __html: content3 }} />
        </div>
      </section>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const data = await getAbout(context.locale as string)
  const content1 = await markdownToHtml(data?.paragraph1)
  const content2 = await markdownToHtml(data?.paragraph2)
  const content3 = await markdownToHtml(data?.paragraph3)

  return {
    props: {
      ...data,
      content1,
      content2,
      content3,
    },
  }
}

export default About
export { getStaticProps }
