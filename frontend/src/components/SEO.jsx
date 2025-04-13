import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para gestionar las etiquetas SEO de cada página usando React 19 APIs nativas
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la página
 * @param {string} props.description - Descripción de la página para meta description
 * @param {string} props.canonicalUrl - URL canónica (opcional)
 * @param {Array} props.keywords - Palabras clave para metatag keywords (opcional)
 */
export default function SEO({ 
  title, 
  description, 
  canonicalUrl, 
  keywords 
}) {
  // Base URL para URLs absolutas
  const siteUrl = 'https://tecniservice.cl';
  
  // Título completo para la página
  const fullTitle = `${title} | TecniService - Los Ángeles, Biobío`;
  
  // URL canónica completa
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  // Keywords como string
  const keywordsString = keywords ? keywords.join(', ') : 'servicio técnico computadores, reparación PC Los Ángeles, formateo computadores Biobío';

  useEffect(() => {
    // Actualizar título del documento
    document.title = fullTitle;
    
    // Buscar o crear meta etiquetas
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywordsString);
    
    // URL canónica
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);
    
    // Geo Tags para negocio local
    updateOrCreateMeta('geo.region', 'CL-BI');
    updateOrCreateMeta('geo.placename', 'Los Ángeles, Biobío');
    updateOrCreateMeta('geo.position', '-37.4697;-72.3536');
    updateOrCreateMeta('ICBM', '-37.4697, -72.3536');
    
    // Etiquetas Open Graph
    updateOrCreateMeta('og:title', fullTitle, 'property');
    updateOrCreateMeta('og:description', description, 'property');
    updateOrCreateMeta('og:url', fullCanonicalUrl, 'property');
    updateOrCreateMeta('og:type', 'website', 'property');
    
    // Cleanup en desmontaje
    return () => {
      // No es necesario eliminar las etiquetas en cleanup
      // ya que serán actualizadas si otro componente SEO se monta
    };
  }, [fullTitle, description, fullCanonicalUrl, keywordsString]);
  
  // Función para actualizar o crear meta tags
  function updateOrCreateMeta(name, content, attributeName = 'name') {
    let meta = document.querySelector(`meta[${attributeName}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attributeName, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }

  // No renderiza nada visible, solo modifica el head
  return null;
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string)
};