import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useQuerySubscription, QueryListenerOptions } from 'react-datocms'
import { Fade } from 'react-awesome-reveal'

import { CMS_API_TOKEN } from '@/lib/constants'
import { request, SHAREHOLDERS_QUERY } from '@/lib/api'
import { IShareholders } from '@/lib/types'
import { markdownToHtml } from '@/lib/markdownToHtml'

import { Article } from '@/components/ui/article'
import { ContentBox } from '@/components/ui/content-box'
import { Heading } from '@/components/ui/heading'
import { Layout } from '@/components/layout'
import { Meta } from '@/components/meta'

interface Props {
  preview: boolean
  subscription: QueryListenerOptions<IShareholders, unknown>
}

export const Shareholders = ({
  preview,
  subscription,
}: Props): JSX.Element | null => {
  const [content, setContent] = useState<string>()
  const { data } = useQuerySubscription(subscription)

  useEffect(() => {
    load()

    async function load() {
      if (!data?.shareholderInfo.content) {
        return null
      }
      const info = await markdownToHtml(data.shareholderInfo.content)

      setContent(info)
    }
  }, [data])

  if (!data || !content) {
    return null
  }

  return (
    <Layout heading={<Heading />} preview={preview}>
      <Meta
        title={data.shareholderInfo?.seo?.title}
        description={data.shareholderInfo?.seo?.description}
      />
      <ContentBox>
        <Article title={data.shareholderInfo.title}>
          <Fade cascade={true} triggerOnce={true}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Fade>
        </Article>
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.preview ?? false
  const graphqlRequest = {
    query: SHAREHOLDERS_QUERY,
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

export { getStaticProps }
export default Shareholders
