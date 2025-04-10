import solicitudService from '../services/solicitud.service.js';

export const solicitudController = {
  // Obtener todas las solicitudes
  getAll: async (req, res) => {
    try {
      // Filtros desde query params
      const filtros = req.query;
      const solicitudes = await solicitudService.getAll(filtros);
      
      return res.status(200).json({
        success: true,
        data: solicitudes
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener una solicitud por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const solicitud = await solicitudService.getById(id);
      
      return res.status(200).json({
        success: true,
        data: solicitud
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  // Crear una nueva solicitud
  create: async (req, res) => {
    try {
      const nuevaSolicitud = await solicitudService.create(req.body);
      
      return res.status(201).json({
        success: true,
        data: nuevaSolicitud,
        message: 'Solicitud creada exitosamente'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Actualizar una solicitud
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const solicitudActualizada = await solicitudService.update(id, req.body);
      
      return res.status(200).json({
        success: true,
        data: solicitudActualizada,
        message: 'Solicitud actualizada exitosamente'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Actualizar el estado de una solicitud
  updateEstado: async (req, res) => {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      
      if (!estado) {
        return res.status(400).json({
          success: false,
          message: 'El estado es requerido'
        });
      }
      
      const solicitudActualizada = await solicitudService.updateEstado(id, estado);
      
      return res.status(200).json({
        success: true,
        data: solicitudActualizada,
        message: `Estado actualizado a: ${estado}`
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Eliminar una solicitud
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await solicitudService.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Solicitud eliminada exitosamente'
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener solicitudes por cliente (email)
  getByCliente: async (req, res) => {
    try {
      const { email } = req.params;
      const solicitudes = await solicitudService.getByCliente(email);
      
      return res.status(200).json({
        success: true,
        data: solicitudes
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

export default solicitudController;