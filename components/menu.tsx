import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

const Menu = () => {
  const { t } = useTranslation()
  return (
    <ul>
      <li>
        <Link href="/beers/all">{t('common:nav_beers')}</Link>
      </li>
      <li>
        <Link href="/about">{t('common:nav_about')}</Link>
      </li>
      <li>
        <Link href="/news">{t('common:nav_news')}</Link>
      </li>
    </ul>
  )
}

export { Menu }
