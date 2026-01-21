import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth Service API",
      version: "1.0.0",
      description: "Authentication microservice for Cotrav platform"
    },
    servers: [
      {
        url: "http://localhost:4001"
      }
    ]
  },
  apis: ["./src/api/routes/*.ts"]
};

export const swaggerSpec = swaggerJSDoc(options);
