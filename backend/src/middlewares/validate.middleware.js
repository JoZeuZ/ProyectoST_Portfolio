/**
 * Middleware para validar las peticiones usando esquemas Joi
 * @param {Object} schema - Esquema Joi para validar
 * @param {String} property - La propiedad de la petición a validar ('body', 'query', 'params')
 * @returns {Function} Middleware de Express
 */
export const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Incluir todos los errores, no solo el primero
      stripUnknown: true // Eliminar campos no especificados en el esquema
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errors: errorMessages
      });
    }

    // Reemplaza los datos validados
    req[property] = value;
    
    return next();
  };
};

export default validate;