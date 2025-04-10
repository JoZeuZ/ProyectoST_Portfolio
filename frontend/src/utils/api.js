// Configuración base para las peticiones API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Cliente API para realizar peticiones HTTP al backend
 */
const api = {
  /**
   * Realiza una petición GET
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} params - Parámetros de consulta (opcional)
   * @returns {Promise} Resultado de la petición
   */
  async get(endpoint, params = {}) {
    // Construir query string
    const queryString = Object.keys(params).length 
      ? '?' + new URLSearchParams(params).toString() 
      : '';
    
    try {
      const response = await fetch(`${API_URL}${endpoint}${queryString}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }
      
      return data;
    } catch (error) {
      console.error(`Error en petición GET a ${endpoint}:`, error);
      throw error;
    }
  },
  
  /**
   * Realiza una petición POST
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} body - Datos a enviar
   * @returns {Promise} Resultado de la petición
   */
  async post(endpoint, body = {}) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }
      
      return data;
    } catch (error) {
      console.error(`Error en petición POST a ${endpoint}:`, error);
      throw error;
    }
  },
  
  /**
   * Realiza una petición PUT
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} body - Datos a enviar
   * @returns {Promise} Resultado de la petición
   */
  async put(endpoint, body = {}) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }
      
      return data;
    } catch (error) {
      console.error(`Error en petición PUT a ${endpoint}:`, error);
      throw error;
    }
  },
  
  /**
   * Realiza una petición PATCH
   * @param {string} endpoint - Ruta del endpoint
   * @param {Object} body - Datos a enviar
   * @returns {Promise} Resultado de la petición
   */
  async patch(endpoint, body = {}) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }
      
      return data;
    } catch (error) {
      console.error(`Error en petición PATCH a ${endpoint}:`, error);
      throw error;
    }
  },
  
  /**
   * Realiza una petición DELETE
   * @param {string} endpoint - Ruta del endpoint
   * @returns {Promise} Resultado de la petición
   */
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }
      
      return data;
    } catch (error) {
      console.error(`Error en petición DELETE a ${endpoint}:`, error);
      throw error;
    }
  },

  // Módulos específicos para servicios y solicitudes
  servicios: {
    getAll: (params = {}) => api.get('/servicios', params),
    getById: (id) => api.get(`/servicios/${id}`),
    create: (servicio) => api.post('/servicios', servicio),
    update: (id, servicio) => api.put(`/servicios/${id}`, servicio),
    delete: (id) => api.delete(`/servicios/${id}`)
  },
  
  solicitudes: {
    getAll: (params = {}) => api.get('/solicitudes', params),
    getById: (id) => api.get(`/solicitudes/${id}`),
    create: (solicitud) => api.post('/solicitudes', solicitud),
    update: (id, solicitud) => api.put(`/solicitudes/${id}`, solicitud),
    updateEstado: (id, estado) => api.patch(`/solicitudes/${id}/estado`, { estado }),
    delete: (id) => api.delete(`/solicitudes/${id}`),
    getByCliente: (email) => api.get(`/solicitudes/cliente/${email}`)
  }
};

export default api;