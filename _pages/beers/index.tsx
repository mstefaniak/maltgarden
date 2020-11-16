import Head from 'next/head'
import { Layout } from '@/components/layout'

const Beers = () => {

  return (
    <Layout>
      <Head>
        <meta name="og:title" content="Beers" />
      </Head>
      <h2>[BEERS DASHBOARD]</h2>
    </Layout>
  )
}

export default Beers
