import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { Image, useQuerySubscription } from 'react-datocms'

import { Meta } from '@/components/meta'
import { Layout } from '@/components/layout'

import { responsiveImageFragment } from '@/lib/api'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { CMS_API_TOKEN } from '@/lib/constants'

import styles from './about.module.scss'

interface Props {
  locale?: string
}

const About = ({ locale }: Props): JSX.Element | null => {
  const [content, setContent] = useState<Record<string, string>>({
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
  })

  const { status, error, data } = useQuerySubscription({
    enabled: true,
    query: `
      query About {
        about(locale: ${locale}) {
          title1
          paragraph1
          photo1 {
            responsiveImage(imgixParams: {fm: png, fit: clamp, ar: "1:1"}, sizes: "(max-width: 600px) 100vw, 600px") {
              ...responsiveImageFragment
            }
          }
          title2
          paragraph2
          title3
          paragraph3
          photo3 {
            responsiveImage(imgixParams: {fm: png, fit: crop, ar: "1:1"}, sizes: "(max-width: 600px) 100vw, 600px") {
              ...responsiveImageFragment
            }
          }
          seo {
            title
            description
          }
        }
      }
      ${responsiveImageFragment}
    `,
    variables: {},
    token: CMS_API_TOKEN,
  })

  useEffect(() => {
    load()

    async function load() {
      if (!data?.about) {
        return null
      }
      const paragraph1 = await markdownToHtml(data.about.paragraph1)
      const paragraph2 = await markdownToHtml(data.about.paragraph2)
      const paragraph3 = await markdownToHtml(data.about.paragraph3)

      setContent({
        paragraph1,
        paragraph2,
        paragraph3,
      })
    }
  }, [data])

  if (!data) {
    return null
  }

  const { about } = data

  return (
    <Layout>
      <Meta title={about.seo.title} description={about.seo.description} />
      <section className={styles.colorSection}>
        <div className={styles.content}>
          <h1>{about.title1}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.paragraph1 }} />
        </div>
        <Image className={styles.photo} data={about.photo1.responsiveImage} />
      </section>
      <section className={styles.paleSection}>
        <div className={styles.content}>
          <h1>{about.title2}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.paragraph2 }} />
        </div>
      </section>
      <section className={styles.brownSection}>
        <Image className={styles.photo} data={about.photo3.responsiveImage} />
        <div className={styles.content}>
          <h1>{about.title3}</h1>
          <div dangerouslySetInnerHTML={{ __html: content.paragraph3 }} />
        </div>
      </section>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale

  return {
    props: {
      locale,
    },
  }
}

export default About
export { getStaticProps }
