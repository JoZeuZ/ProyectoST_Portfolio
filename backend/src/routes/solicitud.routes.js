import { Router } from 'express';
import solicitudController from '../controllers/solicitud.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createSolicitudSchema, updateSolicitudSchema, updateEstadoSchema } from '../validations/solicitud.validation.js';
import { idSchema } from '../validations/servicio.validation.js';

const router = Router();

// Rutas para solicitudes
router.get('/', solicitudController.getAll);
router.get('/:id', validate(idSchema, 'params'), solicitudController.getById);
router.post('/', validate(createSolicitudSchema), solicitudController.create);
router.put('/:id', validate(idSchema, 'params'), validate(updateSolicitudSchema), solicitudController.update);
router.patch('/:id/estado', validate(idSchema, 'params'), validate(updateEstadoSchema), solicitudController.updateEstado);
router.delete('/:id', validate(idSchema, 'params'), solicitudController.delete);
router.get('/cliente/:email', solicitudController.getByCliente);

export default router;