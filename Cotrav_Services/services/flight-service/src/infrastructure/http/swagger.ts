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
  apis: [
    path.join(__dirname, "../../api/routes/*.ts"),
    path.join(__dirname, "../../api/routes/*.js"),
  ],
};

const spec = swaggerJsdoc(options) as any;

// Manually inject /airports path — ensures it always appears in Swagger
spec.paths = spec.paths || {};
spec.paths["/airports"] = {
  get: {
    summary: "Get all airports",
    description: "Returns a list of all airports available for flight search.",
    tags: ["Airports"],
    responses: {
      200: {
        description: "List of airports",
        content: {
          "application/json": {
            schema: { type: "array", items: { type: "object" } },
          },
        },
      },
      500: { description: "Internal server error" },
    },
  },
};

export const swaggerSpec = spec;
