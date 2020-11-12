const PAGE_TITLE = 'Maltgarden'
const CMS_API_URL = 'https://graphql.datocms.com'
const CMS_API_TOKEN = process.env.DATOCMS_API_TOKEN
enum LOCALES {
  EN = 'en',
  PL = 'pl',
}

export { PAGE_TITLE, CMS_API_URL, CMS_API_TOKEN, LOCALES }
