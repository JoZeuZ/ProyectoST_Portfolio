import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          TecniService
        </Link>
        
        {/* Menú para pantallas grandes */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={`hover:text-blue-500 ${location.pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>
            Inicio
          </Link>
          <Link to="/servicios" className={`hover:text-blue-500 ${location.pathname === '/servicios' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>
            Servicios
          </Link>
          <Link to="/dev" className={`hover:text-blue-500 ${location.pathname === '/dev' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>
            Portafolio Dev
          </Link>
          <Link to="/#contacto" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Contacto
          </Link>
        </div>
        
        {/* Botón de menú móvil */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
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
      
      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link to="/" className={`py-2 ${location.pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>
              Inicio
            </Link>
            <Link to="/servicios" className={`py-2 ${location.pathname === '/servicios' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>
              Servicios
            </Link>
            <Link to="/dev" className={`py-2 ${location.pathname === '/dev' ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-200'}`}>
              Portafolio Dev
            </Link>
            <Link to="/#contacto" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center">
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}