import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

export default function SEO({
  title,
  description,
  canonicalUrl,
  keywords = [],
  author = 'TecniService',
  type = 'website',
  image = ''
}) {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://tecniservice.cl';
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  const imageUrl = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/images/logo-share.jpg`;
  const defaultKeywords = ['servicio técnico', 'reparación computadores', 'Los Ángeles', 'Biobío', 'Chile'];
  const allKeywords = [...new Set([...defaultKeywords, ...keywords])];

  return (
    <Helmet>
      {/* Título y meta tags básicos */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={author} />
      
      {/* Favicon y otros íconos */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Canonical URL para SEO */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph para compartir en redes sociales */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="TecniService" />
      <meta property="og:locale" content="es_CL" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Para negocios locales */}
      <meta name="geo.region" content="CL-BI" />
      <meta name="geo.placename" content="Los Ángeles, Biobío" />
      <meta name="geo.position" content="-37.4697;-72.3536" />
      <meta name="ICBM" content="-37.4697, -72.3536" />
      
      {/* Mobile Web App */}
      <meta name="application-name" content="TecniService" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="TecniService" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#0066cc" />
      
      {/* Preconectar con dominios de terceros */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      
      {/* Script de Schema.org para negocio local */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "TecniService",
            "image": "${imageUrl}",
            "url": "${siteUrl}",
            "telephone": "+56912345678",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Calle Ejemplo 123",
              "addressLocality": "Los Ángeles",
              "addressRegion": "Biobío",
              "postalCode": "4440000",
              "addressCountry": "CL"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -37.4697,
              "longitude": -72.3536
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "10:00",
                "closes": "14:00"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/tecniservice",
              "https://www.instagram.com/tecniservice"
            ]
          }
        `}
      </script>
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string,
  type: PropTypes.string,
  image: PropTypes.string
};