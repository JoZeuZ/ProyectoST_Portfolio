import Joi from 'joi';

// Esquema de validación para crear un servicio
export const createServicioSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(100).required()
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres',
      'string.max': 'El nombre no puede tener más de {#limit} caracteres',
      'any.required': 'El nombre es obligatorio'
    }),
  
  descripcion: Joi.string().trim().required()
    .messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía',
      'any.required': 'La descripción es obligatoria'
    }),
  
  precio: Joi.number().min(0).required()
    .messages({
      'number.base': 'El precio debe ser un número',
      'number.min': 'El precio no puede ser negativo',
      'any.required': 'El precio es obligatorio'
    }),
  
  duracionEstimada: Joi.string().trim().allow(''),
  
  imagen: Joi.string().trim().default('default-service.jpg'),
  
  activo: Joi.boolean().default(true),
  
  categoria: Joi.string().valid('reparacion', 'mantenimiento', 'formateo', 'limpieza', 'instalacion', 'otro').default('otro')
    .messages({
      'string.base': 'La categoría debe ser un texto',
      'any.only': 'La categoría debe ser una de las siguientes: reparacion, mantenimiento, formateo, limpieza, instalacion, otro'
    })
});

// Esquema de validación para actualizar un servicio (todos los campos opcionales)
export const updateServicioSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(100)
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres',
      'string.max': 'El nombre no puede tener más de {#limit} caracteres'
    }),
  
  descripcion: Joi.string().trim()
    .messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía'
    }),
  
  precio: Joi.number().min(0)
    .messages({
      'number.base': 'El precio debe ser un número',
      'number.min': 'El precio no puede ser negativo'
    }),
  
  duracionEstimada: Joi.string().trim().allow(''),
  
  imagen: Joi.string().trim(),
  
  activo: Joi.boolean(),
  
  categoria: Joi.string().valid('reparacion', 'mantenimiento', 'formateo', 'limpieza', 'instalacion', 'otro')
    .messages({
      'string.base': 'La categoría debe ser un texto',
      'any.only': 'La categoría debe ser una de las siguientes: reparacion, mantenimiento, formateo, limpieza, instalacion, otro'
    })
}).min(1).messages({ 'object.min': 'Debe proporcionar al menos un campo para actualizar' });

// Esquema para validar el id de MongoDB
export const idSchema = Joi.object({
  id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.pattern.base': 'El ID proporcionado no es válido',
      'any.required': 'El ID es requerido'
    })
});