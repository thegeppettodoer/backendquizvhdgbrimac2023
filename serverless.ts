import type { AWS } from '@serverless/typescript';
import { join } from 'path';

const serverlessConfiguration: AWS = {
  service: 'my-serverless-backend-vhgdb', // Nombre de tu servicio
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x', // La versión de Node.js que deseas utilizar
    region: 'us-east-1', // La región de AWS en la que deseas desplegar tu función
  },
  functions: {
    app: {
      // Configuración de tu función
      handler: 'src/index.handler', // Ruta al handler de tu función
      events: [
        {
          httpApi: '*', // Configura el evento HTTP
        },
      ],
    },
  },
  plugins: ['serverless-webpack'], // Agrega el plugin para usar Webpack si lo necesitas
  package: {
    patterns: [
      // Patrones para incluir en el paquete
      'src/**',
    ],
    exclude: [
      'src/**/*.test.ts', // Ejemplo: excluye archivos de pruebas
    ],
    individually: true, // Empaquetar cada función de forma independiente
  },
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js', // Archivo de configuración de Webpack
      includeModules: true,
    },
  },
};

export default serverlessConfiguration;
