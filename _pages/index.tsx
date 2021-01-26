import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { Date } from '@/components/date'
import { Layout } from '@/components/layout'
import utilStyles from '@/styles/utils.module.css'
import { PAGE_TITLE } from '@/lib/constants'

export default function Home({ allPostsData }) {
  const { t } = useTranslation()

  return (
    <Layout>
      <h1>{PAGE_TITLE}</h1>
      <section className={utilStyles.headingMd}>
        <p>{t('common:home_slogan')}</p>
        <p>Założonej przez dwóch ziomali z zachpomu</p>
        <Link href="/about">About</Link>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Aktualności</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = [] // getAllPostsForHome
  return {
    props: {
      allPostsData,
    },
  }
}
