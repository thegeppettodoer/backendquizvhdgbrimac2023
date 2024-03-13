// // swapiService.ts

import axios from 'axios';
import { Planet } from '../types/planetas';

const urlPlanet: string = process.env.URL_PLANETAS ?? 'https://swapi.py4e.com/api/planets';

export async function getPlanetsFromSWAPI(): Promise<Planet[]> {
    return new Promise((resolve, reject) => {
        axios.get(urlPlanet)
            .then((response) => {
                resolve(response.data['results'] as Planet[]);
            })
            .catch((error) => {
                if (error instanceof Error) {
                    reject(new Error(`Error al obtener los planetas desde SWAPI: ${error.message}`));
                } else {
                    reject(new Error(`Error desconocido al obtener los planetas desde SWAPI`));
                }
            });
    });
}


