import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dev Connector API',
      version: '1.0.0',
      description: 'API for Dev Connector',
    },
  },
  apis: ['./src/routes/api/*.ts'], // Adjust path as needed
};

export const swaggerSpec = swaggerJSDoc(options);