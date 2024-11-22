import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
//app.use(helmet());
//app.use (helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();

if (!process.env.MONGO) {
  console.error("ERROR: La variable de entorno MONGO no está definida.");
  process.exit(1); // Detener el servidor
}

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

const app = express();
app.use(express.json());
app.use(cors());
const options = {
  headers: {
    "Access-Token": "18a0ef09547167036f9252ee079efc57b9a62f94",
    "Content-type": "text/html",
  },
};

app.get("/", (req, res) => {
  res.send("Bienvenido al servidor proxy. Usa /api/data para obtener datos.");
});

app.use("/api/data", (req, res) => {
  const url = "https://cargoweld.kuantiva.com/api/dash_equipment";

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then((data) => {
      // Extraer datos de 'utilizacion_por_sucursal' y 'activos_por_linea'
      const utilizationData = Object.keys(data.utilizacion_por_sucursal).map(
        (key) => ({
          branch: data.utilizacion_por_sucursal[key].sucursal,
          utilization: data.utilizacion_por_sucursal[key].utiliz,
          offRent: data.utilizacion_por_sucursal[key].off_rent,
          totales: data.utilizacion_por_sucursal[key].on_rent,
          totalActivos: data.utilizacion_por_sucursal[key].total,
        })
      );

      // Datos de activos_por_linea
      const activeLineData = data.activos_por_linea;
      // Datatos de estatus_operacional_por_branch
      const estatusOperacionalData = data.estatus_operacional_por_branch;
      const sucursalData = data.utilizacion_por_sucursal;
      // Combinar ambos
      res.json({
        utilizationData,
        activeLineData,
        estatusOperacionalData,
        sucursalData,
      });
    })
    .catch((error) => {
      console.error("Error fetching data from API:", error);
      res.status(500).send(error.toString());
    });
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    
  });
});