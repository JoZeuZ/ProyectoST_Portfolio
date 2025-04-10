import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import CalendlyWidget from '../components/CalendlyWidget';
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
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Nuestros Servicios Técnicos</h1>
        
        {/* Categorías filtro */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaSeleccionada(categoria.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                categoriaSeleccionada === categoria.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>
        
        {/* Mostrar error si existe */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
            <p>{error}</p>
          </div>
        )}
        
        {/* Loading state */}
        {cargando ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Grid de servicios */}
            {servicios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <div className="text-center py-12">
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  No se encontraron servicios en esta categoría
                </p>
              </div>
            )}
          </>
        )}
        
        {/* Widget de Calendly para agendar cita */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">¿Listo para agendar tu servicio?</h2>
          <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
            Usa nuestro calendario para programar una cita o revisión de tu equipo.
          </p>
          <CalendlyWidget />
        </div>
      </div>
    </div>
  );
}