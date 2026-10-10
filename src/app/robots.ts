import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://cortestack.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/api',
        '/*/admin',
        '/(dashboard)',
        '/dashboard',
        '/payment-result',
        '/payment-failed',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
