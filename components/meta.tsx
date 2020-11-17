import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content=""
      />
      <meta property="og:image" content="/images/social.jpg" />
      <meta property="og:title" content="Maltgarden" />
      <meta property="og:descriptioin" content="Nothing But Beer & Independence" />
      <meta property="og:type" content="website" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="google-site-verification" content="PaldgEJqOd-LDxEPnNk8lh7YW-ZPFp0HVYYdY6phWvc" />
    </Head>
  )
}

export { Meta }
