import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SERYU API',
        version: '1.0.0',
        description: 'API documentation for your Node.js application',
      },
    },
    servers: [
        {
          url: "http://localhost:8080/",
          description: "Local server"
    }],
    apis: ['./src/routes/*.ts'], // Path to the API routes
   
  };
  const swaggerSpec = swaggerJSDoc(options);
  export {swaggerSpec}
