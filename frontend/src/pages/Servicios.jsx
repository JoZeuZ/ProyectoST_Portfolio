import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import CalendlyWidget from '../components/CalendlyWidget';
import SEO from '../components/SEO';
import api from '../utils/api';

export default function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  // Categorías disponibles
  const categorias = [
    { id: 'todas', nombre: 'Todos los servicios' },
    { id: 'reparacion', nombre: 'Reparaciones' },
    { id: 'mantenimiento', nombre: 'Mantenimiento' },
    { id: 'formateo', nombre: 'Formateo' },
    { id: 'limpieza', nombre: 'Limpieza' },
    { id: 'instalacion', nombre: 'Instalación de Software' },
    { id: 'otro', nombre: 'Otros servicios' }
  ];

  // Obtener servicios
  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        setCargando(true);
        setError(null);

        // Parámetros para filtrar
        const params = { activo: true };
        if (categoriaSeleccionada !== 'todas') {
          params.categoria = categoriaSeleccionada;
        }
          
        const response = await api.servicios.getAll(params);

        setServicios(response.data);
      } catch (error) {
        console.error('Error:', error);
        setError('No se pudieron cargar los servicios. Intente nuevamente más tarde.');
      } finally {
        setCargando(false);
      }
    };

    obtenerServicios();
  }, [categoriaSeleccionada]);

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <SEO 
        title="Catálogo de Servicios Técnicos para Computadores"
        description="Ofrecemos reparación, mantenimiento, formateo y actualización de PCs y laptops en Los Ángeles, Biobío. Servicios profesionales a precios accesibles."
        canonicalUrl="/servicios"
        keywords={[
          'servicios técnicos computadores Los Ángeles', 
          'reparación PC laptops Biobío', 
          'formateo Windows Los Ángeles', 
          'mantenimiento preventivo computador',
          'instalación software Los Ángeles',
          'limpieza virus malware'
        ]}
      />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 font-serif text-neutral-900 dark:text-white">Nuestros Servicios Técnicos</h1>
        
        {/* Categorías filtro - Mejorado para móviles */}
        <div className="overflow-x-auto pb-2 mb-6 sm:mb-12">
          <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 min-w-max sm:min-w-0">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setCategoriaSeleccionada(categoria.id)}
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                  categoriaSeleccionada === categoria.id
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-600 border border-neutral-200 dark:border-neutral-600'
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mostrar error si existe */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-3 sm:p-4 mb-6 sm:mb-8 rounded text-sm sm:text-base">
            <p>{error}</p>
          </div>
        )}
        
        {/* Loading state */}
        {cargando ? (
          <div className="flex justify-center items-center py-12 sm:py-20">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Grid de servicios - Mejorado para responsividad */}
            {servicios.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {servicios.map((servicio) => (
                  <ServiceCard
                    key={servicio._id}
                    title={servicio.nombre}
                    price={`$${servicio.precio}`}
                    description={servicio.descripcion}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300">
                  No se encontraron servicios en esta categoría
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Widget de Calendly para agendar cita */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-8 text-neutral-900 dark:text-white font-serif">¿Listo para agendar tu servicio?</h2>
          <p className="text-base sm:text-lg text-center text-neutral-600 dark:text-neutral-300 mb-6 sm:mb-8 px-2">
            Usa nuestro calendario para programar una cita o revisión de tu equipo.
          </p>
          <CalendlyWidget />
        </div>
      </div>
    </div>
  );
}