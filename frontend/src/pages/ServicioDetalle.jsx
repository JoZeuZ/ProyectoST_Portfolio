import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import SEO from '../components/SEO';

export default function ServicioDetalle() {
  const { id } = useParams();
  const [servicio, setServicio] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const obtenerServicio = async () => {
      try {
        setCargando(true);
        setError(null);
        
        const response = await api.servicios.getById(id);
        
        if (response.success) {
          setServicio(response.data);
          
          // Precargar la imagen
          if (response.data.imagen) {
            const img = new Image();
            img.src = response.data.imagen;
            img.onload = () => setImgLoaded(true);
          } else {
            setImgLoaded(true);
          }
        } else {
          setError('No se pudo cargar el servicio');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error al cargar el servicio. Intente nuevamente más tarde.');
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      obtenerServicio();
    }

    // Retornar al inicio de la página cuando se carga el componente
    window.scrollTo(0, 0);
  }, [id]);

  if (cargando) {
    return (
      <div className="pt-16 min-h-screen flex justify-center items-center bg-neutral-50 dark:bg-neutral-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !servicio) {
    return (
      <div className="pt-24 px-4 min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            {error || 'Servicio no encontrado'}
          </h1>
          <Link to="/servicios" className="btn-primary">
            Volver a servicios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <SEO 
        title={`${servicio.nombre} - Servicio Técnico`}
        description={servicio.descripcion}
        canonicalUrl={`/servicios/${id}`}
        keywords={[servicio.nombre, servicio.categoria, 'servicio técnico', 'reparación', 'Los Ángeles']}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center mb-6 text-sm text-neutral-500 dark:text-neutral-400">
            <Link to="/" className="hover:text-primary">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/servicios" className="hover:text-primary">Servicios</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-800 dark:text-neutral-200">{servicio.nombre}</span>
          </div>
          
          {/* Contenido principal */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:shrink-0 md:w-1/3 relative" style={{ minHeight: '200px' }}>
                <img 
                  src={servicio.imagen || "https://placehold.co/600x400/3B82F6/FFFFFF/png?text=Servicio"}
                  className={`h-48 w-full object-cover md:h-full transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                  alt={servicio.nombre}
                  onLoad={() => setImgLoaded(true)}
                  width="600"
                  height="400"
                  loading="eager"
                  style={{ 
                    aspectRatio: '3/2',
                    objectFit: 'cover'
                  }}
                />
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary"></div>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 w-full md:w-2/3">
                <div className="text-sm text-accent font-medium mb-2">
                  {servicio.categoria === 'reparacion' && 'Reparación'}
                  {servicio.categoria === 'mantenimiento' && 'Mantenimiento'}
                  {servicio.categoria === 'formateo' && 'Formateo'}
                  {servicio.categoria === 'limpieza' && 'Limpieza'}
                  {servicio.categoria === 'instalacion' && 'Instalación'}
                  {servicio.categoria === 'otro' && 'Otro servicio'}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-4 font-serif">
                  {servicio.nombre}
                </h1>
                <div className="flex items-center mb-6">
                  <div className="text-2xl font-bold text-accent mr-2">
                    ${servicio.precio.toLocaleString()}
                  </div>
                  {servicio.duracionEstimada && (
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      Duración estimada: {servicio.duracionEstimada}
                    </div>
                  )}
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                    Descripción
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {servicio.descripcion}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link 
                    to="/#contacto" 
                    className="btn-primary w-full sm:w-auto text-center"
                  >
                    Solicitar este servicio
                  </Link>
                  <Link 
                    to="/servicios" 
                    className="btn bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-600 w-full sm:w-auto text-center"
                  >
                    Ver todos los servicios
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}