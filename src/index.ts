// index.ts handler para el manjo de end points
import express, { Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import { getAllPlanets } from "./services/planetsService";
import { getPlanetsFromSWAPI } from '../src/services/swapiService';
import  {createTable}  from "./services/createPlanetasService";


const app = express();
const PORT_SERVER = process.env.PORT_SERVER || 8000; // Puerto predeterminado o 8000 si no está definido
app.listen(PORT_SERVER, () => {
  console.log(`Servidor escuchando en el puerto ${PORT_SERVER}`);
});


createTable()
  .then(() => {
    console.log('Tabla creada con éxito o ya existe.');
  })
  .catch((error: any) => {
    console.error('Error al crear la tabla:', error);
  });


// Ruta para obtener todos los planetas
app.get("/planetas", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const planetas = await getAllPlanets(); // Cambio en la llamada a la función
    return res.status(200).json(planetas); // Devuelve los resultados
  } catch (error) {
    console.error("Error al obtener los planetas:", error);
    return res.status(500).json({ error: "Error al obtener los planetas" });
  }
});

app.post("/addplanetesfromswapi", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const planets = await getPlanetsFromSWAPI();
    return res.status(200).json({
      planets,
    });
  } catch (error: any) { // Especifica explícitamente el tipo de error como Error
    return res.status(500).json({
      error: `Error al obtener los planetas desde SWAPI: ${error.message}`, // Maneja cualquier error y envíalo en la respuesta JSON
    });
  }
});
// Ruta de ejemplo
app.get("/path", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

// Manejador para rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

// Exporta la aplicación para serverless
export const handler = serverless(app);
