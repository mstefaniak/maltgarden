const { locales, defaultLocale } = require('./i18n.json')

module.exports = {
  i18n: { locales, defaultLocale },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
