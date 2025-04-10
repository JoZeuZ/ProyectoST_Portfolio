import Solicitud from '../models/solicitud.model.js';

export const solicitudService = {
  // Obtener todas las solicitudes
  getAll: async (filtros = {}) => {
    try {
      return await Solicitud.find(filtros).populate('servicio');
    } catch (error) {
      throw new Error(`Error al obtener solicitudes: ${error.message}`);
    }
  },

  // Obtener una solicitud por ID
  getById: async (id) => {
    try {
      const solicitud = await Solicitud.findById(id).populate('servicio');
      if (!solicitud) {
        throw new Error('Solicitud no encontrada');
      }
      return solicitud;
    } catch (error) {
      throw new Error(`Error al obtener solicitud: ${error.message}`);
    }
  },

  // Crear una nueva solicitud
  create: async (solicitudData) => {
    try {
      const nuevaSolicitud = new Solicitud(solicitudData);
      return await nuevaSolicitud.save();
    } catch (error) {
      throw new Error(`Error al crear solicitud: ${error.message}`);
    }
  },

  // Actualizar una solicitud existente
  update: async (id, solicitudData) => {
    try {
      const solicitudActualizada = await Solicitud.findByIdAndUpdate(
        id,
        solicitudData,
        { new: true, runValidators: true }
      ).populate('servicio');
      
      if (!solicitudActualizada) {
        throw new Error('Solicitud no encontrada');
      }
      
      return solicitudActualizada;
    } catch (error) {
      throw new Error(`Error al actualizar solicitud: ${error.message}`);
    }
  },

  // Actualizar el estado de una solicitud
  updateEstado: async (id, nuevoEstado) => {
    try {
      const solicitudActualizada = await Solicitud.findByIdAndUpdate(
        id,
        { estado: nuevoEstado },
        { new: true, runValidators: true }
      ).populate('servicio');
      
      if (!solicitudActualizada) {
        throw new Error('Solicitud no encontrada');
      }
      
      return solicitudActualizada;
    } catch (error) {
      throw new Error(`Error al actualizar estado: ${error.message}`);
    }
  },

  // Eliminar una solicitud
  delete: async (id) => {
    try {
      const solicitudEliminada = await Solicitud.findByIdAndDelete(id);
      
      if (!solicitudEliminada) {
        throw new Error('Solicitud no encontrada');
      }
      
      return { mensaje: 'Solicitud eliminada con éxito' };
    } catch (error) {
      throw new Error(`Error al eliminar solicitud: ${error.message}`);
    }
  },

  // Obtener solicitudes por cliente
  getByCliente: async (email) => {
    try {
      return await Solicitud.find({ email }).populate('servicio');
    } catch (error) {
      throw new Error(`Error al obtener solicitudes del cliente: ${error.message}`);
    }
  }
};

export default solicitudService;