import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  publishedAt?: string
  modifiedAt?: string
  section?: string
  tags?: string[]
}

export default function SEOHead({
  title = "Hope Medicos - Your Trusted Pharmacy Store in Hisar",
  description = "Hope Medicos is a leading pharmacy store in Hisar, Haryana. We provide quality medicines, healthcare products, and professional pharmaceutical services.",
  keywords = "pharmacy, medicines, healthcare, Hisar, Haryana, Hope Medicos",
  image = "/hope_logo.png",
  url = "https://hopemedicos.com",
  type = "website",
  publishedAt,
  modifiedAt,
  section = "Pharmacy",
  tags = ["pharmacy", "healthcare", "medicines"]
}: SEOHeadProps) {
  const siteName = "Hope Medicos"
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Hope Medicos" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://hopemedicos.com${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://hopemedicos.com${image}`} />
      <meta name="twitter:site" content="@hopemedicos" />
      
      {/* Article specific meta tags */}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {modifiedAt && <meta property="article:modified_time" content={modifiedAt} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      
      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="var(--brand)" />
      <meta name="msapplication-TileColor" content="var(--brand)" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Hope Medicos" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Head>
  )
}
