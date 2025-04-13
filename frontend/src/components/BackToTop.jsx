import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Controlar la visibilidad en función del scroll
  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el scroll supera los 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Añadir el evento al scroll
    window.addEventListener('scroll', toggleVisibility);

    // Limpiar el evento al desmontar
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Función para volver arriba suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 sm:bottom-24 sm:right-8 bg-accent hover:bg-accent-600 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-300 z-30 ${
        isVisible ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Volver arriba"
      title="Volver arriba"
    >
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
}