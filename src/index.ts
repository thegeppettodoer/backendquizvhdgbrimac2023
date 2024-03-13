// index.ts handler para el manjo de end points
import express, { Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import { getAllPlanets } from "./services/planetsService";
import { getPlanetsFromSWAPI } from '../src/services/swapiService';
import { createTable } from "./services/createPlanetasService";
import { insertPlanet } from "./services/insertPlanetasFromSwapi";
import { Planet } from "./types/planetas";


const app = express();
const PORT_SERVER = process.env.PORT_SERVER || 8000;  
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


// ruta /planetas devuelve los registros de la tabla Planetas
app.get("/planetas", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const planetas = await getAllPlanets(); // Cambio en la llamada a la función
    return res.status(200).json(planetas); // Devuelve los resultados
  } catch (error) {
    console.error("Error al obtener los planetas:", error);
    return res.status(500).json({ error: "Error al obtener los planetas" });
  }
});

// ruta /addplanetesfromswapi carga todos los planetas de swapi luego los inserta a la base de datos dynamodb a tabla Planetas
app.post("/addplanetesfromswapi", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const planets: Planet[] = await getPlanetsFromSWAPI();
    let count: number = 0;

    for (const planet of planets) {
      console.log("Planet name:", planet.name);  
      if (planet.name && planet.rotation_period && planet.orbital_period && planet.diameter && planet.climate && planet.gravity && planet.terrain && planet.surface_water && planet.population && planet.residents && planet.films && planet.created && planet.edited && planet.url) {
        count = count + 1;
        let planetfix = planet;
        planetfix.id = count.toString();
        await insertPlanet(planetfix);
      } else {
        console.error('Error: uno de los campos requeridos del planeta está vacío.');
      }
    }


    return res.status(200).json({
      planets,
    });
  } catch (error: any) { // Especifica explícitamente el tipo de error como Error
    return res.status(500).json({
      error: `Error al obtener los planetas desde SWAPI: ${error.message}`, // Maneja cualquier error y envíalo en la respuesta JSON
    });
  }
});
 

// Manejador para rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "No se encuentra saludos by Victor Hugo David Garcia B",
  });
});

// Exporta la aplicación para serverless
export const handler = serverless(app);
