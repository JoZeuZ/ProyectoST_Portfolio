import Joi from 'joi';

// Esquema de validación para crear una solicitud
export const createSolicitudSchema = Joi.object({
  nombreCliente: Joi.string().trim().min(3).required()
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres',
      'any.required': 'El nombre del cliente es obligatorio'
    }),

  telefono: Joi.string().trim().pattern(/^[0-9+\-\s]{7,15}$/).required()
    .messages({
      'string.base': 'El teléfono debe ser un texto',
      'string.empty': 'El teléfono no puede estar vacío',
      'string.pattern.base': 'El formato del teléfono no es válido',
      'any.required': 'El teléfono es obligatorio'
    }),

  email: Joi.string().trim().email().required()
    .messages({
      'string.base': 'El email debe ser un texto',
      'string.empty': 'El email no puede estar vacío',
      'string.email': 'El formato del email no es válido',
      'any.required': 'El email es obligatorio'
    }),

  tipoEquipo: Joi.string().valid('desktop', 'laptop', 'tablet', 'smartphone', 'impresora', 'otro').required()
    .messages({
      'string.base': 'El tipo de equipo debe ser un texto',
      'any.only': 'El tipo de equipo debe ser uno de los siguientes: desktop, laptop, tablet, smartphone, impresora, otro',
      'any.required': 'El tipo de equipo es obligatorio'
    }),

  detalleProblema: Joi.string().trim().min(10).required()
    .messages({
      'string.base': 'La descripción del problema debe ser un texto',
      'string.empty': 'La descripción del problema no puede estar vacía',
      'string.min': 'La descripción debe tener al menos {#limit} caracteres',
      'any.required': 'La descripción del problema es obligatoria'
    }),

  servicio: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    .messages({
      'string.base': 'El ID del servicio debe ser un texto',
      'string.pattern.base': 'El ID del servicio proporcionado no es válido',
      'any.required': 'El servicio es obligatorio'
    }),
    
  estado: Joi.string()
    .valid('pendiente', 'en_revisión', 'diagnosticado', 'en_reparación', 'completado', 'entregado', 'cancelado')
    .default('pendiente')
    .messages({
      'string.base': 'El estado debe ser un texto',
      'any.only': 'El estado debe ser uno de los siguientes: pendiente, en_revisión, diagnosticado, en_reparación, completado, entregado, cancelado'
    }),

  fechaCita: Joi.date().iso().allow(null)
    .messages({
      'date.base': 'La fecha de cita debe ser una fecha válida',
      'date.format': 'La fecha debe tener formato ISO'
    }),

  presupuesto: Joi.number().min(0).allow(null)
    .messages({
      'number.base': 'El presupuesto debe ser un número',
      'number.min': 'El presupuesto no puede ser negativo'
    }),

  notas: Joi.string().trim().allow('')
    .messages({
      'string.base': 'Las notas deben ser un texto'
    })
});

// Esquema de validación para actualizar una solicitud (todos los campos opcionales)
export const updateSolicitudSchema = Joi.object({
  nombreCliente: Joi.string().trim().min(3)
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.min': 'El nombre debe tener al menos {#limit} caracteres'
    }),

  telefono: Joi.string().trim().pattern(/^[0-9+\-\s]{7,15}$/)
    .messages({
      'string.base': 'El teléfono debe ser un texto',
      'string.empty': 'El teléfono no puede estar vacío',
      'string.pattern.base': 'El formato del teléfono no es válido'
    }),

  email: Joi.string().trim().email()
    .messages({
      'string.base': 'El email debe ser un texto',
      'string.empty': 'El email no puede estar vacío',
      'string.email': 'El formato del email no es válido'
    }),

  tipoEquipo: Joi.string().valid('desktop', 'laptop', 'tablet', 'smartphone', 'impresora', 'otro')
    .messages({
      'string.base': 'El tipo de equipo debe ser un texto',
      'any.only': 'El tipo de equipo debe ser uno de los siguientes: desktop, laptop, tablet, smartphone, impresora, otro'
    }),

  detalleProblema: Joi.string().trim().min(10)
    .messages({
      'string.base': 'La descripción del problema debe ser un texto',
      'string.empty': 'La descripción del problema no puede estar vacía',
      'string.min': 'La descripción debe tener al menos {#limit} caracteres'
    }),

  servicio: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.base': 'El ID del servicio debe ser un texto',
      'string.pattern.base': 'El ID del servicio proporcionado no es válido'
    }),

  estado: Joi.string()
    .valid('pendiente', 'en_revisión', 'diagnosticado', 'en_reparación', 'completado', 'entregado', 'cancelado')
    .messages({
      'string.base': 'El estado debe ser un texto',
      'any.only': 'El estado debe ser uno de los siguientes: pendiente, en_revisión, diagnosticado, en_reparación, completado, entregado, cancelado'
    }),

  fechaCita: Joi.date().iso().allow(null)
    .messages({
      'date.base': 'La fecha de cita debe ser una fecha válida',
      'date.format': 'La fecha debe tener formato ISO'
    }),

  presupuesto: Joi.number().min(0).allow(null)
    .messages({
      'number.base': 'El presupuesto debe ser un número',
      'number.min': 'El presupuesto no puede ser negativo'
    }),

  notas: Joi.string().trim().allow('')
    .messages({
      'string.base': 'Las notas deben ser un texto'
    })
}).min(1).messages({ 'object.min': 'Debe proporcionar al menos un campo para actualizar' });

// Esquema para validación de actualizaciones de estado
export const updateEstadoSchema = Joi.object({
  estado: Joi.string()
    .valid('pendiente', 'en_revisión', 'diagnosticado', 'en_reparación', 'completado', 'entregado', 'cancelado')
    .required()
    .messages({
      'string.base': 'El estado debe ser un texto',
      'any.only': 'El estado debe ser uno de los siguientes: pendiente, en_revisión, diagnosticado, en_reparación, completado, entregado, cancelado',
      'any.required': 'El estado es obligatorio'
    })
});