import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Flight Service API",
      version: "1.0.0",
      description: "API documentation for the Flight microservice",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4002}`,
        description: "Local server",
      },
    ],
  },
  apis: [path.join(__dirname, "../../api/routes/*.{ts,js}")],
};

export const swaggerSpec = swaggerJsdoc(options);
