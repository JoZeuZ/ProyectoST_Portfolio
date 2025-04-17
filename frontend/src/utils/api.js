/**
 * API Cliente para servicios del backend
 * Con soporte para caché y gestión optimizada de promesas
 */

// Cache para peticiones GET
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en ms

// URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Transformar un objeto de parámetros en una cadena de consulta URL
 * @param {Object} params - Objeto con los parámetros
 * @returns {String} Cadena de consulta URL
 */
const buildQueryString = (params) => {
  if (!params || Object.keys(params).length === 0) return '';
  
  return '?' + Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

/**
 * Crear clave única para la caché basada en la URL y los parámetros
 * @param {String} url - URL de la petición
 * @param {Object} params - Parámetros de la petición
 * @returns {String} Clave para la caché
 */
const getCacheKey = (url, params) => {
  return url + buildQueryString(params);
};

/**
 * Verificar si una entrada de caché es válida
 * @param {Object} cacheEntry - Entrada de la caché
 * @returns {Boolean} Verdadero si la caché es válida
 */
const isCacheValid = (cacheEntry) => {
  return cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

/**
 * Cliente base para hacer peticiones HTTP
 */
class ApiClient {
  /**
   * Hacer una petición GET con soporte para caché
   * @param {String} endpoint - Endpoint de la API
   * @param {Object} params - Parámetros para la consulta
   * @param {Boolean} useCache - Si se debe usar la caché
   * @returns {Promise} Promesa con la respuesta
   */
  async get(endpoint, params = {}, useCache = true) {
    const url = `${API_BASE_URL}${endpoint}`;
    const cacheKey = getCacheKey(url, params);
    
    // Intentar obtener de la caché si está habilitada
    if (useCache) {
      const cachedData = cache.get(cacheKey);
      if (isCacheValid(cachedData)) {
        return cachedData.data;
      }
    }
    
    try {
      const response = await fetch(url + buildQueryString(params), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error en petición: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Guardar en caché si está habilitada
      if (useCache) {
        cache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
      }
      
      return data;
    } catch (error) {
      console.error(`Error en GET ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Hacer una petición POST
   * @param {String} endpoint - Endpoint de la API
   * @param {Object} data - Datos para enviar
   * @returns {Promise} Promesa con la respuesta
   */
  async post(endpoint, data = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Error en petición: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error en POST ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Hacer una petición PUT
   * @param {String} endpoint - Endpoint de la API
   * @param {Object} data - Datos para enviar
   * @returns {Promise} Promesa con la respuesta
   */
  async put(endpoint, data = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Error en petición: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error en PUT ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Hacer una petición DELETE
   * @param {String} endpoint - Endpoint de la API
   * @returns {Promise} Promesa con la respuesta
   */
  async delete(endpoint) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error en petición: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Error en DELETE ${endpoint}:`, error);
      throw error;
    }
  }
  
  /**
   * Limpiar entradas específicas o toda la caché
   * @param {String} endpoint - Endpoint específico para limpiar (opcional)
   */
  clearCache(endpoint = null) {
    if (endpoint) {
      const prefix = `${API_BASE_URL}${endpoint}`;
      
      for (const key of cache.keys()) {
        if (key.startsWith(prefix)) {
          cache.delete(key);
        }
      }
    } else {
      cache.clear();
    }
  }
}

// Cliente API para servicios
const api = {
  // Cliente base
  _client: new ApiClient(),
  
  // Servicios
  servicios: {
    getAll: (params) => api._client.get('/servicios', params),
    getById: (id) => api._client.get(`/servicios/${id}`),
    create: (data) => api._client.post('/servicios', data),
    update: (id, data) => api._client.put(`/servicios/${id}`, data),
    delete: (id) => api._client.delete(`/servicios/${id}`),
  },
  
  // Solicitudes
  solicitudes: {
    getAll: (params) => api._client.get('/solicitudes', params),
    getById: (id) => api._client.get(`/solicitudes/${id}`),
    getByCliente: (email) => api._client.get(`/solicitudes/cliente/${email}`),
    create: (data) => api._client.post('/solicitudes', data),
    update: (id, data) => api._client.put(`/solicitudes/${id}`, data),
    updateEstado: (id, estado) => api._client.put(`/solicitudes/${id}/estado`, { estado }),
    delete: (id) => api._client.delete(`/solicitudes/${id}`),
  },
  
  // Funciones de utilidad
  utils: {
    clearCache: (endpoint) => api._client.clearCache(endpoint),
  }
};

export default api;