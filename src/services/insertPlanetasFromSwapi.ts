import { dynamodb } from '../../dynamodbConfig';
import { PutItemCommand, PutItemCommandInput, AttributeValue, PutItemCommandOutput } from '@aws-sdk/client-dynamodb';

export async function insertPlanet(planeta: any): Promise<void> {
    try {
        console.log('"/insertPlanet:', planeta);
        const requiredKeys = ['name', 'rotation_period', 'orbital_period', 'diameter', 'climate', 'gravity', 'terrain', 'surface_water', 'population', 'residents', 'films', 'created', 'edited', 'url'];
        const missingKeys = requiredKeys.filter(key => !planeta.hasOwnProperty(key) || !planeta[key]);



        if (missingKeys.length > 0) {
            console.error(`Error al insertar el planeta: Faltan claves requeridas: ${missingKeys.join(', ')}`);
        } else {
            // Realizar la inserción en DynamoDB
            try {
                const params: PutItemCommandInput = {
                    TableName: 'Planetas',
                    Item: {

                    }
                };
                if (params.Item) {
                    // Verificar y agregar los campos que no deben estar vacíos
                    if (planeta['id'] !== null && planeta['id'] !== undefined && planeta['id'] !== '') {
                        params.Item.id = { S: planeta['id'] };
                    }
                    if (planeta['name'] !== null && planeta['name'] !== undefined && planeta['name'] !== '') {
                        params.Item.nombre = { S: planeta['name'] };
                    }
                    if (planeta['rotation_period'] !== null && planeta['rotation_period'] !== undefined && planeta['rotation_period'] !== '') {
                        params.Item.rotacion_orbital = { S: planeta['rotation_period'] };
                    }
                    if (planeta['residents'] && planeta['residents'].length > 0) {
                        params.Item.residentes = { SS: planeta['residents'] };
                    }
                    if (planeta['films'] && planeta['films'].length > 0) {
                        params.Item.pelis = { SS: planeta['films'] };
                    }
                    if (planeta['orbital_period'] !== null && planeta['orbital_period'] !== undefined && planeta['orbital_period'] !== '') {
                        params.Item.periodo_orbital = { S: planeta['orbital_period'] };
                    }

                    if (planeta['diameter'] !== null && planeta['diameter'] !== undefined && planeta['diameter'] !== '') {
                        params.Item.diametro = { S: planeta['diameter'] };
                    }

                    if (planeta['climate'] !== null && planeta['climate'] !== undefined && planeta['climate'] !== '') {
                        params.Item.clima = { S: planeta['climate'] };
                    }

                    if (planeta['gravity'] !== null && planeta['gravity'] !== undefined && planeta['gravity'] !== '') {
                        params.Item.gravedad = { S: planeta['gravity'] };
                    }

                    if (planeta['terrain'] !== null && planeta['terrain'] !== undefined && planeta['terrain'] !== '') {
                        params.Item.tierra = { S: planeta['terrain'] };
                    }

                    if (planeta['surface_water'] !== null && planeta['surface_water'] !== undefined && planeta['surface_water'] !== '') {
                        params.Item.superficie_agua = { S: planeta['surface_water'] };
                    }

                    if (planeta['population'] !== null && planeta['population'] !== undefined && planeta['population'] !== '') {
                        params.Item.poblacion = { S: planeta['population'] };
                    }

                    if (planeta['created'] !== null && planeta['created'] !== undefined && planeta['created'] !== '') {
                        params.Item.creado_por = { S: planeta['created'] };
                    }

                    if (planeta['edited'] !== null && planeta['edited'] !== undefined && planeta['edited'] !== '') {
                        params.Item.editado_por = { S: planeta['edited'] };
                    }

                    if (planeta['url'] !== null && planeta['url'] !== undefined && planeta['url'] !== '') {
                        params.Item.url = { S: planeta['url'] };
                    }

                    const data: PutItemCommandOutput = await dynamodb.send(new PutItemCommand(params));
                };
                console.log('Planeta insertado con éxito:', planeta.name);
            } catch (error) {
                console.error('Error al insertar el planeta:', error);
                throw error;
            }
        }
    } catch (error) {
        console.error('Error al insertar el planeta:', error);
        throw error;
    }
}



