import { dynamodb } from '../../dynamodbConfig';
import { ScanCommand } from '@aws-sdk/client-dynamodb';

// Crea una instancia del cliente de DynamoDB

export async function getAllPlanets(): Promise<any> {
  try {
    const params = {
      TableName: 'Planetas' //tabla
    };
    const command = new ScanCommand(params);
    const data = await dynamodb.send(command); // escanear
    console.info("Obteniendo todos los planetas guardados en la base de datos");
    return data.Items;
  } catch (error) {
    console.error("Error al obtener los planetas:", error);
    throw error;
  }
}
