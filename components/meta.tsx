import Head from 'next/head'

interface IMetaProps {
  title?: string
  description?: string
  imageUrl?: string
}

const Meta = ({ title, description, imageUrl }: IMetaProps) => {
  return (
    <Head>
      {title && <title key="title">{title}</title>}
      {description && (
        <meta name="description" content={description} key="description" />
      )}
      {imageUrl && (
        <meta property="og:image" content={imageUrl} key="og:image" />
      )}
      {title && <meta property="og:title" content={title} key="og:title" />}
      {description && (
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
      )}
      {imageUrl && (
        <meta property="og:image" content={imageUrl} key="og:image" />
      )}
    </Head>
  )
}

export { Meta }
