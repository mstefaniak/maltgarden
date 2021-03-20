type PictureProps = {
  src: string
}

const Picture = ({ src }: PictureProps) => {
  return (
    <picture>
      <source />
      <img src={src} />
    </picture>
  )
}

export { Picture }
