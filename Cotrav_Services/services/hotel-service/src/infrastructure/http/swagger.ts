import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel Service API",
      version: "1.0.0",
      description: "API documentation for the Hotel microservice",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4003}`,
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

// Manually inject /getAllCities path — ensures it always appears in Swagger
spec.paths = spec.paths || {};
spec.paths["/getAllCities"] = {
  post: {
    summary: "Get all hotel cities",
    description: "Returns a list of all cities available for hotel search.",
    tags: ["Cities"],
    responses: {
      200: {
        description: "List of cities",
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
