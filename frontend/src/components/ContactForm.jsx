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
    <section id="contacto" className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Solicita un Servicio Técnico</h2>
        
        {mensaje.texto && (
          <div className={`mb-6 p-4 rounded-md ${mensaje.tipo === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {mensaje.texto}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="nombreCliente" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre completo
            </label>
            <input
              type="text"
              id="nombreCliente"
              name="nombreCliente"
              value={formData.nombreCliente}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="telefono" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Teléfono de contacto
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tipoEquipo" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Tipo de equipo
              </label>
              <select
                id="tipoEquipo"
                name="tipoEquipo"
                value={formData.tipoEquipo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desktop">Computadora de escritorio</option>
                <option value="laptop">Laptop / Portátil</option>
                <option value="tablet">Tablet</option>
                <option value="smartphone">Smartphone</option>
                <option value="impresora">Impresora</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="servicio" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Servicio requerido
              </label>
              <select
                id="servicio"
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un servicio</option>
                {servicios.map(servicio => (
                  <option key={servicio._id} value={servicio._id}>
                    {servicio.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="detalleProblema" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Describe el problema
            </label>
            <textarea
              id="detalleProblema"
              name="detalleProblema"
              value={formData.detalleProblema}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describa el problema que presenta su equipo..."
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={enviando}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {enviando ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>
    </section>
  );
}