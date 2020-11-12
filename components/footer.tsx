import useTranslation from 'next-translate/useTranslation'

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      {t('common:footerBuildBy')} <a href="https://github.com/mstefaniak" rel="noopener noreferrer" target="_blank">mstefaniak</a>
    </footer>
  )
}

export { Footer }
