const nextTranslate = require('next-translate')

module.exports = nextTranslate({
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['www.datocms-assets.com'],
  },
  future: { webpack5: true },
})
