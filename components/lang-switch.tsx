import Link from 'next/link'
import { useRouter } from 'next/router'
import { LOCALES } from '@/lib/constants'

const LangSwitch = () => {
  const router = useRouter()

  if (router.locale === LOCALES.PL) {
    return (
      <Link href={`/${LOCALES.EN}${router.asPath}`} locale="en">
        <a>EN</a>
      </Link>
    )
  }

  return (
    <Link href={`/${LOCALES.PL}${router.asPath}`} locale="pl">
      <a>PL</a>
    </Link>
  )
}

export { LangSwitch }
