const port = 3010;

const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    version: '1.0.0',
    title: 'Unibank API',
    description: 'Unibank REST API 명세 문서',
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: 'Development Server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['../app.ts'];

swaggerAutogen(outputFile, routes, doc);
