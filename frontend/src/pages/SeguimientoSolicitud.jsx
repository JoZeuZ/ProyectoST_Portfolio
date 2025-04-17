import { useState } from 'react';
import api from '../utils/api';
import SEO from '../components/SEO';

export default function SeguimientoSolicitud() {
  const [email, setEmail] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [buscado, setBuscado] = useState(false);
  
  // Manejar cambio en el campo de email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  // Buscar solicitudes por email del cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Por favor, ingresa tu correo electrónico');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.solicitudes.getByCliente(email);
      
      if (response.success) {
        setSolicitudes(response.data);
        setBuscado(true);
      } else {
        setError('No se pudieron encontrar las solicitudes');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al consultar las solicitudes. Intente nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  // Función para mostrar el texto del estado de forma amigable
  const formatearEstado = (estado) => {
    const estados = {
      'pendiente': 'Pendiente',
      'en_revisión': 'En revisión',
      'diagnosticado': 'Diagnosticado',
      'en_reparación': 'En reparación',
      'completado': 'Completado',
      'entregado': 'Entregado',
      'cancelado': 'Cancelado'
    };
    
    return estados[estado] || estado;
  };
  
  // Función para obtener la clase de color del estado según UnoCSS
  const getEstadoClase = (estado) => {
    const clases = {
      'pendiente': 'bg-yellow-100 text-yellow-800 border border-yellow-400',
      'en_revisión': 'bg-blue-100 text-blue-800 border border-blue-400',
      'diagnosticado': 'bg-purple-100 text-purple-800 border border-purple-400',
      'en_reparación': 'bg-indigo-100 text-indigo-800 border border-indigo-400',
      'completado': 'bg-green-100 text-green-800 border border-green-400',
      'entregado': 'bg-gray-100 text-gray-800 border border-gray-400',
      'cancelado': 'bg-red-100 text-red-800 border border-red-400'
    };
    
    return clases[estado] || 'bg-gray-100 text-gray-800 border border-gray-400';
  };
  
  // Formatear fecha
  const formatearFecha = (fechaString) => {
    if (!fechaString) return 'No disponible';
    
    const fecha = new Date(fechaString);
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(fecha);
  };

  return (
    <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 min-h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <SEO 
        title="Seguimiento de Solicitudes"
        description="Consulta el estado de tus solicitudes de servicio técnico. Ingresa tu correo electrónico para ver el progreso de tus reparaciones."
        canonicalUrl="/seguimiento"
        keywords={['seguimiento solicitud', 'estado reparación', 'consulta servicio técnico', 'Los Ángeles']}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 font-serif">Seguimiento de Solicitudes</h1>
          <div className="h-1 w-16 sm:w-20 bg-accent mx-auto rounded mb-6"></div>
          <p className="text-center text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8">
            Consulta el estado actual de tus solicitudes de servicio técnico ingresando tu correo electrónico.
          </p>
          
          {/* Formulario de búsqueda */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="tu@correo.com"
                    className="input-field w-full"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn-primary px-6 py-2.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    aria-label={loading ? "Buscando solicitudes..." : "Buscar solicitudes"}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="i-carbon-circle-dash animate-spin mr-2 w-4 h-4"></div>
                        Buscando...
                      </div>
                    ) : 'Buscar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Mensaje de error */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-800 animate-fade-in">
              <div className="flex items-center">
                <div className="i-carbon-warning-filled w-5 h-5 mr-2"></div>
                {error}
              </div>
            </div>
          )}
          
          {/* Resultados de búsqueda */}
          {buscado && (
            <div className="mt-4 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 font-serif">Tus solicitudes</h2>
              
              {solicitudes.length === 0 ? (
                <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 text-center">
                  <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                    No se encontraron solicitudes asociadas al correo {email}
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Si realizaste una solicitud recientemente, es posible que aún no haya sido registrada en nuestro sistema.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {solicitudes.map((solicitud) => (
                    <div 
                      key={solicitud._id} 
                      className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="p-6">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              {solicitud.servicio?.nombre || 'Servicio no disponible'}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              Solicitud #{solicitud._id.slice(-6).toUpperCase()}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoClase(solicitud.estado)}`}>
                            {formatearEstado(solicitud.estado)}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                              Cliente
                            </h4>
                            <p className="text-sm">{solicitud.nombreCliente}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                              Tipo de equipo
                            </h4>
                            <p className="text-sm capitalize">{solicitud.tipoEquipo.replace('_', ' ')}</p>
                          </div>
                          
                          <div>
                            <h4 className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                              Fecha de solicitud
                            </h4>
                            <p className="text-sm">{formatearFecha(solicitud.createdAt)}</p>
                          </div>
                          
                          {solicitud.fechaCita && (
                            <div>
                              <h4 className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                                Fecha de cita
                              </h4>
                              <p className="text-sm">{formatearFecha(solicitud.fechaCita)}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                            Problema reportado
                          </h4>
                          <p className="text-sm">{solicitud.detalleProblema}</p>
                        </div>
                        
                        {solicitud.presupuesto && (
                          <div className="bg-neutral-50 dark:bg-neutral-700 p-3 rounded-lg">
                            <h4 className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400 mb-1">
                              Presupuesto estimado
                            </h4>
                            <p className="text-lg font-semibold text-accent">
                              ${solicitud.presupuesto.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}