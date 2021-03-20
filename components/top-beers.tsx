import { RoundLink } from '@/components/ui/round-link'
import { Beer } from '@/lib/types'
import useTranslation from 'next-translate/useTranslation'

interface ITopBeersProps {
  beers: Beer[]
}

const TopBeers = ({ beers }: ITopBeersProps) => {
  const { t } = useTranslation()

  return null

  return (
    <section>
      <h2>{t('common:top4title')}</h2>
      <p>{t('common:top4info')}</p>
      <RoundLink href="/beers/all" text={t('common:seeAll')} type="filled" />
      {beers.map((beer: Beer) => (
        <div>{beer.name}</div>
      ))}
    </section>
  )
}

export { TopBeers }
