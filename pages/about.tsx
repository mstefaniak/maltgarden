import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import {
  Image,
  useQuerySubscription,
  QueryListenerOptions,
} from 'react-datocms'

import { Article } from '@/components/ui/article'
import { Meta } from '@/components/meta'
import { Layout } from '@/components/layout'

import { IAbout } from '@/lib/types'
import { request, ABOUT_QUERY } from '@/lib/api'
import { markdownToHtml } from '@/lib/markdownToHtml'
import { CMS_API_TOKEN } from '@/lib/constants'

import styles from './about.module.scss'

interface Props {
  subscription: QueryListenerOptions<IAbout, unknown>
  preview: boolean
}

const About = ({ subscription, preview }: Props): JSX.Element | null => {
  const [content, setContent] = useState<Record<string, string>>({
    paragraph1: '',
    paragraph2: '',
    paragraph3: '',
  })

  const { data } = useQuerySubscription(subscription)

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
    <Layout preview={preview}>
      <Meta title={about.seo.title} description={about.seo.description} />
      <section className={styles.colorSection}>
        <Article title={about.title1}>
          <div dangerouslySetInnerHTML={{ __html: content.paragraph1 }} />
        </Article>
        <Image className={styles.photo} data={about.photo1.responsiveImage} />
      </section>
      <section className={styles.paleSection}>
        <Article title={about.title2}>
          <div dangerouslySetInnerHTML={{ __html: content.paragraph2 }} />
        </Article>
      </section>
      <section className={styles.brownSection}>
        <Image className={styles.photo} data={about.photo3.responsiveImage} />
        <Article title={about.title3}>
          <div dangerouslySetInnerHTML={{ __html: content.paragraph3 }} />
        </Article>
      </section>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.preview ?? false
  const graphqlRequest = {
    query: ABOUT_QUERY,
    variables: { locale: context.locale },
    preview,
  }

  const subscription = context.preview
    ? {
        ...graphqlRequest,
        enabled: true,
        initialData: await request(graphqlRequest),
        token: CMS_API_TOKEN,
      }
    : {
        enabled: false,
        initialData: await request(graphqlRequest),
      }

  return {
    props: {
      subscription,
      preview,
    },
  }
}

export default About
export { getStaticProps }
