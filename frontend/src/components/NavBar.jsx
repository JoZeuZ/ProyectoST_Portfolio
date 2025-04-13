import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        isScrolled 
          ? 'bg-white/90 dark:bg-neutral-900/90 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary font-serif">
          <span className="flex items-center gap-2">
            <span className="i-carbon-laptop text-2xl"></span>
            TecniService
          </span>
        </Link>
        
        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary font-semibold' : 'text-neutral-700 dark:text-neutral-200'}`}>
            Inicio
          </Link>
          <Link to="/servicios" className={`hover:text-primary transition-colors ${location.pathname === '/servicios' ? 'text-primary font-semibold' : 'text-neutral-700 dark:text-neutral-200'}`}>
            Servicios
          </Link>
          <Link to="/seguimiento" className="btn-primary">
            Seguimiento
          </Link>
          
          {/* Interruptor de Tema */}
          <div className="ml-4">
            <ThemeSwitcher />
          </div>
        </div>
        
        {/* Botones para móvil */}
        <div className="md:hidden flex items-center">
          {/* Interruptor de Tema para móvil */}
          <div className="mr-4">
            <ThemeSwitcher />
          </div>
          
          {/* Botón de menú móvil */}
          <button 
            className="text-neutral-700 dark:text-neutral-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link to="/" className={`py-2 ${location.pathname === '/' ? 'text-primary font-semibold' : 'text-neutral-700 dark:text-neutral-200'}`}>
              Inicio
            </Link>
            <Link to="/servicios" className={`py-2 ${location.pathname === '/servicios' ? 'text-primary font-semibold' : 'text-neutral-700 dark:text-neutral-200'}`}>
              Servicios
            </Link>
            <Link to="/seguimiento" className="btn-primary text-center">
              Seguimiento
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}