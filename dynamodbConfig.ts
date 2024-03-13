// dynamodbConfig.ts
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

export const dynamodbConfig = {
  region: process.env.REGION || 'localhost',
  endpoint: process.env.URL || 'http://localhost:9000'
};

export const dynamodb = new DynamoDBClient(dynamodbConfig);
