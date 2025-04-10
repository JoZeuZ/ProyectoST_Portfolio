import { Router } from 'express';
import servicioController from '../controllers/servicio.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { createServicioSchema, updateServicioSchema, idSchema } from '../validations/servicio.validation.js';

const router = Router();

// Rutas para servicios
router.get('/', servicioController.getAll);
router.get('/:id', validate(idSchema, 'params'), servicioController.getById);
router.post('/', validate(createServicioSchema), servicioController.create);
router.put('/:id', validate(idSchema, 'params'), validate(updateServicioSchema), servicioController.update);
router.delete('/:id', validate(idSchema, 'params'), servicioController.delete);

export default router;