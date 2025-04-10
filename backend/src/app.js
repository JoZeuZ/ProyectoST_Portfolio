import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import servicioRoutes from "./routes/servicio.routes.js";
import solicitudRoutes from "./routes/solicitud.routes.js";

// Cargar variables de entorno
dotenv.config();

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(helmet());
app.use(express.json());

// Ruta de prueba
app.get("/api/test", (req, res) => {
  res.status(200).json({ status: "OK", message: "API funcionando correctamente" });
});

// Registrar las rutas
app.use("/api/servicios", servicioRoutes);
app.use("/api/solicitudes", solicitudRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Error interno del servidor",
    error: process.env.NODE_ENV === "development" ? err.message : {}
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

export default app;
