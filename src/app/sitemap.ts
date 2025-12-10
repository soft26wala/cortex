import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // अपनी वेबसाइट का बेस URL (डोमेन) यहाँ डिफाइन करें
  const baseUrl = 'https://cortexstack.com'
  
  return [
    {
      url: baseUrl, // आपका होमपेज
      lastModified: new Date(),
      changeFrequency: 'weekly', // आप इसे 'daily', 'weekly', 'monthly' में से चुन सकते हैं
      priority: 1.0, // होमपेज को सबसे ज़्यादा प्राथमिकता दें
    },
    
    // भविष्य में, जब आप About Us, Services, या Contact पेज बनाएँ,
    // तो उन्हें इस Array में जोड़ दें:
    /*
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    */
  ]
}