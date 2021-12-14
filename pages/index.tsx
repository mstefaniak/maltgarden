import { useMemo } from 'react'
import { GetStaticProps } from 'next'
import { useQuerySubscription } from 'react-datocms'
import { Fade } from 'react-awesome-reveal'

import { ContentBox } from '@/components/ui/content-box'
import { Layout } from '@/components/layout'
import { TopBeers } from '@/components/top-beers'
import { LastBeer } from '@/components/last-beer'
import { PostPreview } from '@/components/post-preview'
import { Heading } from '@/components/ui/heading'
import { request, HOME_QUERY } from '@/lib/api'
import { IHome, Subscription } from '@/lib/types'
import { CMS_API_TOKEN } from '@/lib/constants'

import styles from './index.module.scss'

interface Props {
  subscription: Subscription<IHome>
}

const Home = ({ subscription }: Props): JSX.Element | null => {
  const { data } = useQuerySubscription(subscription)

  if (!data) {
    return null
  }

  const { newPosts, topBeers, lastBeer } = data

  const newestPosts = useMemo(
    () => newPosts.map((post) => <PostPreview post={post} />),
    [newPosts]
  )

  return (
    <Layout heading={<Heading />}>
      <ContentBox>
        <TopBeers beers={topBeers} />
      </ContentBox>
      <LastBeer beer={lastBeer} />
      <ContentBox>
        <section className={styles.news}>
          <Fade cascade={true} triggerOnce={true}>
            {newestPosts}
          </Fade>
        </section>
      </ContentBox>
    </Layout>
  )
}

const getStaticProps: GetStaticProps = async (context) => {
  const graphqlRequest = {
    query: HOME_QUERY,
    variables: {
      locale: context.locale,
      filter: { top4: { eq: true } },
    },
    preview: context.preview ?? false,
  }

  const subscription: Subscription<IHome> = context.preview
    ? {
        ...graphqlRequest,
        enabled: false,
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
    },
  }
}

export default Home
export { getStaticProps }
