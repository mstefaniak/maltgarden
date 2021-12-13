const PAGE_TITLE = 'Maltgarden'
const PAGE_URL = 'http://maltgarden.pl'
const EMAIL = 'biuro@maltgarden.pl'
const PHONE = '+48 555 666 777'
const FB_URL = 'https://www.facebook.com/BrowarMaltgarden'
const FB_PUB_URL = 'https://www.facebook.com/MaltgardenBeerFood'
const UNTAPPD_URL = 'https://untappd.com/Maltgarden'
const YOUTUBE_URL = 'https://youtube.com/Maltgarden'
const INSTAGRAM_URL = 'https://www.instagram.com/browarmaltgarden/'
const INSTAGRAM_PUB_URL = 'https://instagram.com/maltgardenbeerfood'
const CMS_API_URL = 'https://graphql.datocms.com'
const CMS_API_TOKEN = process.env.DATOCMS_API_TOKEN
enum LOCALES {
  EN = 'en',
  PL = 'pl',
}
const POSTS_PER_PAGE = 5

export {
  EMAIL,
  PAGE_TITLE,
  PAGE_URL,
  CMS_API_URL,
  CMS_API_TOKEN,
  LOCALES,
  PHONE,
  FB_URL,
  FB_PUB_URL,
  UNTAPPD_URL,
  INSTAGRAM_URL,
  INSTAGRAM_PUB_URL,
  YOUTUBE_URL,
  POSTS_PER_PAGE,
}
