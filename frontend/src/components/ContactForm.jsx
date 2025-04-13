import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombreCliente: '',
    telefono: '',
    email: '',
    tipoEquipo: 'desktop',
    detalleProblema: '',
    servicio: ''
  });

  const [servicios, setServicios] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Cargar los servicios disponibles al montar el componente
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await api.servicios.getAll({ activo: true });
        if (response.success) {
          setServicios(response.data);
        }
      } catch (error) {
        console.error('Error al cargar servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje({ texto: '', tipo: '' });

    try {
      const response = await api.solicitudes.create(formData);

      if (response.success) {
        setMensaje({
          texto: '¡Solicitud enviada con éxito! Te contactaremos pronto.',
          tipo: 'success'
        });
        
        // Limpiar formulario
        setFormData({
          nombreCliente: '',
          telefono: '',
          email: '',
          tipoEquipo: 'desktop',
          detalleProblema: '',
          servicio: ''
        });
      } else {
        setMensaje({
          texto: `Error: ${response.message}`,
          tipo: 'error'
        });
      }
    } catch (error) {
      setMensaje({
        texto: 'Ocurrió un error al enviar tu solicitud. Intenta más tarde.',
        tipo: 'error'
      });
      console.error('Error al enviar formulario:', error);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="contacto" className="py-10 sm:py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-on-scroll opacity-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 font-serif">Solicita un Servicio Técnico</h2>
          <div className="h-1 w-16 sm:w-20 bg-accent mx-auto rounded mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto px-2">
            Completa el formulario y nos pondremos en contacto contigo lo antes posible para resolver tus problemas técnicos.
          </p>
        </div>
        
        {mensaje.texto && (
          <div className={`mb-6 sm:mb-8 p-3 sm:p-4 rounded-xl shadow-md animate-fade-in ${
            mensaje.tipo === 'success' 
              ? 'bg-accent-50 text-accent-800 border-l-4 border-accent' 
              : 'bg-red-50 text-red-800 border-l-4 border-red-500'
          }`}>
            <div className="flex items-center">
              <span className={`p-1.5 sm:p-2 rounded-full ${mensaje.tipo === 'success' ? 'bg-accent-100' : 'bg-red-100'}`}>
                {mensaje.tipo === 'success' ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span className="ml-2 sm:ml-3 text-sm sm:text-base font-medium">{mensaje.texto}</span>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="card space-y-4 sm:space-y-6 animate-on-scroll opacity-0 p-4 sm:p-6">
          <div>
            <label htmlFor="nombreCliente" className="block mb-1.5 sm:mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombreCliente"
              name="nombreCliente"
              value={formData.nombreCliente}
              onChange={handleChange}
              required
              className="input-field text-sm sm:text-base p-2 sm:p-2.5"
              placeholder="Escribe tu nombre completo"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="telefono" className="block mb-1.5 sm:mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Teléfono de contacto
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="input-field text-sm sm:text-base p-2 sm:p-2.5"
                placeholder="+56 9 1234 5678"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-1.5 sm:mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field text-sm sm:text-base p-2 sm:p-2.5"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="tipoEquipo" className="block mb-1.5 sm:mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Tipo de equipo
              </label>
              <div className="relative">
                <select
                  id="tipoEquipo"
                  name="tipoEquipo"
                  value={formData.tipoEquipo}
                  onChange={handleChange}
                  required
                  className="input-field appearance-none pr-10 text-sm sm:text-base p-2 sm:p-2.5"
                >
                  <option value="desktop">Computadora de escritorio</option>
                  <option value="laptop">Laptop / Portátil</option>
                  <option value="tablet">Tablet</option>
                  <option value="smartphone">Smartphone</option>
                  <option value="impresora">Impresora</option>
                  <option value="otro">Otro</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="servicio" className="block mb-1.5 sm:mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Servicio requerido
              </label>
              <div className="relative">
                <select
                  id="servicio"
                  name="servicio"
                  value={formData.servicio}
                  onChange={handleChange}
                  required
                  className="input-field appearance-none pr-10 text-sm sm:text-base p-2 sm:p-2.5"
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map(servicio => (
                    <option key={servicio._id} value={servicio._id}>
                      {servicio.nombre}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <label htmlFor="detalleProblema" className="block mb-1.5 sm:mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Describe el problema
            </label>
            <textarea
              id="detalleProblema"
              name="detalleProblema"
              value={formData.detalleProblema}
              onChange={handleChange}
              required
              rows="3"
              className="input-field text-sm sm:text-base p-2 sm:p-2.5"
              placeholder="Describa el problema que presenta su equipo lo más detallado posible..."
            ></textarea>
          </div>
          
          <div className="pt-2 sm:pt-3">
            <button
              type="submit"
              disabled={enviando}
              className={`btn-primary w-full py-2 sm:py-3 text-base sm:text-lg flex items-center justify-center ${enviando ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {enviando ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : (
                <>Enviar solicitud</>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}