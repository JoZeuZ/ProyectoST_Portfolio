import servicioService from '../services/servicio.service.js';

export const servicioController = {
  // Obtener todos los servicios
  getAll: async (req, res) => {
    try {
      // Filtros desde query params
      const filtros = req.query;
      const servicios = await servicioService.getAll(filtros);
      
      return res.status(200).json({
        success: true,
        data: servicios
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Obtener un servicio por ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await servicioService.getById(id);
      
      return res.status(200).json({
        success: true,
        data: servicio
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  },

  // Crear un nuevo servicio
  create: async (req, res) => {
    try {
      const nuevoServicio = await servicioService.create(req.body);
      
      return res.status(201).json({
        success: true,
        data: nuevoServicio,
        message: 'Servicio creado exitosamente'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Actualizar un servicio
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const servicioActualizado = await servicioService.update(id, req.body);
      
      return res.status(200).json({
        success: true,
        data: servicioActualizado,
        message: 'Servicio actualizado exitosamente'
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  // Eliminar un servicio (desactivarlo)
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await servicioService.delete(id);
      
      return res.status(200).json({
        success: true,
        message: 'Servicio desactivado exitosamente'
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
};

export default servicioController;