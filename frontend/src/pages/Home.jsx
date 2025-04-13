import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ServiceCard from '../components/ServiceCard';
import ContactForm from '../components/ContactForm';
import { WhatsappButton } from '../components/WspButton';
import SEO from '../components/SEO';

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar servicios desde la API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.servicios.getAll({ activo: true });
        
        if (response.success) {
          setServices(response.data.slice(0, 4)); // Solo mostrar los primeros 4 servicios
        } else {
          setError('Error al cargar los servicios');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Efecto para animación de aparición en scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      root: null,
      threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Datos de respaldo en caso de error
  const fallbackServices = [
    { nombre: 'Reparación de PCs', precio: 20000, descripcion: 'Diagnóstico y solución de problemas de hardware y software para tu equipo.', _id: 'fallback1' },
    { nombre: 'Mantenimiento', precio: 30000, descripcion: 'Limpieza completa, optimización de rendimiento y actualización de software.', _id: 'fallback2' },
    { nombre: 'Formateo', precio: 25000, descripcion: 'Instalación limpia de sistema operativo y programas esenciales.', _id: 'fallback3' },
    { nombre: 'Instalación de Software', precio: 15000, descripcion: 'Instalación y configuración de programas específicos para tus necesidades.', _id: 'fallback4' }
  ];

  // Si hay error, usar datos de respaldo
  const displayServices = error ? fallbackServices : services;

  return (
    <main className="font-sans">
      <SEO 
        title="Servicio Técnico de Computadores"
        description="Reparación y mantenimiento de computadores, laptops y dispositivos electrónicos en Los Ángeles, Biobío. Diagnóstico rápido y soluciones eficientes para tus problemas informáticos."
        canonicalUrl="/"
        keywords={[
          'servicio técnico computadores Los Ángeles', 
          'reparación PC Biobío', 
          'soporte técnico computadores', 
          'formateo de equipos', 
          'mantenimiento preventivo',
          'arreglo de computadores Los Ángeles'
        ]}
      />
      
      {/* Hero Section con gradiente modernizado y mejorado para responsividad */}
      <section className="min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 to-primary-500 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-20 z-[-1]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 font-serif leading-tight">
              Soluciones técnicas profesionales para tus dispositivos
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 px-2">
              Reparamos y optimizamos tus equipos con la mejor relación calidad-precio. Expertos en hardware y software.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#servicios" className="btn-primary text-center px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
                Ver servicios
              </a>
              <a href="#contacto" className="bg-white text-primary px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-neutral-100 transition-colors text-center text-base sm:text-lg">
                Reservar ahora
              </a>
            </div>
          </div>
        </div>
        
        {/* Indicador de scroll */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Banner con ventajas - mejorado para dispositivos móviles */}
      <section className="bg-neutral-100 dark:bg-neutral-800 py-4 sm:py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 justify-center py-2">
              <span className="i-carbon-medal text-2xl sm:text-3xl text-primary"></span>
              <span className="font-medium text-sm sm:text-base">Garantía en todos los servicios</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-center py-2">
              <span className="i-carbon-time text-2xl sm:text-3xl text-primary"></span>
              <span className="font-medium text-sm sm:text-base">Soluciones en 24-48 horas</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 justify-center py-2">
              <span className="i-carbon-money text-2xl sm:text-3xl text-primary"></span>
              <span className="font-medium text-sm sm:text-base">Precios transparentes sin sorpresas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios - Mejorado con responsividad */}
      <section id="servicios" className="section bg-white dark:bg-neutral-900 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12 animate-on-scroll opacity-0">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 font-serif">Nuestros Servicios</h2>
            <div className="h-1 w-16 sm:w-20 bg-accent mx-auto rounded mb-4 sm:mb-6"></div>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base px-2">
              Ofrecemos soluciones completas para todo tipo de problemas informáticos, desde reparaciones hasta mantenimiento preventivo.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayServices.map((service, index) => (
                <div key={service._id} className="animate-on-scroll opacity-0" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ServiceCard 
                    id={service._id}
                    title={service.nombre} 
                    price={`$${service.precio.toLocaleString()}`} 
                    description={service.descripcion}
                  />
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-8 sm:mt-10">
            <Link to="/servicios" className="btn-accent inline-block text-sm sm:text-base">
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Estadísticas - Mejorado con tamaños responsivos */}
      <section className="section bg-primary-800 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="animate-on-scroll opacity-0 py-3">
              <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">500+</div>
              <div className="text-sm sm:text-base">Clientes satisfechos</div>
            </div>
            <div className="animate-on-scroll opacity-0 py-3" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">1.200+</div>
              <div className="text-sm sm:text-base">Reparaciones exitosas</div>
            </div>
            <div className="animate-on-scroll opacity-0 py-3" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">5</div>
              <div className="text-sm sm:text-base">Años de experiencia</div>
            </div>
            <div className="animate-on-scroll opacity-0 py-3" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">98%</div>
              <div className="text-sm sm:text-base">Índice de satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de contacto con nuevo estilo */}
      <ContactForm />
      
      {/* Botón de WhatsApp */}
      <WhatsappButton number="123456789" />
    </main>
  );
}