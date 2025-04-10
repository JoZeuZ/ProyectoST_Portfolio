import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del servicio es obligatorio'],
    trim: true,
    maxlength: [100, 'El nombre no puede tener más de 100 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  duracionEstimada: {
    type: String,
    trim: true
  },
  imagen: {
    type: String,
    default: 'default-service.jpg'
  },
  activo: {
    type: Boolean,
    default: true
  },
  categoria: {
    type: String,
    enum: ['reparacion', 'mantenimiento', 'formateo', 'limpieza', 'instalacion', 'otro'],
    default: 'otro'
  }
}, { timestamps: true });

export default mongoose.model('Servicio', servicioSchema);