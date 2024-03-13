import { dynamodb } from '../../dynamodbConfig';
import { CreateTableCommand, DescribeTableCommand, ScalarAttributeType, CreateTableCommandInput, AttributeDefinition, KeySchemaElement, CreateTableOutput } from '@aws-sdk/client-dynamodb';

// Nombre de la tabla
const tableName = 'Planetas';

// Define la estructura de la tabla
const params: CreateTableCommandInput = {
  TableName: tableName,
  AttributeDefinitions: [
    { AttributeName: 'items', AttributeType: ScalarAttributeType.S },
  ],
  KeySchema: [
    { AttributeName: 'items', KeyType: 'HASH' },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};
 
async function tableExists(): Promise<boolean> {
  try {
    console.info('Validando existencia de la tabla...');

    const data = await dynamodb.send(new DescribeTableCommand({ TableName: tableName }));

    return !!(data && data.Table && data.Table.TableName === tableName);
  } catch (error: any) {
    if (error.name === 'ResourceNotFoundException') {
      return false;
    }
    console.error('Error al verificar la tabla:', error);
    throw error;
  }
}

// Función para crear la tabla
export async function createTable(): Promise<void> {
  try {
    const exists = await tableExists();
    if (!exists) {
      const data: CreateTableOutput = await dynamodb.send(new CreateTableCommand(params));
      console.log('Tabla creada con éxito:', data);
    } else {
      console.log('La tabla ya existe, no es necesario crearla.');
    }
  } catch (error) {
    console.error('Error al crear la tabla:', error);
    throw error;
  }
}
