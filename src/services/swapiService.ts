// swapiService.ts
import axios from 'axios';
import { Planet } from  '../types/planetas'; // Asegúrate de reemplazar 'nombre_del_archivo' con el nombre real del archivo donde definiste la interfaz Planet

export async function getPlanetsFromSWAPI(): Promise<Planet[]> {
    try {
        const response = await axios.get('https://swapi.py4e.com/api/planets');
        return response.data['results'] as Planet[]; // Aquí se hace un casting a Planet[]
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error al obtener los planetas desde SWAPI: ${error.message}`);
        } else {
            throw new Error(`Error desconocido al obtener los planetas desde SWAPI`);
        }
    }
}