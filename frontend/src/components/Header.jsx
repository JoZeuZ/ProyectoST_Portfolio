import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ 
  title = "Servicio Técnico Profesional", 
  subtitle = "Mantención y reparación de computadores, laptops, impresoras y más. Servicio rápido y garantizado.", 
  ctaText = "Ver servicios",
  ctaLink = "/servicios",
  imageUrl = "/img/hero-repair.webp",
  imageAlt = "Técnico reparando un computador"
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  useEffect(() => {
    // Precargar la imagen hero para mejorar LCP
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setIsImageLoaded(true);
    
    // Si la imagen tarda más de 3 segundos, mostrarla de todos modos
    const timer = setTimeout(() => setIsImageLoaded(true), 3000);
    
    return () => clearTimeout(timer);
  }, [imageUrl]);

  return (
    <header className="relative overflow-hidden py-20 sm:py-24 md:py-28 lg:py-32 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Overlay de imagen con fade-in controlado */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isImageLoaded ? 'opacity-10 dark:opacity-15' : 'opacity-0'}`}
        style={{ 
          backgroundImage: `url(${imageUrl})`,
          width: '100%',
          height: '100%'
        }}
        aria-hidden="true"
      />
      
      {/* Imagen precargada usando picture para diferentes formatos */}
      <picture className="hidden">
        <source srcSet={imageUrl.replace('.webp', '.avif')} type="image/avif" />
        <source srcSet={imageUrl} type="image/webp" />
        <img 
          src={imageUrl.replace('.webp', '.jpg')} 
          alt="" 
          width="1400" 
          height="700" 
          decoding="async"
          fetchpriority="high"
          onLoad={() => setIsImageLoaded(true)}
        />
      </picture>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6 font-serif">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 sm:mb-10 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ctaLink} className="btn-primary px-6 py-3 text-lg">
              {ctaText}
            </Link>
            <Link to="/#contacto" className="btn-accent px-6 py-3 text-lg">
              Contactar ahora
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decoración de la esquina - solo visible en pantallas grandes */}
      <div className="hidden lg:block absolute -bottom-16 -right-16 w-48 h-48 bg-primary/10 dark:bg-primary/20 rounded-full transform rotate-45"></div>
      <div className="hidden lg:block absolute -top-20 -left-20 w-64 h-64 bg-accent/10 dark:bg-accent/20 rounded-full"></div>
    </header>
  );
}