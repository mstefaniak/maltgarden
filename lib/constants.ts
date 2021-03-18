const PAGE_TITLE = 'Maltgarden'
const PAGE_URL = 'http://maltgarden.pl'
const EMAIL = 'biuro@maltgarden.pl'
const PHONE = '+48 555 666 777'
const FB_URL = 'https://www.facebook.com/BrowarMaltgarden'
const UNTAPPD_URL = 'https://untappd.com/Maltgarden'
const INSTAGRAM_URL = 'https://www.instagram.com/browarmaltgarden/'
const CMS_API_URL = 'https://graphql.datocms.com'
const CMS_API_TOKEN = process.env.DATOCMS_API_TOKEN
enum LOCALES {
  EN = 'en',
  PL = 'pl',
}

export {
  EMAIL,
  PAGE_TITLE,
  PAGE_URL,
  CMS_API_URL,
  CMS_API_TOKEN,
  LOCALES,
  PHONE,
  FB_URL,
  UNTAPPD_URL,
  INSTAGRAM_URL,
}
