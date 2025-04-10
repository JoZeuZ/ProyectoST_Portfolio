import Servicio from '../models/servicio.model.js';

export const servicioService = {
  // Obtener todos los servicios
  getAll: async (filtro = {}) => {
    try {
      // Si filtro incluye activo, convertir de string a boolean
      if (filtro.activo !== undefined) {
        filtro.activo = filtro.activo === 'true';
      }
      
      return await Servicio.find(filtro);
    } catch (error) {
      throw new Error(`Error al obtener servicios: ${error.message}`);
    }
  },

  // Obtener un servicio por ID
  getById: async (id) => {
    try {
      const servicio = await Servicio.findById(id);
      if (!servicio) {
        throw new Error('Servicio no encontrado');
      }
      return servicio;
    } catch (error) {
      throw new Error(`Error al obtener servicio: ${error.message}`);
    }
  },

  // Crear un nuevo servicio
  create: async (servicioData) => {
    try {
      const nuevoServicio = new Servicio(servicioData);
      return await nuevoServicio.save();
    } catch (error) {
      throw new Error(`Error al crear servicio: ${error.message}`);
    }
  },

  // Actualizar un servicio existente
  update: async (id, servicioData) => {
    try {
      const servicioActualizado = await Servicio.findByIdAndUpdate(
        id,
        servicioData,
        { new: true, runValidators: true }
      );
      
      if (!servicioActualizado) {
        throw new Error('Servicio no encontrado');
      }
      
      return servicioActualizado;
    } catch (error) {
      throw new Error(`Error al actualizar servicio: ${error.message}`);
    }
  },

  // Eliminar un servicio (borrado lógico cambiando activo a false)
  delete: async (id) => {
    try {
      const servicioEliminado = await Servicio.findByIdAndUpdate(
        id,
        { activo: false },
        { new: true }
      );
      
      if (!servicioEliminado) {
        throw new Error('Servicio no encontrado');
      }
      
      return servicioEliminado;
    } catch (error) {
      throw new Error(`Error al eliminar servicio: ${error.message}`);
    }
  }
};

export default servicioService;