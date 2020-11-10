import Link from 'next/link'
import { useRouter } from 'next/router'
import { LOCALES } from '@/lib/constants'

const LangSwitch = () => {
  const router = useRouter()

  if (router.locale === LOCALES.PL) {
    return (
      <Link href="/" locale="en">
        <a>EN</a>
      </Link>
    )
  }

  return (
    <Link href="/" locale="pl">
      <a>PL</a>
    </Link>
  )
}

export { LangSwitch }
