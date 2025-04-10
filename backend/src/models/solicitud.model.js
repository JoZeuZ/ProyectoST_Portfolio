import mongoose from 'mongoose';

const solicitudSchema = new mongoose.Schema({
  nombreCliente: {
    type: String,
    required: [true, 'El nombre del cliente es obligatorio'],
    trim: true
  },
  telefono: {
    type: String,
    required: [true, 'El número de teléfono es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
  },
  tipoEquipo: {
    type: String,
    required: [true, 'El tipo de equipo es obligatorio'],
    enum: ['desktop', 'laptop', 'tablet', 'smartphone', 'impresora', 'otro'],
    default: 'desktop'
  },
  detalleProblema: {
    type: String,
    required: [true, 'La descripción del problema es obligatoria'],
    trim: true
  },
  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servicio',
    required: [true, 'El servicio es obligatorio']
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en_revisión', 'diagnosticado', 'en_reparación', 'completado', 'entregado', 'cancelado'],
    default: 'pendiente'
  },
  fechaCita: {
    type: Date
  },
  presupuesto: {
    type: Number
  },
  notas: {
    type: String,
    trim: true
  }
}, { timestamps: true });

export default mongoose.model('Solicitud', solicitudSchema);