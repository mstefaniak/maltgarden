import Head from 'next/head'

const Meta = () => {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content=""
      />
      <meta property="og:image" content="/images/logo.png" />
      <meta property="og:title" content="Maltgarden" />
      <meta property="og:type" content="website" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}

export { Meta }
