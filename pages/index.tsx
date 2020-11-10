import Link from 'next/link'
import { Date } from '@/components/date'
import { Layout } from '@/components/layout'
import utilStyles from '@/styles/utils.module.css'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>To jest strona hurtowni piwa</p>
        <p>Założonej przez dwóch ziomali z zachpomu</p>
        <Link href="/about">
          About
        </Link>
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
      allPostsData
    }
  }
}
