import Head from 'next/head'
import { useRouter } from 'next/router'
import { PAGE_URL, PAGE_TITLE } from '@/lib/constants'

const MetaStatic = () => {
  const router = useRouter()
  // TODO: set domain as reusable constant or env var
  const canURL = `${PAGE_URL}/${router.asPath}`

  return (
    <Head>
      {/* TODO: TEMPORARY */}
      <meta name="robots" content="noindex" />

      <link rel="canonical" href={canURL} />
      <meta property="og:url" content={canURL} key="og:url" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content="Nothing But Beer & Independence"
        key="description"
      />
      <meta property="og:image" content="/images/social.jpg" key="og:image" />
      <meta property="og:site_name" content="maltgarden.pl" />
      <meta property="og:title" content={PAGE_TITLE} key="og:title" />
      <title key="title">{PAGE_TITLE}</title>
      <meta
        property="og:description"
        content="Nothing But Beer & Independence"
        key="og:description"
      />
      <meta property="og:type" content="website" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="manifest" href="/manifest.json" />
      <meta
        name="google-site-verification"
        content="PaldgEJqOd-LDxEPnNk8lh7YW-ZPFp0HVYYdY6phWvc"
      />
    </Head>
  )
}

export { MetaStatic }
